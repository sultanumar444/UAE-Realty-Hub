import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  CreateLeadBody,
  UpdateLeadBody,
  UpdateLeadParams,
  UpdateLeadResponse,
  DeleteLeadParams,
  ListLeadsResponseItem,
  ListLeadsResponse,
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

const router: IRouter = Router();

router.get("/leads", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));
  res.json(ListLeadsResponse.parse(rows));
});

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [row] = await db.insert(leadsTable).values(parsed.data).returning();
    res.status(201).json(ListLeadsResponseItem.parse(row));
  } catch (err) {
    if (pgErrorCode(err) === "23503") {
      req.log.warn({ err }, "Lead referenced a missing listing");
      res.status(400).json({ error: "Referenced listing does not exist" });
      return;
    }
    throw err;
  }
});

router.patch("/leads/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(leadsTable)
    .set(parsed.data)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(UpdateLeadResponse.parse(row));
});

router.delete("/leads/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
