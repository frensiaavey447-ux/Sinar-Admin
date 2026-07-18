"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-4">

      <div className="bg-white rounded-[22px] overflow-hidden shadow-lg">

        <div className="grid lg:grid-cols-[1fr_1fr] min-h-[200px]">

          {/* ================= LEFT ================= */}

          <div className="flex items-center">

            <div className="px-10 lg:px-12 py-6">

              <h1 className="text-[22px] lg:text-[28px] font-bold leading-tight text-[#36552B]">
                Selamat Datang di SINAR
                <br />
                (Sistem Informasi,
                <br />
                Ngaji dan Administrasi Rumah Ibadah)
              </h1>

              <div className="flex gap-3 mt-8">

                <MapPin
                  size={22}
                  className="text-[#D4A017] mt-1 shrink-0"
                />

                <p className="text-[15px] text-[#4A4A4A] leading-8">
                  Lokasi: Perumahan Jl. Bumi Waringin Indah
                  2 No.1 Blok B1,
                  <br />
                  Waringinjaya,
                  Kedungwaringin,
                  Bekasi,
                  Jawa Barat 17540,
                  Indonesia
                </p>

              </div>
            </div>  

          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative min-h-[250px]">

            <Image
              src="/image/gedung1.jpeg"
              alt="Gedung Yayasan"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />

            {/* Gradient putih */}

            {/* Gradient hanya desktop */}

<div
  className="
    hidden
    lg:block
    absolute
    inset-y-0
    left-0
    w-32
    bg-gradient-to-r
    from-white
    via-white/80
    to-transparent
  "
/>

          </div>

        </div>

      </div>

    </section>
  );
}