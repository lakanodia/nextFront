import { FaGlobe } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header({ locale }: { locale: string }) {
  const router = useRouter();

  function handleSectionClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) {
    e.preventDefault();
    router.push(`/${locale}/#${section}`);
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#23313b]/90 h-20 font-sans shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center px-6 h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="vercel.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-white text-lg font-semibold tracking-wide">
            RepormaticsCapital
          </span>
        </div>
        {/* Menu */}
        <nav className="flex gap-8 ml-auto">
          <Link
            href={`/${locale}/`}
            className="text-white text-base font-medium hover:text-blue-300 transition"
          >
            Home
          </Link>
          <Link
            href={`/${locale}/#about`}
            className="text-white text-base font-medium hover:text-blue-300 transition"
            onClick={(e) => handleSectionClick(e, "about")}
          >
            About Us
          </Link>
          <Link
            href="#services"
            className="text-white text-base font-medium hover:text-blue-300 transition"
            onClick={(e) => handleSectionClick(e, "services")}
          >
            Services
          </Link>
          <Link
            href="#management"
            className="text-white text-base font-medium hover:text-blue-300 transition"
            onClick={(e) => handleSectionClick(e, "management")}
          >
            Management
          </Link>
          <Link
            href={`/${locale}/publications`}
            className="text-white text-base font-medium hover:text-blue-300 transition"
          >
            Publications
          </Link>
          <Link
            href="#subscribe"
            className="text-white text-base font-medium hover:text-blue-300 transition"
            onClick={(e) => handleSectionClick(e, "subscribe")}
          >
            Subscribe
          </Link>
        </nav>
        {/* Language */}
        <div className="flex items-center gap-2 ml-8 text-white">
          <FaGlobe />
          <select className="bg-[#23313b] text-white border border-gray-500 rounded px-2 py-1">
            <option value="en">EN</option>
            <option value="geo">GEO</option>
            <option value="ru">RU</option>
          </select>
        </div>
      </div>
    </header>
  );
}
