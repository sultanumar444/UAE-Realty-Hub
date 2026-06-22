import type { Listing, Agent, Community } from "@workspace/api-client-react";
import type { Property } from "./properties";

const FALLBACK_IMAGE = "/images/modern-apartment.png";

const FALLBACK_AGENT = {
  name: "Your Key Property",
  title: "Sales & Leasing Team",
  phone: "+971 50 669 2770",
  image: "/images/agent-1.jpg",
};

const PROPERTY_TYPES: Property["type"][] = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Commercial",
  "Studio",
];

export function storageUrl(path: string | null | undefined): string {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith("/objects/")) return `/api/storage${path}`;
  return path;
}

function normalizeType(value: string): Property["type"] {
  const match = PROPERTY_TYPES.find(
    (t) => t.toLowerCase() === value.trim().toLowerCase(),
  );
  return match ?? "Apartment";
}

function statusForPurpose(purpose: string | null | undefined): Property["status"] {
  if (purpose === "rent") return "FOR RENT";
  if (purpose === "offplan") return "OFF PLAN";
  return "FOR SALE";
}

export function mapListingToProperty(
  listing: Listing,
  agents?: Agent[],
  communities?: Community[],
): Property {
  const agent = agents?.find((a) => a.id === listing.agentId);
  const community = communities?.find((c) => c.id === listing.communityId);
  const communityName = community?.name || listing.community || undefined;
  const images = (listing.images ?? []).map(storageUrl);
  const primary = images[0] ?? FALLBACK_IMAGE;

  return {
    id: String(listing.id),
    title: listing.title,
    location: communityName || listing.city || "Dubai",
    emirate:
      community?.emirate === "Abu Dhabi" || listing.city === "Abu Dhabi"
        ? "Abu Dhabi"
        : "Dubai",
    type: normalizeType(listing.propertyType ?? "apartment"),
    status: statusForPurpose(listing.purpose),
    price: listing.price,
    beds: listing.bedrooms ?? 0,
    baths: listing.bathrooms ?? 0,
    sqft: listing.area ?? 0,
    image: primary,
    gallery: images.length > 0 ? images : [FALLBACK_IMAGE],
    description: listing.description ?? "",
    amenities: listing.amenities ?? [],
    agent: agent
      ? {
          name: agent.name,
          title: agent.title || "Property Consultant",
          phone: agent.phone || FALLBACK_AGENT.phone,
          image: storageUrl(agent.photoUrl) || FALLBACK_AGENT.image,
        }
      : FALLBACK_AGENT,
    community: communityName,
    communityId: community?.id,
    agentId: agent?.id,
    featured: listing.featured ?? false,
    dbBacked: true,
  };
}
