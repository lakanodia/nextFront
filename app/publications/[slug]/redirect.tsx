"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToDefaultLocale({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default locale (en)
    router.replace(`/en/publications/${slug}`);
  }, [slug, router]);

  return null;
}
