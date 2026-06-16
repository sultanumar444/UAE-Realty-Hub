import type { Post } from "@workspace/api-client-react";
import { storageUrl } from "./listingApi";

const FALLBACK_COVER = "/images/dubai-skyline.png";

export function postCover(post: Pick<Post, "coverImage">): string {
  return post.coverImage ? storageUrl(post.coverImage) : FALLBACK_COVER;
}

export function formatPostDate(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function excerptFrom(post: Pick<Post, "excerpt" | "content">): string {
  if (post.excerpt && post.excerpt.trim()) return post.excerpt;
  const text = post.content.replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}
