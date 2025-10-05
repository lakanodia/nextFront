import { apiUrl } from "@/constants";
import PublicationCard from "../components/PublicationCard";
import { Publication } from "../types/publication";

export default async function PublicationsPage() {
  const res = await fetch(`${apiUrl}/api/blogs?populate=cover`);
  const data = await res.json();

  if (data.data.length === 0) {
    return <div className="max-w-7xl mx-auto py-12 px-4">No publications found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-[#23313b] mb-8">All Publications</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.data.map((d: Publication) => (
          <PublicationCard key={d.id} {...d} />
        ))}
      </div>
    </div>
  );
}