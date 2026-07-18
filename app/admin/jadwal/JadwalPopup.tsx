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
          max-w-[70vh]
          max-h-[70vh]
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
            py-2
          "
        >

          <div>

            <h2 className="text-2xl font-bold">

              {selected
                ? "Edit Jadwal"
                : "Tambah Jadwal"}

            </h2>

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
    text-gray-700
  "
>
  <X
    size={24}
    strokeWidth={2.5}
    className="text-gray-700"
  />
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