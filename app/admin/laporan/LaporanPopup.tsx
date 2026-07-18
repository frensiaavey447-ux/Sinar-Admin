"use client";

import { X } from "lucide-react";

import LaporanForm from "./LaporanForm";
import { LaporanData } from "./types";

interface Props {
  open: boolean;

  selected: LaporanData | null;

  form: LaporanData;
  setForm: React.Dispatch<
    React.SetStateAction<LaporanData>
  >;

  onClose: () => void;

  onSave: () => void;
  onEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function LaporanPopup({
  open,
  selected,
  form,
  setForm,
  onClose,
  onSave,
  onEdit,
  onUpdate,
  onDelete,
}: Props) {

  if (!open) return null;

  const isEdit = selected !== null;

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

              {isEdit
                ? "Edit Laporan"
                : "Tambah Laporan"}

            </h2>

            <p className="text-gray-500 mt-1">

              {isEdit
                ? "Perbarui data laporan keuangan."
                : "Tambahkan laporan keuangan baru."}

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

          <LaporanForm
            selected={selected}
            form={form}
            setForm={setForm}
            onSave={onSave}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />

        </div>

      </div>

    </div>

  );

}