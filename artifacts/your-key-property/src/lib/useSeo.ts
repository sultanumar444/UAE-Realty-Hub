import { useEffect } from "react";

const SITE_NAME = "Your Key Property Management";
const DEFAULT_TITLE = `${SITE_NAME} — Dubai & Abu Dhabi Real Estate`;

function setMeta(
  key: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(key: string, attr: "name" | "property" = "name") {
  const el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (el) el.remove();
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

export function useSeo({ title, description, image, type = "website" }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta("og:title", fullTitle, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    } else {
      removeMeta("description");
      removeMeta("og:description", "property");
      removeMeta("twitter:description");
    }

    if (image) {
      const url = absoluteUrl(image);
      setMeta("og:image", url, "property");
      setMeta("twitter:image", url);
    } else {
      removeMeta("og:image", "property");
      removeMeta("twitter:image");
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, image, type]);
}
