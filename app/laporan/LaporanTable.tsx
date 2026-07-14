"use client";

import { LaporanData } from "./types";

interface Props {
  data: LaporanData[];
  onSelect: (item: LaporanData) => void;
}

export default function LaporanTable({
  data,
  onSelect,
}: Props) {
  return (
    <div
      className="
        mt-8
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
          bg-[#557D3E]
          px-6
          py-4
        "
      >
        <h2 className="text-white text-2xl font-bold">
          Data Laporan Keuangan
        </h2>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#EEF3EC]">

            <tr>

              <th className="px-5 py-4 text-center font-bold">
                No
              </th>

              <th className="px-5 py-4 text-left font-bold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left font-bold">
                Jenis
              </th>

              <th className="px-5 py-4 text-left font-bold">
                Kategori
              </th>

              <th className="px-5 py-4 text-left font-bold">
                Deskripsi
              </th>

              <th className="px-5 py-4 text-right font-bold">
                Jumlah
              </th>

              <th className="px-5 py-4 text-center font-bold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="
                    py-14
                    text-center
                    text-gray-500
                  "
                >
                  Belum ada data laporan keuangan.
                </td>

              </tr>

            ) : (

              data.map((item, index) => (

                <tr
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="
                    border-b
                    cursor-pointer
                    hover:bg-green-50
                    transition
                  "
                >

                  <td className="px-5 py-4 text-center">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    {item.tanggal}
                  </td>

                  <td className="px-5 py-4">
                    {item.jenis}
                  </td>

                  <td className="px-5 py-4">
                    {item.kategori}
                  </td>

                  <td className="px-5 py-4 max-w-[280px]">
                    {item.deskripsi}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">

                    Rp{" "}

                    {Number(item.jumlah).toLocaleString(
                      "id-ID"
                    )}

                  </td>

                  <td className="px-5 py-4 text-center">

                    <span
                      className={`
                        inline-block
                        rounded-full
                        px-4
                        py-1
                        text-sm
                        font-semibold
                        text-white
                        ${
                          item.status === "Lunas"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}