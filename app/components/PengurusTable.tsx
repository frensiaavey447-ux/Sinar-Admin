"use client";

import type { PengurusType } from "../pengurus/page";

interface Props {
  data: PengurusType[];
  loading: boolean;
  onSelect: (data: PengurusType) => void;
}

export default function PengurusTable({
  data,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 h-full">

      <h2 className="text-[22px] font-bold mb-6">
        Nama Lengkap | Posisi
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">
          Belum ada data pengurus
        </p>
      ) : (
        <div className="space-y-4">

          {data.map((item) => (

            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="
                w-full
                h-14
                rounded-2xl
                bg-[#E8E8E8]
                hover:bg-[#DADADA]
                transition
                flex
                items-center
                px-6
                font-semibold
                text-left
              "
            >

              <span className="truncate">
                {item.nama}
              </span>

              <span className="mx-4">|</span>

              <span>
                {item.jabatan}
              </span>

            </button>

          ))}

        </div>
      )}

    </div>
  );
}