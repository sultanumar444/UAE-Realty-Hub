import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { and, desc, eq } from "drizzle-orm";
import { db, offPlanProjectsTable } from "@workspace/db";
import {
  CreateOffPlanProjectBody,
  UpdateOffPlanProjectBody,
  UpdateOffPlanProjectParams,
  DeleteOffPlanProjectParams,
  GetOffPlanProjectParams,
  GetOffPlanProjectBySlugParams,
  GetOffPlanProjectResponse,
  ListOffPlanProjectsResponse,
  ListOffPlanProjectsQueryParams,
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

function handleConstraintError(
  err: unknown,
  res: { status: (n: number) => { json: (b: unknown) => void } },
): boolean {
  const code = pgErrorCode(err);
  if (code === "23505") {
    res.status(400).json({ error: "A project with this slug already exists" });
    return true;
  }
  return false;
}

const router: IRouter = Router();

router.get("/off-plan-projects", async (req, res): Promise<void> => {
  const isAuthed = Boolean(getAuth(req)?.userId);
  const query = ListOffPlanProjectsQueryParams.safeParse(req.query);
  const requestedStatus = query.success ? query.data.status : undefined;
  const emirate = query.success ? query.data.emirate : undefined;
  const featured = query.success ? query.data.featured : undefined;

  // Unauthenticated callers may only ever see published projects.
  const status = isAuthed ? requestedStatus : "published";

  const conditions = [];
  if (status) conditions.push(eq(offPlanProjectsTable.status, status));
  if (emirate) conditions.push(eq(offPlanProjectsTable.emirate, emirate));
  if (featured !== undefined)
    conditions.push(eq(offPlanProjectsTable.featured, featured));

  const rows = await db
    .select()
    .from(offPlanProjectsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(
      desc(offPlanProjectsTable.featured),
      desc(offPlanProjectsTable.publishedAt),
      desc(offPlanProjectsTable.createdAt),
    );

  res.json(ListOffPlanProjectsResponse.parse(rows));
});

router.get("/off-plan-projects/by-slug/:slug", async (req, res): Promise<void> => {
  const params = GetOffPlanProjectBySlugParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const isAuthed = Boolean(getAuth(req)?.userId);
  const slugConditions = [eq(offPlanProjectsTable.slug, params.data.slug)];
  if (!isAuthed) slugConditions.push(eq(offPlanProjectsTable.status, "published"));

  const [row] = await db
    .select()
    .from(offPlanProjectsTable)
    .where(and(...slugConditions));

  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetOffPlanProjectResponse.parse(row));
});

router.get("/off-plan-projects/:id", async (req, res): Promise<void> => {
  const params = GetOffPlanProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const isAuthed = Boolean(getAuth(req)?.userId);
  const idConditions = [eq(offPlanProjectsTable.id, params.data.id)];
  if (!isAuthed) idConditions.push(eq(offPlanProjectsTable.status, "published"));

  const [row] = await db
    .select()
    .from(offPlanProjectsTable)
    .where(and(...idConditions));

  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetOffPlanProjectResponse.parse(row));
});

router.post("/off-plan-projects", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateOffPlanProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const values = {
    ...parsed.data,
    publishedAt: parsed.data.status === "published" ? new Date() : null,
  };

  try {
    const [row] = await db
      .insert(offPlanProjectsTable)
      .values(values)
      .returning();
    res.status(201).json(GetOffPlanProjectResponse.parse(row));
  } catch (err) {
    if (handleConstraintError(err, res)) {
      req.log.warn({ err }, "Off-plan project create constraint violation");
      return;
    }
    throw err;
  }
});

router.patch("/off-plan-projects/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateOffPlanProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateOffPlanProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(offPlanProjectsTable)
    .where(eq(offPlanProjectsTable.id, params.data.id));

  if (!existing) {
    res.status(404).json({ error: "Project not found" });
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
      .update(offPlanProjectsTable)
      .set(values)
      .where(eq(offPlanProjectsTable.id, params.data.id))
      .returning();
    res.json(GetOffPlanProjectResponse.parse(row));
  } catch (err) {
    if (handleConstraintError(err, res)) {
      req.log.warn({ err }, "Off-plan project update constraint violation");
      return;
    }
    throw err;
  }
});

router.delete("/off-plan-projects/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteOffPlanProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(offPlanProjectsTable)
    .where(eq(offPlanProjectsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
