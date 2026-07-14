"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Pengurus {
  id: number;
  nama: string;
  jabatan: string;
  foto: string | null;
}

interface PengurusTableProps {
  refresh: boolean;
  onSelect: (pengurus: Pengurus) => void;
}

export default function PengurusTable({
  refresh,
  onSelect,
}: PengurusTableProps) {
  const [data, setData] = useState<Pengurus[]>([]);

  useEffect(() => {
    getPengurus();
  }, [refresh]);

  async function getPengurus() {
    const { data, error } = await supabase
      .from("pengurus")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setData(data || []);
  }

  async function hapusPengurus(id: number) {
    const konfirmasi = confirm("Yakin ingin menghapus data ini?");

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("pengurus")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getPengurus();
  }

  return (
    <div
      className="
        bg-white
        rounded-[18px]
        shadow-lg
        p-10
        flex
        flex-col
        h-[450px]
        overflow-hidden
      "
    >
      {/* Judul */}
      <h2 className="text-[32px] font-bold mb-5">
        Daftar Pengurus
      </h2>

      {/* List Pengurus */}
      <div
        className="
          flex-1
          overflow-y-auto
          pr-2
          space-y-2
        "
      >
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-300">
            Belum ada data.
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="
                bg-[#ECECEC]
                rounded-2xl
                px-4
                py-3
                flex
                items-center
                justify-between
                cursor-pointer
                hover:bg-[#E3E3E3]
                transition
              "
            >
              <div>
                <h3 className="text-[18px] font-semibold">
                  {item.nama}
                </h3>

                <p className="text-gray-600 text-[16px]">
                  {item.jabatan}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapusPengurus(item.id);
                }}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-red-600
                  hover:bg-red-700
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <Trash2
                  size={20}
                  className="text-white"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}