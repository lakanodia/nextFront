import PublicationCard from "@/app/components/PublicationCard";
import { getPublicationData as getPublicationData } from "@/lib/publications";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

type Props = {
  id: number;
  title: string;
  pdf: { url: string };
  cover: { url: string };
  publishedAt?: string;
  description?: string;
};

export default async function Publication({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("ID:", id);
  const publicationData = await getPublicationData(id);
  return (
    <PublicationCard
      key={1}
      title={publicationData.title}
      publishedAt="2025-10-08"
      description=""
      id={publicationData.id}
      pdf={{
        url: "",
      }}
      cover={{
        url: "",
      }}
    />
  );
}
