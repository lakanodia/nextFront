import { apiUrl } from "@/constants";
import { PublicationType } from "@/app/types/publication";

const API = apiUrl;

type StrapiMedia = {
  url?: string;
  formats?: { thumbnail?: { url?: string } };
};

type StrapiPublication = {
  id: number;
  documentId?: string;
  slug?: string; // only if you add it in Strapi
  title?: string;
  description: string;
  publishedAt: string;
  cover?: StrapiMedia | null;
  pdf?: StrapiMedia | null;
};

type StrapiListResponse<T> = { data: T[] };
type StrapiDetailResponse<T> = { data: T };

function mapStrapiToPublication(x: StrapiPublication): PublicationType {
  const slug = x.slug ?? x.documentId ?? String(x.id); // priority order
  const cover = x.cover?.formats?.thumbnail?.url ?? x.cover?.url;
  const pdf = x.pdf?.url;

  return {
    slug,
    title: x.title ?? slug,
    description: x.description,
    publishedAt: x.publishedAt,
    cover_photo: cover || "",
    pdf_url: pdf || "",
    contentHtml: "",
  };
}

// --- Internal API ------------------------------------------------------------

export async function getAllPublications(
  locale = "en"
): Promise<PublicationType[]> {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.append("populate", "pdf");
  params.append("populate", "cover");

  const res = await fetch(`${API}/api/publications?${params.toString()}`, {
    // good defaults for SSG/ISR:
    next: { revalidate: 60 }, // or set longer in prod
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch publications: ${res.status}`);
  }

  const data: StrapiListResponse<StrapiPublication> = await res.json();
  const list = (data.data ?? []).map(mapStrapiToPublication);

  // Optional: sort by publishedAt desc
  list.sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
    if (Number.isNaN(ad)) return 1;
    if (Number.isNaN(bd)) return -1;
    return bd - ad;
  });

  return list;
}

export async function getAllPublicationSlugs(locale = "en"): Promise<string[]> {
  const items = await getAllPublications(locale);
  return items.map((item) => item.slug);
}

export async function getPublicationData(
  slug: string,
  locale = "en"
): Promise<PublicationType> {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.append("populate", "pdf");
  params.append("populate", "cover");

  // Fetch by slug or documentId
  const pUrl = `${API}/api/publications/${slug}?${params.toString()}`;
  console.log("Fetching publication URL:", pUrl);
  const res = await fetch(pUrl, {
    // good defaults for SSG/ISR:
    next: { revalidate: 60 }, // or set longer in prod
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch publication "${slug}": ${res.status}`);
  }

  const json: StrapiDetailResponse<StrapiPublication> = await res.json();
  const item = json.data;

  if (!item) {
    throw new Error(`Publication not found: ${slug}`);
  }

  return mapStrapiToPublication(item);
}

// ---- Public API ------------------------------------------------------------

export const strapiSource = {
  listSlug: getAllPublicationSlugs,
  list: getAllPublications,
  get: getPublicationData,
};
