import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, communitiesTable } from "@workspace/db";
import {
  CreateCommunityBody,
  UpdateCommunityBody,
  GetCommunityParams,
  UpdateCommunityParams,
  DeleteCommunityParams,
  GetCommunityResponse,
  ListCommunitiesResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../../middlewares/requireAuth";

const router: IRouter = Router();

function pgErrorCode(err: unknown): string | undefined {
  let current: unknown = err;
  for (let i = 0; i < 5 && current && typeof current === "object"; i++) {
    const code = (current as { code?: unknown }).code;
    if (typeof code === "string") return code;
    current = (current as { cause?: unknown }).cause;
  }
  return undefined;
}

function handleSlugConflict(
  err: unknown,
  res: { status: (n: number) => { json: (b: unknown) => void } },
): boolean {
  if (pgErrorCode(err) === "23505") {
    res.status(409).json({ error: "A community with this slug already exists" });
    return true;
  }
  return false;
}

router.get("/communities", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(communitiesTable)
    .orderBy(desc(communitiesTable.featured), desc(communitiesTable.createdAt));
  res.json(ListCommunitiesResponse.parse(rows));
});

router.get("/communities/:id", async (req, res): Promise<void> => {
  const params = GetCommunityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select()
    .from(communitiesTable)
    .where(eq(communitiesTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Community not found" });
    return;
  }

  res.json(GetCommunityResponse.parse(row));
});

router.post("/communities", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateCommunityBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [row] = await db
      .insert(communitiesTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(GetCommunityResponse.parse(row));
  } catch (err) {
    if (handleSlugConflict(err, res)) return;
    throw err;
  }
});

router.patch("/communities/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateCommunityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateCommunityBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [row] = await db
      .update(communitiesTable)
      .set(parsed.data)
      .where(eq(communitiesTable.id, params.data.id))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Community not found" });
      return;
    }

    res.json(GetCommunityResponse.parse(row));
  } catch (err) {
    if (handleSlugConflict(err, res)) return;
    throw err;
  }
});

router.delete(
  "/communities/:id",
  requireAuth,
  async (req, res): Promise<void> => {
    const params = DeleteCommunityParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const [row] = await db
      .delete(communitiesTable)
      .where(eq(communitiesTable.id, params.data.id))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Community not found" });
      return;
    }

    res.sendStatus(204);
  },
);

export default router;
