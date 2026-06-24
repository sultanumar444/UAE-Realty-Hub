import type { OffPlanProject } from "@workspace/api-client-react";
import { storageUrl } from "./listingApi";

const FALLBACK_HERO = "/images/dubai-skyline.png";

export function projectHero(
  project: Pick<OffPlanProject, "heroImage">,
): string {
  return project.heroImage ? storageUrl(project.heroImage) : FALLBACK_HERO;
}

export function projectImage(path: string | null | undefined): string {
  return path ? storageUrl(path) : FALLBACK_HERO;
}

export function projectGallery(
  project: Pick<OffPlanProject, "gallery" | "heroImage">,
): string[] {
  const images = (project.gallery ?? []).map((p) => storageUrl(p));
  if (images.length > 0) return images;
  return [projectHero(project)];
}

export function formatStartingPrice(
  value: number | null | undefined,
  format: (n: number) => string,
): string | null {
  if (value == null || value <= 0) return null;
  return format(value);
}
