"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { supabase } from "../lib/supabase";
import type { PengurusData } from "../pengurus/page";

interface Props {
  selected: PengurusData | null;
  refreshData: () => void;
  clearSelected: () => void;
}

export default function PengurusForm({
  selected,
  refreshData,
  clearSelected,
}: Props) {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");

  useEffect(() => {
    if (selected) {
      setNama(selected.nama);
      setJabatan(selected.jabatan);
    } else {
      setNama("");
      setJabatan("");
    }
  }, [selected]);

  async function simpanData() {
    if (!nama || !jabatan) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    const { error } = await supabase.from("pengurus").insert({
      nama,
      jabatan,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil disimpan");

    setNama("");
    setJabatan("");

    refreshData();
  }

  async function updateData() {
    if (!selected) return;

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

    clearSelected();
    refreshData();
  }

  async function hapusData() {
    if (!selected) return;

    if (!confirm("Yakin ingin menghapus?")) return;

    const { error } = await supabase
      .from("pengurus")
      .delete()
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil dihapus");

    clearSelected();

    setNama("");
    setJabatan("");

    refreshData();
  }

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 h-full">

      <div className="grid grid-cols-[180px_1fr] gap-y-8 items-center">

        <label className="font-bold text-[18px]">
          Nama Lengkap :
        </label>

        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="
            w-[330px]
            h-[38px]
            rounded-2xl
            bg-[#E6E6E6]
            px-4
            outline-none
          "
        />

        <label className="font-bold text-[18px]">
          Posisi :
        </label>

        <input
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          className="
            w-[330px]
            h-[38px]
            rounded-2xl
            bg-[#E6E6E6]
            px-4
            outline-none
          "
        />

        <label className="font-bold text-[18px]">
          Foto :
        </label>

        <label
          className="
            w-[140px]
            h-[140px]
            border-2
            border-gray-400
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <input type="file" hidden />

          <Plus size={60} />
        </label>

      </div>

      <div className="flex justify-between mt-12">

        <button
          onClick={selected ? updateData : simpanData}
          className="
            w-[160px]
            h-[54px]
            rounded-2xl
            bg-[#4D7C3A]
            text-white
            font-bold
            text-lg
          "
        >
          {selected ? "Update" : "Simpan"}
        </button>

        <button
          onClick={hapusData}
          disabled={!selected}
          className="
            w-[160px]
            h-[54px]
            rounded-2xl
            bg-[#9B1C1C]
            text-white
            font-bold
            text-lg
            disabled:opacity-50
          "
        >
          Hapus
        </button>

      </div>

    </div>
  );
}