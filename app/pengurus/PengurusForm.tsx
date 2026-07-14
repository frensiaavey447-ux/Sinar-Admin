"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PengurusData } from "./page";

interface Props {
  selected: PengurusData | null;
  refreshTable: () => void;
  clearSelected: () => void;
}

export default function PengurusForm({
  selected,
  refreshTable,
  clearSelected,
}: Props) {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  useEffect(() => {
    if (selected) {
      setNama(selected.nama);
      setJabatan(selected.jabatan);
    } else {
      resetForm();
    }
  }, [selected]);

  function resetForm() {
    setNama("");
    setJabatan("");
    setFoto(null);
  }

  async function simpanPengurus() {
    if (!nama || !jabatan) {
      alert("Lengkapi semua data!");
      return;
    }

    if (selected) {
      const { error } = await supabase
        .from("pengurus")
        .update({
          nama,
          jabatan,
        })
        .eq("id", selected.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil diupdate");
    } else {
      const { error } = await supabase
        .from("pengurus")
        .insert({
          nama,
          jabatan,
          foto: null,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil ditambahkan");
    }

    resetForm();
    clearSelected();
    refreshTable();
  }

return (
<div
  className="
    w-full
    bg-white
    rounded-[28px]
    shadow-lg
    p-6
    lg:p-8
  "
>

      <div className="space-y-7">

                {/* Nama */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">

          <label className="lg:w-[180px] text-[16px] font-semibold">
            Nama Lengkap :
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="
              flex-1
              h-[40px]
              w-full
              rounded-2xl
              bg-[#ECECEC]
              px-4
              text-[16px]
              outline-none
              border
              border-transparent
              focus:border-[#4F7D3A]
            "
          />

        </div>

        {/* Jabatan */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">

          <label className="lg:w-[180px] text-[16px] font-semibold">
            Jabatan :
          </label>

          <select
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            className="
              flex-1
              h-[40px]
              w-full
              rounded-2xl
              bg-[#ECECEC]
              px-4
              text-[16px]
              outline-none
              border
              border-transparent
              focus:border-[#4F7D3A]
            "
          >
            <option value="">Pilih Jabatan</option>
            <option>Ketua</option>
            <option>Wakil Ketua</option>
            <option>Sekretaris</option>
            <option>Bendahara</option>
            <option>Koordinator</option>
          </select>

        </div>

        {/* Foto */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-3">

          <label className="lg:w-[180px] text-[16px] font-semibold lg:pt-12">
            Foto :
          </label>

          <div className="flex justify-center lg:justify-start flex-1">

            <label
  htmlFor="foto"
  className="
    w-[160px]
    h-[160px]
    rounded-xl
    border-2
    border-dashed
    border-gray-400
    overflow-hidden
    cursor-pointer
    flex
    items-center
    justify-center
    bg-[#F8F8F8]
  "
>
  {foto ? (
    <img
      src={URL.createObjectURL(foto)}
      alt="Preview"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-[70px] text-gray-400">+</span>
  )}
</label>

            <input
              id="foto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFoto(
                  e.target.files ? e.target.files[0] : null
                )
              }
            />

          </div>

        </div>

              </div>

      {/* Button */}
 <div className="mt-6 grid grid-cols-2 gap-3">
  <button
    onClick={simpanPengurus}
    className="h-11 rounded-xl bg-[#4F7D3A] hover:bg-[#41682F] text-white font-semibold"
  >
    {selected ? "Update" : "Simpan"}
  </button>

  <button
    type="button"
    onClick={() => {
      resetForm();
      clearSelected();
    }}
    className="h-11 rounded-xl bg-[#B22222] hover:bg-[#991B1B] text-white font-semibold"
  >
    Batal
  </button>
</div>

    </div>
  );
}