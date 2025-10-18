import PublicationCard from "../../components/PublicationCard";
import { PublicationType } from "../../types/publication";
import { listPublications } from "@/lib/publications";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function PublicationListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const publications = await listPublications(locale);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-[#23313b] mb-8">
        All Publications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {publications.map((p: PublicationType) => (
          <PublicationCard
            key={p.slug}
            slug={p.slug}
            contentHtml={p.contentHtml}
            title={p.title}
            pdf_url={p.pdf_url}
            cover_photo={p.cover_photo}
            publishedAt={p.publishedAt}
            description={p.description}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
