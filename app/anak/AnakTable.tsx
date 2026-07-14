"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { supabase } from "../lib/supabase";
import type { AnakData } from "./page";

interface Props {
  refresh: boolean;
  onSelect: (anak: AnakData) => void;
}

export default function AnakTable({
  refresh,
  onSelect,
}: Props) {
  const [data, setData] = useState<AnakData[]>([]);

  useEffect(() => {
    getData();
  }, [refresh]);

  async function getData() {
    const { data, error } = await supabase
      .from("anak")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setData(data || []);
  }

  async function hapus(id: number) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const { error } = await supabase
      .from("anak")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getData();
  }

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        bg-white
        shadow-2xl
        border
        border-gray-200
      "
    >
      {/* Scroll Horizontal */}
      <div className="overflow-x-auto">
        {/* Scroll Vertikal */}
        <div className="max-h-[650px] overflow-y-auto">

          <table
            className="
              w-full
              min-w-[1250px]
              border-collapse
            "
          >

            <thead className="sticky top-0 z-20">

  <tr
    className="
      bg-gradient-to-r
      from-[#355E2B]
      to-[#4D7B38]
      text-white
    "
  >

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      No
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Foto
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Nama
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Jenis Kelamin
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Tanggal Lahir
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Tempat Lahir
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Alamat
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      No HP
    </th>

    <th className="px-4 py-4 text-center font-bold border border-green-700 whitespace-nowrap">
      Aksi
    </th>

  </tr>

</thead>

<tbody>

  {data.length === 0 ? (

  <tr>

    <td
      colSpan={9}
      className="
        py-14
        text-center
        text-gray-500
        text-lg
      "
    >
      Belum ada data anak.
    </td>

  </tr>

) : (

  data.map((item, index) => (

    <tr
      key={item.id}
      onClick={() => onSelect(item)}
      className="
        cursor-pointer
        border-b
        border-gray-200
        transition-all
        duration-200
        hover:bg-green-50
        even:bg-gray-50
      "
    >

      <td className="px-4 py-4 text-center font-medium">
        {index + 1}
      </td>

      <td className="px-4 py-4">

        <div className="flex justify-center">

          {item.foto ? (

            <Image
              src={item.foto}
              alt={item.nama}
              width={65}
              height={65}
              className="
                rounded-xl
                object-cover
                border
                border-gray-300
                shadow-sm
                w-[65px]
                h-[65px]
              "
            />

          ) : (

            <div
              className="
                w-[65px]
                h-[65px]
                rounded-xl
                bg-gray-200
                border
                border-gray-300
              "
            />

          )}

        </div>

      </td>

      <td className="px-4 py-4 font-medium whitespace-nowrap">
        {item.nama}
      </td>

      <td className="px-4 py-4 text-center whitespace-nowrap">
        {item.jenis_kelamin}
      </td>

      <td className="px-4 py-4 text-center whitespace-nowrap">
        {item.tanggal_lahir}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {item.tempat_lahir}
      </td>

      <td
        className="
          px-4
          py-4
          max-w-[280px]
          break-words
        "
      >
        {item.alamat}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {item.no_hp}
      </td>

      <td className="px-4 py-4">

        <div className="flex justify-center">

          <button
            onClick={(e) => {
              e.stopPropagation();
              hapus(item.id);
            }}
            className="
              w-10
              h-10
              rounded-full
              bg-red-500
              hover:bg-red-600
              transition
              duration-200
              flex
              items-center
              justify-center
              shadow-md
            "
          >

            <Trash2
              size={18}
              className="text-white"
            />

          </button>

        </div>

      </td>

    </tr>

  ))

)}

      </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}
