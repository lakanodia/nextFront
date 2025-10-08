import { apiUrl } from "@/constants";
import PublicationCard from "../components/PublicationCard";
import { PublicationType } from "../types/publication";
import { getAllPublications } from "@/lib/publications";

export default async function PublicationListPage() {
  const publications = await getAllPublications("en");

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
          />
        ))}
      </div>
    </div>
  );
}
