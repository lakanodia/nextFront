// components/locale-switcher.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SUPPORTED = ["en", "ka"] as const;
type Locale = (typeof SUPPORTED)[number];

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const other: Locale = locale === "en" ? "ka" : "en";

  // replace the first segment (/en or /ka)
  const switchLocale = () => {
    if (!pathname) return;
    const segments = pathname.split("/");
    // segments[0] == "" for leading slash
    if (SUPPORTED.includes(segments[1] as Locale)) {
      segments[1] = other;
    } else {
      // if path has no locale (shouldn’t happen with i18n), prefix it
      segments.splice(1, 0, other);
    }
    const nextPath =
      segments.join("/") + (search?.toString() ? `?${search}` : "");
    router.push(nextPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="text-sm px-3 py-1 rounded border hover:bg-gray-100"
      aria-label="Switch language"
    >
      {other.toUpperCase()}
    </button>
  );
}
