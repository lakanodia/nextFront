import { listPublicationSlugs } from "@/lib/publications";
import RedirectToDefaultLocale from "./redirect";

export default function Page({ params }: { params: { slug: string } }) {
  return <RedirectToDefaultLocale slug={params.slug} />;
}

export async function generateStaticParams() {
  // Define slugs for static export
  const slugs = await listPublicationSlugs();

  return slugs.map((slug) => ({ slug }));
}
