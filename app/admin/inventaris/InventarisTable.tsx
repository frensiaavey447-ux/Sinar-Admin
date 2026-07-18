"use client";

import { useMemo, useState } from "react";

import {
  Pencil,
  Search,
  Package,
  Boxes,
} from "lucide-react";

import { InventarisData } from "./types";

interface Props {

  data: InventarisData[];

  onSelect: (item: InventarisData) => void;

}

export default function InventarisTable({

  data,

  onSelect,

}: Props) {

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {

    return data.filter((item) =>
      item.nama_alat
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [data, search]);

  return (

    <div className="w-full">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-centertext-[12px] md:justify-between gap-4 mb-5">

        <div className="relative w-full md:max-w-sm text-[12px]">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              text-[12px]
            "
          />

          <input
            type="text"
            placeholder="Cari inventaris..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-8
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              focus:bg-white
              focus:border-[#4D7B38]
              focus:ring-2
              focus:ring-green-100
            "
          />

        </div>

           <div className="flex items-center gap-2">

          <span className="text-sm text-gray-500">
            Total Data
          </span>

          <div
            className="
              bg-[#4D7B38]
              text-white
              px-3
              py-1
              rounded-full
              text-[12px]
              font-semibold
            "
          >
            {filteredData.length}
          </div>

        </div>

      </div>

      {/* Table */}

      <div
        className="
            max-h-[330px]
            overflow-y-auto
            overflow-x-auto
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-md
            text-[12px]
        "
      >

        <table className="w-full">

          <thead className="sticky top-0 z-10 bg-[#4D7B38]">

            <tr className="bg-[#4D7B38] text-white ">

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Foto
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Nama Alat
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Jumlah
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Aksi
              </th>

            </tr>

          </thead>

       <tbody className="divide-y divide-gray-100">

            {filteredData.length === 0 ? (


              <tr>

                <td
                  colSpan={4}
                  className="
                    py-12
                    text-center
                    text-gray-500
                  "
                >

                  Tidak ada data inventaris.

                </td>

              </tr>

            ) : (

              filteredData.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="px-5 py-2">

                    {item.foto ? (

<img
  src={item.foto}
  alt={item.nama_alat}
  className="
    w-14
    h-14
    rounded-lg
    object-cover
    border
    border-gray-200
  "
/>

                    ) : (

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-gray-100
                          flex
                          items-center
                          justify-center
                          text-gray-400
                        "
                      >

                        <Package size={26} />

                      </div>

                    )}

                  </td>

                  <td className="px-5 py-4 font-medium">

                    {item.nama_alat}

                  </td>

          <td className="px-5 py-4">

  <div className="flex items-center gap-3">

    <Boxes
      size={20}
      className="text-[#4D7B38]"
    />

    <span>{item.jumlah}</span>

  </div>

</td>

               <td className="px-5 py-4">

  <button
    onClick={() => onSelect(item)}
    className="
      flex
      items-center
      justify-center
      w-10
      h-10
      rounded-full
      bg-[#4D7B38]
      hover:bg-[#3F662E]
      text-white
      transition
    "
  >

    <Pencil size={18} />

  </button>

</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
         {/* Footer */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">

        <p className="text-sm text-gray-500">
          Menampilkan
          <span className="mx-1 font-semibold text-[#4D7B38]">
            {filteredData.length}
          </span>
          jadwal kegiatan.
        </p>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <p className="text-xs text-gray-400">
            Klik ikon edit untuk mengubah data
          </p>

        </div>

      </div>

    </div>

  );

}