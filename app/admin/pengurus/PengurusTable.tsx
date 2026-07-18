"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPengurus();
  }, [refresh]);

async function getPengurus() {
  console.log("=== PENGURUSTABLE TERBARU ===");

  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .order("id", { ascending: true });

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    console.log(error);
    return;
  }

  setData(data || []);
}

  async function hapusPengurus(id: number) {
    const konfirmasi = confirm(
      "Yakin ingin menghapus data ini?"
    );

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

  const filteredData = data.filter((item) =>
    item.nama
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full text-[12px]">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-[20px] font-bold text-[#29411C]">
          Daftar Pengurus
        </h2>

        <input
          type="text"
          placeholder="Cari Pengurus..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            mt-5
            h-11
            w-full
            rounded-xl
            border-2
            border-gray-200
            px-4
            outline-none
            transition
            focus:border-[#557D3E]
          "
        />

      </div>

      {/* List */}

<div
  className="
    h-[295px]
    overflow-y-auto
    pr-2
    space-y-4
  "
>

        {filteredData.length === 0 ? (

          <div
            className="
              h-11
              flex
              flex-col
              items-center
              justify-center
              text-gray-400
            "
          >

            <div className="text-[12px]">
              👥
            </div>

            <p className="mt-4 text-lg font-semibold">
              Belum ada data pengurus
            </p>

            <p className="text-sm">
              Tambahkan pengurus pertama.
            </p>

          </div>

        ) : (

          filteredData.map((item) => (

            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-2
                shadow-sm
                transition-all
                duration-300
                hover:shadow-lg
                hover:-translate-y-1
                cursor-pointer
              "
            >

              <div className="flex items-center gap-4">

                {/* Foto */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#ECECEC]
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                  "
                >

                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">
                      👤
                    </span>
                  )}

                </div>

                {/* Data */}

                <div className="flex-1">

                  <h3 className="text-[12px] font-bold text-lg text-[#29411C]">
                    {item.nama}
                  </h3>

                  <p className="text-gray-500">
                    {item.jabatan}
                  </p>

                </div>

                {/* Hapus */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hapusPengurus(item.id);
                  }}
                  className="
                    w-10
                    h-11
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
                    size={18}
                    className="text-white"
                  />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}