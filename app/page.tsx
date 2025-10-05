import { apiUrl } from "@/constants";
import PublicationCard from "./components/PublicationCard";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SubscribeSection from "./components/SubscribeSection";
import ManagementSection from "./components/ManagementSection";
import { Publication } from "./types/publication";

export default async function Home() {
  const res = await fetch(`${apiUrl}/api/blogs?populate=cover&locale=ka`);
  const data = await res.json();

  if (data.data.length === 0) {
    return <div>No articles found</div>;
  }

  // მხოლოდ 3 პუბლიკაცია
  const publications = data.data.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <AboutSection />
      <ServicesSection />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-[#23313b]">Reports</h1>
        <a
          href="/publications"
          className="text-green-600 font-semibold text-lg flex items-center gap-2 hover:underline"
        >
          View more <span className="text-xl">&#8594;</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {publications.map((d: Publication) => (
          <PublicationCard key={d.id} {...d} />
        ))}
      </div>

      <ManagementSection />
      <SubscribeSection />
    </div>
  );
}