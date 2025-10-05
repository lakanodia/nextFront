import type { Metadata } from "next";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Suspense } from "react";

export const metadata: Metadata = { title: "My Blog" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string>>; // ✅ generic safe type
}) {
  const { locale } = await params; // ok in Next 15 runtime
  const normalized = locale === "ka" ? "ka" : "en"; // narrow manually

  return (
    <html lang={normalized}>
      <body className="min-h-screen bg-gray-50">
        <header className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link href={`/${normalized}`} className="font-semibold">
            My Blog
          </Link>
          <Suspense fallback={<div className="text-sm opacity-70">…</div>}>
            <LocaleSwitcher locale={normalized} />
          </Suspense>
        </header>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
