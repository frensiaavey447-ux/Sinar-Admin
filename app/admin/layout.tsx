"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#16240D] text-white">
        Memuat...
      </div>
    );
  }

  return <>{children}</>;
}