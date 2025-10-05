// app/[locale]/page.tsx
import { apiUrl } from "@/constants";

// ---- Types for a flexible Strapi response shape ----
type CoverFlat = { url?: string } | null | undefined;
type CoverNested =
  | { data?: { attributes?: { url?: string } | null } | null }
  | null
  | undefined;

type Cover = CoverFlat | CoverNested | Array<CoverFlat | CoverNested>;

type Blog = {
  id: number | string;
  title?: string;
  description?: unknown;
  publishedAt?: string | null;
  cover?: Cover;
};

type StrapiResponse = {
  data?: Blog[];
};

// ---- Utilities ----
function richTextToText(input: unknown): string {
  if (!Array.isArray(input)) return typeof input === "string" ? input : "";

  type RichNode = { text?: unknown; children?: unknown };
  const walk = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";
    const n = node as RichNode;
    if (typeof n.text === "string") return n.text;
    if (Array.isArray(n.children)) return n.children.map(walk).join("");
    return "";
  };

  return input.map(walk).join(" ").replace(/\s+/g, " ").trim();
}

function extractUrl(x: CoverFlat | CoverNested): string | null {
  if (!x || typeof x !== "object") return null;

  const rec = x as Record<string, unknown>;
  // flat: { url }
  if (typeof rec.url === "string") return rec.url;

  // nested: { data: { attributes: { url } } }
  const data = rec.data as Record<string, unknown> | undefined;
  const attrs = data?.attributes as Record<string, unknown> | undefined;
  const url = typeof attrs?.url === "string" ? attrs.url : null;

  return url;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ka" }]; // pre-render both
}

export const dynamic = "force-static"; // ✅ ensure static

export default async function Page({
  params,
}: {
  params: { locale: "en" | "ka" };
}) {
  const { locale } = await params;

  const url = `${apiUrl}/api/blogs?locale=${locale}&populate=cover`;
  const res = await fetch(url, { cache: "no-store" }); // dev-friendly
  if (!res.ok) {
    return <div>Failed to load articles ({res.status})</div>;
  }

  const payload: StrapiResponse = await res.json();
  const items: Blog[] = Array.isArray(payload?.data) ? payload.data : [];

  if (!items.length) {
    return <div>No articles found</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen flex-col gap-8 p-2">
      {items.map((d) => {
        const descriptionText =
          richTextToText(d.description) ||
          (locale === "ka"
            ? "ეკონომიკური მიმოხილვა"
            : "Monthly Economic Review");

        const coverUrls: string[] = (() => {
          const c = d.cover;
          if (!c) return [];
          const list = Array.isArray(c) ? c : [c];
          return list
            .map((part) => extractUrl(part))
            .filter((u): u is string => typeof u === "string" && u.length > 0);
        })();

        return (
          <article
            key={String(d.id)}
            className="w-full rounded-xl shadow border p-6"
            style={{
              backgroundColor: "var(--card-background)",
              color: "var(--card-text)",
            }}
          >
            <div className="flex flex-col gap-1 mb-2">
              <span
                style={{ color: "var(--card-text-secondary)" }}
                className="text-xs text-gray-500"
              >
                {d.publishedAt
                  ? new Date(d.publishedAt).toLocaleDateString(locale)
                  : locale === "ka"
                  ? "თარიღი უცნობია"
                  : "Unknown date"}
              </span>
              <h2 className="text-2xl font-bold">{d.title ?? ""}</h2>
            </div>

            <p className="mb-3" style={{ color: "var(--card-text-secondary)" }}>
              {descriptionText}
            </p>

            <div className="flex flex-wrap gap-2">
              {coverUrls.map((u, i) => {
                const href = u.startsWith("http") ? u : `${apiUrl}${u}`;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline"
                    style={{ color: "var(--card-text)" }}
                  >
                    {locale === "ka" ? "გახსნა" : "Open cover"}
                  </a>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
