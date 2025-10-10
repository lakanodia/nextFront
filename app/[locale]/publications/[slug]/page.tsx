import PublicationCard from "@/app/components/PublicationCard";
import { getPublication, listPublicationSlugs } from "@/lib/publications";

export function generateStaticParams() {
  const locales = ["en", "ru"];
  return listPublicationSlugs().then((slugs) => {
    const paths = locales.flatMap((locale) =>
      slugs.map((slug) => ({ locale, slug }))
    );

    // Add paths without a locale, defaulting to "en"
    const defaultLocalePaths = slugs.map((slug) => ({ locale: "en", slug }));

    return [...paths, ...defaultLocalePaths];
  });
}

export default async function SinglePublicationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const publicationData = await getPublication(slug, locale);

  return (
    <PublicationCard
      key={publicationData.slug}
      slug={publicationData.slug}
      contentHtml={publicationData.contentHtml}
      title={publicationData.title}
      pdf_url={publicationData.pdf_url}
      cover_photo={publicationData.cover_photo}
      publishedAt={publicationData.publishedAt}
      description={publicationData.description}
      locale={locale}
    />
  );
}
