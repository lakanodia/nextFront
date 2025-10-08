import { resolve, join } from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { PublicationType } from "@/app/types/publication";

const CONTENT_DIR = resolve(process.cwd(), "content/publications");

type Frontmatter = {
  title: string;
  date: string; // ISO recommended in your MD
  pdf: string; // e.g. "files/foo.pdf"
  cover: string; // e.g. "images/foo.jpg"
  description?: string; // short summary for list page
};

// --- helpers ---------------------------------------------------------------

/** Ensure URL fields are consistently rooted ("/...") */
const rootify = (p: string) => (p.startsWith("/") ? p : `/${p}`);

/** Parse one markdown file into your PublicationType */
async function parseMarkdown(
  fullPath: string,
  slug: string
): Promise<PublicationType> {
  const file = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(file);
  const fm = data as Frontmatter;

  const processed = await remark().use(html).process(content);
  const contentHtml = String(processed);

  return {
    slug,
    title: fm.title,
    publishedAt: fm.date,
    pdf_url: rootify(fm.pdf),
    cover_photo: rootify(fm.cover),
    contentHtml,
    description: fm.description ?? "",
  };
}

/** Build map id -> fullPath where locale overrides root files */
async function buildFileMap(locale: string) {
  const entries = new Map<string, string>();

  // root files
  const rootFiles = (await fs.readdir(CONTENT_DIR)).filter((f) =>
    f.endsWith(".md")
  );
  for (const file of rootFiles)
    entries.set(file.replace(/\.md$/, ""), join(CONTENT_DIR, file));

  // locale overrides (if folder exists)
  const localeDir = join(CONTENT_DIR, locale);
  try {
    const stat = await fs.lstat(localeDir);
    if (stat.isDirectory()) {
      const localeFiles = (await fs.readdir(localeDir)).filter((f) =>
        f.endsWith(".md")
      );
      for (const file of localeFiles)
        entries.set(file.replace(/\.md$/, ""), join(localeDir, file));
    }
  } catch {
    /* no locale dir is fine */
  }

  return entries;
}

/** Descending by date (unknown dates sink to bottom) */
function sortByDateDesc(a: PublicationType, b: PublicationType) {
  const ad = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
  const bd = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
  if (Number.isNaN(ad) && Number.isNaN(bd)) return 0;
  if (Number.isNaN(ad)) return 1;
  if (Number.isNaN(bd)) return -1;
  return bd - ad;
}

// --- Internal API ------------------------------------------------------------

async function getAllPublications(locale = "en"): Promise<PublicationType[]> {
  const fileMap = await buildFileMap(locale);
  const items = await Promise.all(
    Array.from(fileMap, ([slug, fullPath]) => parseMarkdown(fullPath, slug))
  );
  items.sort(sortByDateDesc);
  return items;
}

export async function getAllPublicationSlugs(locale = "en"): Promise<string[]> {
  const items = await getAllPublications(locale);
  return items.map((item) => item.slug);
}

async function getPublicationData(
  slug: string,
  locale = "en"
): Promise<PublicationType> {
  const fileMap = await buildFileMap(locale);
  const fullPath = fileMap.get(slug) ?? join(CONTENT_DIR, `${slug}.md`); // fallback to root if not in map (helps when locale missing)

  // This will throw if the file truly doesn't exist, which is good for SSG errors
  return parseMarkdown(fullPath, slug);
}

// ---- Public API ------------------------------------------------------------

export const markdownSource = {
  listSlug: getAllPublicationSlugs,
  list: getAllPublications,
  get: getPublicationData,
};
