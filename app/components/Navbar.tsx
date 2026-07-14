"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-[#557D3E] shadow-md">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">

          {/* ================= MOBILE ================= */}
          <div className="flex h-16 items-center justify-between lg:hidden">

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="text-white"
            >
              <Menu size={28} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={42}
                height={42}
                priority
                className="object-contain"
              />

              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>

          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden h-20 items-center justify-between lg:flex">

            {/* Logo */}
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
                alt="Logo YPI"
                width={60}
                height={60}
                priority
              />
            </div>

            {/* Menu */}
            <nav className="flex items-center gap-8">

              <Link href="/home" className="font-semibold text-white hover:text-yellow-300">
                Home
              </Link>

              <Link href="/jadwal" className="font-semibold text-white hover:text-yellow-300">
                Jadwal Kegiatan
              </Link>

              <Link href="/pengurus" className="font-semibold text-white hover:text-yellow-300">
                Pengurus
              </Link>

              <Link href="/laporan" className="font-semibold text-white hover:text-yellow-300">
                Laporan Keuangan
              </Link>

              <Link href="/inventaris" className="font-semibold text-white hover:text-yellow-300">
                Inventaris
              </Link>

              <Link href="/anak" className="font-semibold text-white hover:text-yellow-300">
                Data Anak-Anak
              </Link>

            </nav>

            {/* Login */}
            <Link href="/login">
              <button className="rounded-full bg-[#FFC928] px-8 py-2 font-bold text-[#29411C] transition hover:bg-yellow-400">
                Login
              </button>
            </Link>

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

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#557D3E] shadow-2xl transition-transform duration-300 lg:hidden ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
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

        {/* Content */}
        <div className="flex h-[calc(100%-64px)] flex-col">

          {/* Menu */}
          <nav className="flex-1 flex flex-col text-white font-semibold">

            <Link
              href="/home"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Home
            </Link>

            <Link
              href="/jadwal"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Jadwal Kegiatan
            </Link>

            <Link
              href="/pengurus"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Pengurus
            </Link>

            <Link
              href="/laporan"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Laporan Keuangan
            </Link>

            <Link
              href="/inventaris"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Inventaris
            </Link>

            <Link
              href="/anak"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 px-6 py-4 hover:bg-[#6E8F2F]"
            >
              Data Anak-Anak
            </Link>

          </nav>

          {/* Login Button */}
          <div className="p-6">
            <Link href="/login">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-[#FFC928] py-3 text-lg font-bold text-[#29411C] transition hover:bg-yellow-400"
              >
                Logout
              </button>
            </Link>
          </div>

        </div>
      </aside>
    </>
  );
}