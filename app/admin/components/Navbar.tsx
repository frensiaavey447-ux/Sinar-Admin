"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("isLogin") === "true";
    setIsLogin(login);
  }, []);

  function handleLogout() {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    router.push("/home");
  }

  // ================= PUBLIC / ADMIN LINK =================

  const homeLink = isLogin ? "/home" : "/home";

  const profileLink = isLogin
    ? "/admin/profile"
    : "/profile";

  const jadwalLink = isLogin
    ? "/admin/jadwal"
    : "/jadwal";

  const pengurusLink = isLogin
    ? "/admin/pengurus"
    : "/pengurus";

  const laporanLink = isLogin
    ? "/admin/laporan"
    : "/laporan";

  const inventarisLink = isLogin
    ? "/admin/inventaris"
    : "/inventaris";

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 bg-[#557D3E] shadow-md">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">

          {/* ================= MOBILE ================= */}

          <div className="flex h-16 items-center justify-between lg:hidden">

            <button
              onClick={() => setOpen(true)}
              className="text-white"
            >
              <Menu size={28} />
            </button>

            <div className="flex items-center gap-2">

              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={42}
                height={42}
                priority
              />

              <Image
                src="/image/logo111.png"
                alt="Logo"
                width={42}
                height={42}
                priority
              />

            </div>

          </div>

          {/* ================= DESKTOP ================= */}

          <div className="hidden h-20 items-center justify-between lg:flex">

            <div className="flex items-center gap-3">

              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={60}
                height={60}
                priority
              />

              <Image
                src="/image/logo111.png"
                alt="Logo"
                width={60}
                height={60}
                priority
              />

            </div>

            <nav className="flex items-center gap-8">

                            <Link
                href={homeLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Home
              </Link>

              <Link
                href={profileLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Profile
              </Link>

              <Link
                href={jadwalLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Jadwal Kegiatan
              </Link>

              <Link
                href={pengurusLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Pengurus
              </Link>

              <Link
                href={laporanLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Laporan Keuangan
              </Link>

              <Link
                href={inventarisLink}
                className="font-semibold text-white transition hover:text-yellow-300"
              >
                Inventaris
              </Link>

            </nav>

            {/* ================= LOGIN ================= */}

            {isLogin ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#FFC928] px-8 py-2 font-bold text-[#29411C] transition hover:bg-yellow-400"
              >
                Log Out
              </button>
            ) : (
              <Link href="/login">
                <button className="rounded-full bg-[#FFC928] px-8 py-2 font-bold text-[#29411C] transition hover:bg-yellow-400">
                  Login
                </button>
              </Link>
            )}

          </div>

        </div>

      </header>

      {/* ================= OVERLAY ================= */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

            {/* ================= MOBILE SIDEBAR ================= */}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#557D3E] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-end border-b border-white/20 px-5">
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-gray-200"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex h-[calc(100%-64px)] flex-col">

          <nav className="flex-1 flex flex-col font-semibold text-white">

            <Link
              href={homeLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Home
            </Link>

            <Link
              href={profileLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Profile
            </Link>

            <Link
              href={jadwalLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Jadwal Kegiatan
            </Link>

            <Link
              href={pengurusLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Pengurus
            </Link>

            <Link
              href={laporanLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Laporan Keuangan
            </Link>

            <Link
              href={inventarisLink}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Inventaris
            </Link>

          </nav>

          {/* Login / Logout */}

          <div className="p-6">

            {isLogin ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full rounded-xl bg-[#FFC928] py-3 text-lg font-bold text-[#29411C] transition hover:bg-yellow-400"
              >
                Log Out
              </button>
            ) : (
              <Link href="/login">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-[#FFC928] py-3 text-lg font-bold text-[#29411C] transition hover:bg-yellow-400"
                >
                  Login
                </button>
              </Link>
            )}

          </div>

        </div>

      </aside>

    </>
  );
}