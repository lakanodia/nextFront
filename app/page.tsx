import { apiUrl } from "@/constants";
import PublicationCard from "./components/PublicationCard";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SubscribeSection from "./components/SubscribeSection";
import ManagementSection from "./components/ManagementSection";
import { Publication } from "./types/publication";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";
import Image from "next/image";

export default async function Home() {
  const res = await fetch(
    `${apiUrl}/api/publications?populate=pdf&populate=cover`
  );
  const data = await res.json();

  if (data.data.length === 0) {
    return <div>No articles found</div>;
  }

  // მხოლოდ 3 პუბლიკაცია
  const publications = data.data.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 mt-10 font-sans">
      <section className="relative h-[400px] flex items-center justify-center pt-20 mb-16">
        <Image
          src="https://www.pnbmetlife.com/content/dam/pnb-metlife/images/articles/savings/importance-of-investment.jpg"
          alt="Cover"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Opening up new opportunities in the ancient world
          </h1>
          <p className="text-lg mb-8">
            Your trusted financial partner & advisor.
          </p>
          <a
            href="#about"
            className="bg-[#23313b]/80 hover:bg-[#23313b] transition-colors duration-300 rounded flex items-center justify-center w-16 h-16 mb-2"
            aria-label="Scroll to About"
          >
            <FiArrowDown className="text-white text-3xl" />
          </a>
        </div>
      </section>

      <AboutSection />
      <ServicesSection />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-[#23313b]">Reports</h1>
        <Link
          href="/publications"
          className="text-green-600 font-semibold text-lg flex items-center gap-2 hover:underline"
        >
          View more <span className="text-xl">&#8594;</span>
        </Link>
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
