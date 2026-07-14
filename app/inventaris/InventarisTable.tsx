"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { InventarisData } from "./page";

interface Props {
  refresh: boolean;
  onSelect: (inventaris: InventarisData) => void;
}

export default function InventarisTable({
  refresh,
  onSelect,
}: Props) {
  const [data, setData] = useState<InventarisData[]>([]);

  useEffect(() => {
    getData();
  }, [refresh]);

  async function getData() {
    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setData(data || []);
  }

  async function hapusData(id: number) {
    const konfirmasi = confirm(
      "Yakin ingin menghapus inventaris?"
    );

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("inventaris")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getData();
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">

        <thead>
          <tr className="bg-[#4D7B38] text-white">
            <th className="p-2">No</th>
            <th className="p-2 text-left">Foto</th>
            <th className="p-2 text-left">Nama Alat</th>
            <th className="p-2 text-center">Jumlah</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
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
                className="border-b hover:bg-gray-50 cursor-pointer"
              >

                <td className="p-4 text-center">
                  {index + 1}
                </td>

                <td className="p-4">
                  <img
                    src={item.foto || "/no-image.png"}
                    alt={item.nama_alat}
                    className="w-10 h-10 object-cover rounded-lg mx-auto"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {item.nama_alat}
                </td>

                <td className="p-4 text-center">
                  {item.jumlah}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      hapusData(item.id);
                    }}
                    className="w-5 h-5 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center mx-auto"
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