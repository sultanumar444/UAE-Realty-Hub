import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, agentsTable } from "@workspace/db";
import {
  CreateAgentBody,
  UpdateAgentBody,
  GetAgentParams,
  UpdateAgentParams,
  DeleteAgentParams,
  GetAgentResponse,
  ListAgentsResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/agents", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(agentsTable)
    .orderBy(desc(agentsTable.createdAt));
  res.json(ListAgentsResponse.parse(rows));
});

router.get("/agents/:id", async (req, res): Promise<void> => {
  const params = GetAgentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select()
    .from(agentsTable)
    .where(eq(agentsTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Agent not found" });
    return;
  }

  res.json(GetAgentResponse.parse(row));
});

router.post("/agents", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateAgentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(agentsTable).values(parsed.data).returning();
  res.status(201).json(GetAgentResponse.parse(row));
});

router.patch("/agents/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateAgentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateAgentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(agentsTable)
    .set(parsed.data)
    .where(eq(agentsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Agent not found" });
    return;
  }

  res.json(GetAgentResponse.parse(row));
});

router.delete("/agents/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteAgentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(agentsTable)
    .where(eq(agentsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Agent not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
