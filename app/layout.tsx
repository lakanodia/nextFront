"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      const defaultLocale = "en";
      const supportedLocales = ["en", "ru"];
      const currentLocale = pathname.split("/")[1];

      if (!supportedLocales.includes(currentLocale)) {
        router.replace(`/${defaultLocale}`);
      }
    }
  }, [pathname, router]);

  const locale = pathname.split("/")[1] || "en";

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header locale={locale} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
