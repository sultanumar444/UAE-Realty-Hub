import { useMemo } from "react";
import {
  useListListings,
  useListAgents,
  useListCommunities,
} from "@workspace/api-client-react";
import { PROPERTIES, type Property } from "./properties";
import { mapListingToProperty } from "./listingApi";
import { slugify } from "./blogApi";

const PUBLIC_STATUSES = new Set(["published", "sold", "rented"]);

/**
 * Public-facing properties sourced from the database. Falls back to the bundled
 * static catalogue when the database has no published listings yet, so the
 * marketing site never renders empty.
 */
export function useProperties(): {
  properties: Property[];
  isLoading: boolean;
} {
  const listingsQ = useListListings();
  const agentsQ = useListAgents();
  const communitiesQ = useListCommunities();

  const properties = useMemo(() => {
    const listings = (listingsQ.data ?? []).filter((l) =>
      PUBLIC_STATUSES.has(l.status),
    );
    if (listings.length === 0) return PROPERTIES;
    return listings.map((l) =>
      mapListingToProperty(l, agentsQ.data ?? [], communitiesQ.data ?? []),
    );
  }, [listingsQ.data, agentsQ.data, communitiesQ.data]);

  return { properties, isLoading: listingsQ.isLoading };
}

export function useProperty(slug: string): {
  property: Property | undefined;
  properties: Property[];
  isLoading: boolean;
} {
  const { properties, isLoading } = useProperties();
  const property = useMemo(
    () =>
      properties.find((p) => slugify(p.title) === slug) ??
      // Backward compatibility for older numeric-id links.
      properties.find((p) => p.id === slug),
    [properties, slug],
  );
  return { property, properties, isLoading };
}
