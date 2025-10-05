// app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en");
  }, [router]);

  // Fallback link for no-JS
  return (
    <div style={{ padding: 16 }}>
      <Link href="/en" className="text-blue-600 underline">
        English
      </Link>
    </div>
  );
}
