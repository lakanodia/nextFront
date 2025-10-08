import { apiUrl } from "@/constants";
import PublicationCard from "../components/PublicationCard";
import { Publication } from "../types/publication";
import { getAllPublications } from "@/lib/publications";

type Props = {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
};

export default async function PublicationsPage() {
  // const res = await fetch(
  //   `${apiUrl}/api/publications?populate=pdf&populate=cover`
  // );
  // const data = await res.json();
  // const publications: Publication[] = data.data;

  // if (data.data.length === 0) {
  //   return (
  //     <div className="max-w-7xl mx-auto py-12 px-4">No publications found</div>
  //   );
  // }

  const publications = await getAllPublications();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-[#23313b] mb-8">
        All Publications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {publications.map((publications: Props) => (
          // <PublicationCard key={d.id} {...d} />
          <PublicationCard
            key={publications.id}
            title={publications.title}
            publishedAt="2025-10-08"
            description=""
            id={publications.id}
            pdf={{
              url: "",
            }}
            cover={{
              url: "",
            }}
          />
        ))}
      </div>
    </div>
  );
}
