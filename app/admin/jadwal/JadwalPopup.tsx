"use client";

import { X } from "lucide-react";

import JadwalForm from "./JadwalForm";
import type { JadwalData } from "./page";

interface Props {
  open: boolean;
  selected: JadwalData | null;
  onClose: () => void;
  refreshTable: () => void;
}

export default function JadwalPopup({
  open,
  selected,
  onClose,
  refreshTable,
}: Props) {

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-[90vh]
          max-h-[90vh]
          overflow-y-auto
          animate-in
          fade-in
          zoom-in-80
          text-[12px]
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-8
            py-6
          "
        >

          <div>

            <h2 className="text-2xl font-bold">

              {selected
                ? "Edit Jadwal"
                : "Tambah Jadwal"}

            </h2>

            <p className="text-gray-500 mt-1">

              {selected
                ? "Perbarui data jadwal kegiatan."
                : "Tambahkan jadwal kegiatan baru."}

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-11
              h-11
              rounded-full
              hover:bg-gray-100
              flex
              items-center
              justify-center
            "
          >

            <X size={20} />

          </button>

        </div>

                {/* Form */}

        <div className="p-6 md:p-8">

<JadwalForm
    selected={selected}
    refreshTable={refreshTable}
    onClose={onClose}
/>


        </div>

      </div>

    </div>

  );

}