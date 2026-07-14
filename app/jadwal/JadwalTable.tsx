"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  refresh: boolean;
  onSelect: (jadwal: JadwalData) => void;
}

export default function JadwalTable({
  refresh,
  onSelect,
}: Props) {
  const [data, setData] = useState<JadwalData[]>([]);

  useEffect(() => {
    getData();
  }, [refresh]);

  async function getData() {
    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setData(data || []);
  }

  async function hapusData(id: number) {
    const konfirmasi = confirm(
      "Yakin ingin menghapus jadwal ini?"
    );

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("jadwal")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getData();
  }

    return (
    <div className="overflow-x-auto mt-8">

      <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">

        <thead>

          <tr className="bg-[#4D7B38] text-white">

            <th className="p-4 text-left">No</th>

            <th className="p-4 text-left">
              Nama Kegiatan
            </th>

            <th className="p-4 text-left">
              Tanggal
            </th>

            <th className="p-4 text-left">
              Waktu
            </th>

            <th className="p-4 text-left">
              Lokasi
            </th>

            <th className="p-4 text-center">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="text-center py-8"
              >
                Belum ada data.
              </td>

            </tr>

          ) : (

            data.map((item, index) => (

              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className="
                  border-b
                  hover:bg-gray-100
                  cursor-pointer
                "
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4">
                  {item.nama_kegiatan}
                </td>

                <td className="p-4">
                  {item.tanggal}
                </td>

                <td className="p-4">
                  {item.waktu}
                </td>

                <td className="p-4">
                  {item.lokasi}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      hapusData(item.id);
                    }}
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-red-600
                      hover:bg-red-700
                      flex
                      items-center
                      justify-center
                      mx-auto
                    "
                  >

                    <Trash2
                      size={18}
                      className="text-white"
                    />

                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}
