import PublicationCard from "@/app/components/PublicationCard";
import { getPublication, listPublicationSlugs } from "@/lib/publications";

export function generateStaticParams() {
  return listPublicationSlugs().then((slugs) =>
    slugs.map((slug) => ({ slug }))
  );
}

export default async function SinglePublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publicationData = await getPublication(slug);

  return (
    <PublicationCard
      key={1}
      slug={publicationData.slug}
      contentHtml={publicationData.contentHtml}
      title={publicationData.title}
      pdf_url={publicationData.pdf_url}
      cover_photo={publicationData.cover_photo}
      publishedAt={publicationData.publishedAt}
      description={publicationData.description}
    />
  );
}
