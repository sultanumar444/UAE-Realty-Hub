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
import { agentsTable } from "./agents";
import { communitiesTable } from "./communities";

export const listingsTable = pgTable("listings", {
  id: serial("id").primaryKey(),
  reference: text("reference"),
  title: text("title").notNull(),
  description: text("description"),
  propertyType: text("property_type").notNull().default("apartment"),
  purpose: text("purpose").notNull().default("sale"),
  status: text("status").notNull().default("draft"),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: integer("area"),
  city: text("city").notNull().default("Dubai"),
  community: text("community"),
  communityId: integer("community_id").references(() => communitiesTable.id, {
    onDelete: "set null",
  }),
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  images: text("images").array().notNull().default([]),
  amenities: text("amenities").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  agentId: integer("agent_id").references(() => agentsTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listingsTable.$inferSelect;
