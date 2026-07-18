"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";

export default function MobileNavbar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="
          lg:hidden

          bg-[#467235]

          h-16

          flex
          items-center
          justify-between

          px-4

          shadow-md
        "
      >

        <button
          onClick={() => setOpen(true)}
        >
          <Menu
            size={32}
            className="text-white"
          />
        </button>

        <div className="flex items-center gap-2">

          <Image
            src="/image/logo22.png"
            alt=""
            width={38}
            height={38}
          />

          <Image
            src="/image/logo111.png"
            alt=""
            width={34}
            height={34}
          />

        </div>

      </header>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}