import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const communitiesTable = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  emirate: text("emirate").notNull().default("Dubai"),
  description: text("description"),
  imageUrl: text("image_url"),
  priceFrom: integer("price_from"),
  rentFrom: integer("rent_from"),
  propertyTypes: text("property_types"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertCommunitySchema = createInsertSchema(communitiesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertCommunity = z.infer<typeof insertCommunitySchema>;
export type Community = typeof communitiesTable.$inferSelect;
