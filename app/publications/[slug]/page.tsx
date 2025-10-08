import PublicationCard from "@/app/components/PublicationCard";
import { getPublicationData as getPublicationData } from "@/lib/publications";

export function generateStaticParams() {
  return [{ slug: "bonds" }, { slug: "fixed-income" }];
}

export default async function SinglePublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publicationData = await getPublicationData(slug);

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
