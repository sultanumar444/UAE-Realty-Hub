import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, listingsTable, agentsTable, type Listing, type Agent } from "@workspace/db";

const router: IRouter = Router();

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string | null | undefined): string {
  return `<![CDATA[${value ?? ""}]]>`;
}

/**
 * Generic XML feed of published listings.
 *
 * Portals such as Bayut, Dubizzle, and Property Finder ingest listings via a
 * pull-based XML/CSV feed (each portal has its own schema and requires a signed
 * partner/API agreement). This endpoint exposes a clean, generic feed of all
 * published listings that can be mapped to each portal's required format once
 * partner credentials are in place.
 */
router.get("/feeds/listings.xml", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(listingsTable)
    .leftJoin(agentsTable, eq(listingsTable.agentId, agentsTable.id))
    .where(eq(listingsTable.status, "published"))
    .orderBy(desc(listingsTable.createdAt));

  const items = rows
    .map(({ listings, agents }: { listings: Listing; agents: Agent | null }) => {
      const images = (listings.images ?? [])
        .map((url) => `        <image><url>${escapeXml(url)}</url></image>`)
        .join("\n");
      const amenities = (listings.amenities ?? [])
        .map((a) => `        <amenity>${cdata(a)}</amenity>`)
        .join("\n");

      return `    <property>
      <reference_number>${cdata(listings.reference ?? `YK-${listings.id}`)}</reference_number>
      <title>${cdata(listings.title)}</title>
      <description>${cdata(listings.description)}</description>
      <property_type>${cdata(listings.propertyType)}</property_type>
      <offering_type>${cdata(listings.purpose)}</offering_type>
      <price>${listings.price}</price>
      <currency>AED</currency>
      <bedrooms>${listings.bedrooms ?? ""}</bedrooms>
      <bathrooms>${listings.bathrooms ?? ""}</bathrooms>
      <size unit="sqft">${listings.area ?? ""}</size>
      <city>${cdata(listings.city)}</city>
      <community>${cdata(listings.community)}</community>
      <address>${cdata(listings.address)}</address>
      <geopoints>${escapeXml(listings.latitude ?? "")},${escapeXml(listings.longitude ?? "")}</geopoints>
      <agent>
        <name>${cdata(agents?.name)}</name>
        <email>${cdata(agents?.email)}</email>
        <phone>${cdata(agents?.phone)}</phone>
      </agent>
      <amenities>
${amenities}
      </amenities>
      <photos>
${images}
      </photos>
      <last_update>${listings.updatedAt.toISOString()}</last_update>
    </property>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<list>
  <last_update>${new Date().toISOString()}</last_update>
  <properties>
${items}
  </properties>
</list>`;

  res.set("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

export default router;
