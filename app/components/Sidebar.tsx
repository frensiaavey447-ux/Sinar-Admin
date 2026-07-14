"use client";

import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({
  open,
  onClose,
}: Props) {
  const menus = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Profil",
      href: "/profile",
    },
    {
      name: "Jadwal Kegiatan",
      href: "/jadwal",
    },
    {
      name: "Pengurus",
      href: "/pengurus",
    },
    {
      name: "Laporan Pengeluaran",
      href: "/laporan",
    },
    {
      name: "Inventaris",
      href: "/inventaris",
    },
    {
      name: "Data Anak-Anak",
      href: "/Data_anak_anak",
    },
  ];

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          bg-black/60
          z-40
          transition-all

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0

          h-screen
          w-72

          bg-[#467235]

          z-50

          transition-all
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="flex items-center justify-between p-5 border-b border-white/20">

          <h2 className="text-white font-bold text-xl">
            Menu
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <nav className="flex flex-col p-5 gap-4">

          {menus.map((menu) => (

            <Link
              key={menu.href}
              href={menu.href}
              onClick={onClose}
              className="
                text-white
                font-semibold
                rounded-lg
                px-3
                py-3

                hover:bg-[#355728]
                transition
              "
            >
              {menu.name}
            </Link>

          ))}

          <button
            className="
              mt-6

              bg-[#FFC928]

              rounded-xl

              py-3

              text-[#355728]

              font-bold
            "
          >
            Login
          </button>

        </nav>

      </aside>
    </>
  );
}