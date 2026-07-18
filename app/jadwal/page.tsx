"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface JadwalData {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export default function JadwalPage() {
  const [jadwal, setJadwal] = useState<JadwalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJadwal();
  }, []);

  async function getJadwal() {
    setLoading(true);

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setJadwal(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#123523] text-white">

      <Navbar />

      {/* Header */}

      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-5xl font-bold text-white">
            Jadwal Kegiatan
          </h1>

        </div>

      </section>

      {/* Content */}

      <section className="flex-1 py-10">

        <div className="max-w-7xl mx-auto px-6">

          {loading ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[...Array(6)].map((_, index) => (

                <div
                  key={index}
                  className="
                    h-[340px]
                    rounded-[28px]
                    bg-white text-gray-900
                    animate-pulse
                  "
                />

              ))}

            </div>

          ) : jadwal.length === 0 ? (

            <div className="text-center py-32">

              <div className="text-7xl">
                📅
              </div>

              <h2 className="mt-5 text-3xl font-bold text-white">
                Belum Ada Jadwal
              </h2>

              <p className="mt-3 text-gray-300">
                Jadwal kegiatan akan ditampilkan di sini.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-10
                justify-items-center
              "
            >

                            {jadwal.map((item) => {

              const status =
                new Date(item.tanggal) >= new Date()
                  ? "Akan Datang"
                  : "Selesai";

              const tanggal = new Date(item.tanggal);

              const tanggalFormat = tanggal.toLocaleDateString(
                "id-ID",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              );

              return (

                <div
                  key={item.id}
                  className="
                    group
                    relative

                    w-full
                    max-w-[350px]
                    min-h-[300px]

                    rounded-[28px]

                    bg-white text-gray-900

                    border
                    border-gray-200

                    shadow-lg

                    p-5

                    transition-all
                    duration-300
                    ease-in-out

                    hover:-translate-y-2
                    hover:scale-[1.02]
                    hover:shadow-2xl
                    hover:border-[#4D7B38]
                  "
                >

                  {/* Status */}

                  <span
                    className={`
                      absolute
                      top-6
                      right-6

                      rounded-full
                      px-4
                      py-1

                      text-xs
                      font-semibold

                      transition-all
                      duration-300

                      ${
                        status === "Akan Datang"
                          ? "bg-green-100 text-green-700 group-hover:bg-[#4D7B38] group-hover:text-white"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {status}
                  </span>

                  {/* Judul */}

                  <h2
                    className="
                      text-[28px]
                      font-bold
                      text-[#183928]
                      leading-tight
                      pr-24
                    "
                  >
                    {item.nama_kegiatan}
                  </h2>

                  <div className="w-16 h-1 rounded-full bg-[#D9B24C] mt-5 mb-8" />

                  {/* Tanggal */}

                  <div className="flex items-start gap-4 mb-6">

                    <div
                      className="
                        w-12
                        h-12

                        rounded-full

                        bg-[#4D7B38]

                        flex
                        items-center
                        justify-center

                        text-white

                        transition-all
                        duration-300

                        group-hover:rotate-6
                      "
                    >

                      <CalendarDays size={20} />

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Tanggal
                      </p>

                      <p className="font-semibold text-[#183928]">
                        {tanggalFormat}
                      </p>

                    </div>

                  </div>

                  {/* Waktu */}

                  <div className="flex items-start gap-4 mb-6">

                    <div
                      className="
                        w-12
                        h-12

                        rounded-full

                        bg-[#4D7B38]

                        flex
                        items-center
                        justify-center

                        text-white

                        transition-all
                        duration-300

                        group-hover:rotate-6
                      "
                    >

                      <Clock3 size={20} />

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Waktu
                      </p>

                      <p className="font-semibold text-[#183928]">
                        {item.waktu}
                      </p>

                    </div>

                  </div>

                  {/* Lokasi */}

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-12
                        h-12

                        rounded-full

                        bg-[#4D7B38]

                        flex
                        items-center
                        justify-center

                        text-white

                        transition-all
                        duration-300

                        group-hover:rotate-6
                      "
                    >

                      <MapPin size={20} />

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Lokasi
                      </p>

                      <p className="font-semibold text-[#183928]">
                        {item.lokasi}
                      </p>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}