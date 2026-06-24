import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type FloorPlan = {
  type: string;
  bedrooms?: string;
  size?: string;
  price?: number;
  image?: string;
};

export type PaymentMilestone = {
  label: string;
  percentage: string;
};

export const offPlanProjectsTable = pgTable("off_plan_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  developer: text("developer"),
  emirate: text("emirate").notNull().default("Dubai"),
  location: text("location"),
  community: text("community"),
  tagline: text("tagline"),
  description: text("description").notNull().default(""),
  heroImage: text("hero_image"),
  logoImage: text("logo_image"),
  gallery: text("gallery").array().notNull().default([]),
  amenities: text("amenities").array().notNull().default([]),
  highlights: text("highlights").array().notNull().default([]),
  floorPlans: jsonb("floor_plans")
    .$type<FloorPlan[]>()
    .notNull()
    .default([]),
  paymentMilestones: jsonb("payment_milestones")
    .$type<PaymentMilestone[]>()
    .notNull()
    .default([]),
  materials: text("materials").array().notNull().default([]),
  locationImage: text("location_image"),
  mapAddress: text("map_address"),
  agentId: integer("agent_id"),
  startingPrice: integer("starting_price"),
  handover: text("handover"),
  paymentPlan: text("payment_plan"),
  bedrooms: text("bedrooms"),
  unitTypes: text("unit_types"),
  brochureUrl: text("brochure_url"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  featured: boolean("featured").notNull().default(false),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertOffPlanProjectSchema = createInsertSchema(offPlanProjectsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertOffPlanProject = z.infer<typeof insertOffPlanProjectSchema>;
export type OffPlanProject = typeof offPlanProjectsTable.$inferSelect;
