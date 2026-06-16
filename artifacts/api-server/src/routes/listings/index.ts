import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, listingsTable } from "@workspace/db";
import {
  CreateListingBody,
  UpdateListingBody,
  GetListingParams,
  GetListingResponse,
  UpdateListingParams,
  DeleteListingParams,
  ListListingsResponse,
  ListListingsQueryParams,
} from "@workspace/api-zod";
import { requireAuth } from "../../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/listings", async (req, res): Promise<void> => {
  const query = ListListingsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const filters = [];
  if (query.data.status) filters.push(eq(listingsTable.status, query.data.status));
  if (query.data.purpose) filters.push(eq(listingsTable.purpose, query.data.purpose));
  if (query.data.city) filters.push(eq(listingsTable.city, query.data.city));
  if (query.data.propertyType)
    filters.push(eq(listingsTable.propertyType, query.data.propertyType));
  if (query.data.featured !== undefined)
    filters.push(eq(listingsTable.featured, query.data.featured));

  const rows = await db
    .select()
    .from(listingsTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(listingsTable.createdAt));

  res.json(ListListingsResponse.parse(rows));
});

router.get("/listings/:id", async (req, res): Promise<void> => {
  const params = GetListingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select()
    .from(listingsTable)
    .where(eq(listingsTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }

  res.json(GetListingResponse.parse(row));
});

router.post("/listings", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateListingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(listingsTable).values(parsed.data).returning();
  res.status(201).json(GetListingResponse.parse(row));
});

router.patch("/listings/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateListingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateListingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(listingsTable)
    .set(parsed.data)
    .where(eq(listingsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }

  res.json(GetListingResponse.parse(row));
});

router.delete("/listings/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteListingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(listingsTable)
    .where(eq(listingsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
