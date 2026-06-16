import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { and, desc, eq } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";
import {
  CreatePostBody,
  UpdatePostBody,
  UpdatePostParams,
  DeletePostParams,
  GetPostParams,
  GetPostBySlugParams,
  GetPostResponse,
  ListPostsResponse,
  ListPostsQueryParams,
} from "@workspace/api-zod";
import { requireAuth } from "../../middlewares/requireAuth";

function pgErrorCode(err: unknown): string | undefined {
  let current: unknown = err;
  for (let i = 0; i < 5 && current && typeof current === "object"; i++) {
    const code = (current as { code?: unknown }).code;
    if (typeof code === "string") return code;
    current = (current as { cause?: unknown }).cause;
  }
  return undefined;
}

function handleConstraintError(err: unknown, res: { status: (n: number) => { json: (b: unknown) => void } }): boolean {
  const code = pgErrorCode(err);
  if (code === "23505") {
    res.status(400).json({ error: "A post with this slug already exists" });
    return true;
  }
  if (code === "23503") {
    res.status(400).json({ error: "Referenced author does not exist" });
    return true;
  }
  return false;
}

const router: IRouter = Router();

router.get("/posts", async (req, res): Promise<void> => {
  const isAuthed = Boolean(getAuth(req)?.userId);
  const query = ListPostsQueryParams.safeParse(req.query);
  const requestedStatus = query.success ? query.data.status : undefined;
  const category = query.success ? query.data.category : undefined;

  // Unauthenticated callers may only ever see published posts.
  const status = isAuthed ? requestedStatus : "published";

  const conditions = [];
  if (status) conditions.push(eq(postsTable.status, status));
  if (category) conditions.push(eq(postsTable.category, category));

  const rows = await db
    .select()
    .from(postsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(postsTable.publishedAt), desc(postsTable.createdAt));

  res.json(ListPostsResponse.parse(rows));
});

router.get("/posts/by-slug/:slug", async (req, res): Promise<void> => {
  const params = GetPostBySlugParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const isAuthed = Boolean(getAuth(req)?.userId);
  const slugConditions = [eq(postsTable.slug, params.data.slug)];
  if (!isAuthed) slugConditions.push(eq(postsTable.status, "published"));

  const [row] = await db
    .select()
    .from(postsTable)
    .where(and(...slugConditions));

  if (!row) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(GetPostResponse.parse(row));
});

router.get("/posts/:id", async (req, res): Promise<void> => {
  const params = GetPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const isAuthed = Boolean(getAuth(req)?.userId);
  const idConditions = [eq(postsTable.id, params.data.id)];
  if (!isAuthed) idConditions.push(eq(postsTable.status, "published"));

  const [row] = await db
    .select()
    .from(postsTable)
    .where(and(...idConditions));

  if (!row) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(GetPostResponse.parse(row));
});

router.post("/posts", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const values = {
    ...parsed.data,
    publishedAt: parsed.data.status === "published" ? new Date() : null,
  };

  try {
    const [row] = await db.insert(postsTable).values(values).returning();
    res.status(201).json(GetPostResponse.parse(row));
  } catch (err) {
    if (handleConstraintError(err, res)) {
      req.log.warn({ err }, "Post create constraint violation");
      return;
    }
    throw err;
  }
});

router.patch("/posts/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdatePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, params.data.id));

  if (!existing) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const values: Record<string, unknown> = { ...parsed.data };
  if (
    parsed.data.status === "published" &&
    existing.status !== "published" &&
    !existing.publishedAt
  ) {
    values.publishedAt = new Date();
  }

  try {
    const [row] = await db
      .update(postsTable)
      .set(values)
      .where(eq(postsTable.id, params.data.id))
      .returning();
    res.json(GetPostResponse.parse(row));
  } catch (err) {
    if (handleConstraintError(err, res)) {
      req.log.warn({ err }, "Post update constraint violation");
      return;
    }
    throw err;
  }
});

router.delete("/posts/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeletePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(postsTable)
    .where(eq(postsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
