"use client";
import { FaGlobe } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
  function handleSectionClick(e: React.MouseEvent<HTMLAnchorElement>, section: string) {
    if (pathname !== "/") {
      e.preventDefault();
      router.push(`/#${section}`);
    }
    // თუ "/"-ზე ხარ, უბრალოდ anchor იმუშავებს
  }
  return (
    <header className="w-full bg-[#23313b] h-20 font-sans">
      <div className="max-w-7xl mx-auto flex items-center px-6 h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-white text-lg font-semibold tracking-wide">
            RepormaticsCapital
          </span>
        </div>
        {/* Menu */}
        <nav className="flex gap-8 ml-auto">
          <a href="/" className="text-white text-base font-medium hover:text-blue-300 transition">Home</a>
          <a href="#about" className="text-white text-base font-medium hover:text-blue-300 transition" onClick={e => handleSectionClick(e, "about")}>About Us</a>
          <a href="#services" className="text-white text-base font-medium hover:text-blue-300 transition" onClick={e => handleSectionClick(e, "services")}>Services</a>
          <a href="#management" className="text-white text-base font-medium hover:text-blue-300 transition" onClick={e => handleSectionClick(e, "management")}>Management</a>
          <a href="/publications" className="text-white text-base font-medium hover:text-blue-300 transition">Publications</a>
          <a href="#subscribe" className="text-white text-base font-medium hover:text-blue-300 transition" onClick={e => handleSectionClick(e, "subscribe")}>Subscribe</a>
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

