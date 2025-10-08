import "server-only";
import { cache } from "react";
import { PublicationType } from "@/app/types/publication";
import { markdownSource } from "./adapters/markdown";
import { strapiSource } from "./adapters/http-strapi";

type PublicationsPort = {
  list(locale?: string): Promise<PublicationType[]>;
  listSlug(locale?: string): Promise<string[]>;
  get(id: string, locale?: string): Promise<PublicationType>;
};

// Pick adapter based on env (or any logic you like)
const pickAdapter = (): PublicationsPort => {
  switch (process.env.DATA_BACKEND) {
    case "markdown":
      return markdownSource;
    case "strapi":
      return strapiSource;
    default:
      return strapiSource;
  }
};

// Optional: cache results per input to reduce repeated work in RSC
export const listPublications = cache(async (locale = "en") => {
  const port = pickAdapter();
  return port.list(locale);
});

export const listPublicationSlugs = cache(async (locale = "en") => {
  const port = pickAdapter();
  return port.listSlug(locale);
});

export const getPublication = cache(async (id: string, locale = "en") => {
  const port = pickAdapter();
  return port.get(id, locale);
});
