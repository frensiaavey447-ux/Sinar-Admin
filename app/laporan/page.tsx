"use client";

import { useEffect, useState } from "react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";

import { supabase } from "../lib/supabase";

interface LaporanData {
  id: number;
  tanggal: string;
  jenis: string;
  kategori: string;
  deskripsi: string;
  jumlah: number;
  status: string;
}

export default function LaporanPage() {
  const [laporan, setLaporan] = useState<LaporanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaporan();
  }, []);

  async function getLaporan() {
    setLoading(true);

    const { data, error } = await supabase
      .from("laporan")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setLaporan(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      <Navbar />

      <section
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-4
          md:px-7
          py-6
          pb-20
        "
      >

        {/* Header */}

        <div className="mb-6">

          <h1 className="text-[38px] font-bold text-white">
            Laporan Keuangan
          </h1>

        </div>

        {loading ? (

          <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse h-[500px]" />

        ) : laporan.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="text-7xl mb-5">
              📄
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Belum Ada Laporan
            </h2>

            <p className="mt-3 text-gray-500">
              Data laporan keuangan akan muncul di sini.
            </p>

          </div>

        ) : (

          <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">
            <div
              className="
                max-h-[450px]
                overflow-auto
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-md
              "
            >
                              <table className="w-full min-w-[950px]">

                <thead className="sticky top-0 z-20 bg-[#4D7B38]">

                  <tr className="text-white">

                    <th className="px-5 py-4 text-left text-[13px] font-semibold">
                      Tanggal
                    </th>

                    <th className="px-5 py-4 text-left text-[13px] font-semibold">
                      Jenis
                    </th>

                    <th className="px-5 py-4 text-left text-[13px] font-semibold">
                      Kategori
                    </th>

                    <th className="px-5 py-4 text-left text-[13px] font-semibold">
                      Deskripsi
                    </th>

                    <th className="px-5 py-4 text-right text-[13px] font-semibold">
                      Jumlah
                    </th>

                    <th className="px-5 py-4 text-center text-[13px] font-semibold">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {laporan.map((item) => (

                    <tr
                      key={item.id}
                      className="
                        hover:bg-green-50
                        transition-all
                        duration-200
                      "
                    >

                      {/* Tanggal */}

                      <td className="px-5 py-4 text-[12px]">
                        {item.tanggal}
                      </td>

                      {/* Jenis */}

                      <td className="px-5 py-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              item.jenis === "Pemasukan"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {item.jenis}
                        </span>

                      </td>

                      {/* Kategori */}

                      <td className="px-5 py-4 text-[12px] font-medium">
                        {item.kategori}
                      </td>

                      {/* Deskripsi */}

                      <td className="px-5 py-4 max-w-[280px] text-[12px]">
                        {item.deskripsi}
                      </td>

                      {/* Jumlah */}

                      <td className="px-5 py-4 text-right font-semibold text-[12px]">

                        Rp{" "}
                        {Number(item.jumlah).toLocaleString("id-ID")}

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4 text-center">

                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              item.status === "Lunas"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-3">

              <p className="text-sm text-gray-500">

                Total Laporan

                <span className="mx-2 font-semibold text-[#4D7B38]">

                  {laporan.length}

                </span>

                data

              </p>

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-green-500"></span>

                <p className="text-xs text-gray-400">

                  Transparansi laporan keuangan masjid

                </p>

              </div>

            </div>

          </div>

        )}

      </section>

      <Footer />

    </main>

  );
}