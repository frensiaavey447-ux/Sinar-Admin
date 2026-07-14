"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  selected: JadwalData | null;
  refreshTable: () => void;
  clearSelected: () => void;
}

export default function JadwalForm({
  selected,
  refreshTable,
  clearSelected,
}: Props) {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");

  useEffect(() => {
    if (selected) {
      setNamaKegiatan(selected.nama_kegiatan);
      setTanggal(selected.tanggal);
      setWaktu(selected.waktu);
      setLokasi(selected.lokasi);
    } else {
      resetForm();
    }
  }, [selected]);

  function resetForm() {
    setNamaKegiatan("");
    setTanggal("");
    setWaktu("");
    setLokasi("");
    clearSelected();
  }

    async function simpanData() {
    if (
      !namaKegiatan ||
      !tanggal ||
      !waktu ||
      !lokasi
    ) {
      alert("Lengkapi semua data.");
      return;
    }

    const { error } = await supabase
      .from("jadwal")
      .insert({
        nama_kegiatan: namaKegiatan,
        tanggal,
        waktu,
        lokasi,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil ditambahkan");

    resetForm();
    refreshTable();
  }

  async function updateData() {
    if (!selected) return;

    const { error } = await supabase
      .from("jadwal")
      .update({
        nama_kegiatan: namaKegiatan,
        tanggal,
        waktu,
        lokasi,
      })
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil diupdate");

    resetForm();
    refreshTable();
  }

  async function hapusData() {
    if (!selected) return;

    const konfirmasi = confirm(
      "Yakin ingin menghapus jadwal ini?"
    );

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("jadwal")
      .delete()
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil dihapus");

    resetForm();
    refreshTable();
  }

  return (
  <div className="w-full">

    <div className="space-y-5">

      {/* Nama Kegiatan */}

      <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

        <label className="font-semibold text-lg">
          Nama Kegiatan
        </label>

        <input
          value={namaKegiatan}
          onChange={(e) =>
            setNamaKegiatan(e.target.value)
          }
          className="
            h-12
            bg-[#E8E8E8]
            rounded-xl
            px-4
            outline-none
            w-full
          "
        />

      </div>

      {/* Tanggal */}

      <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

        <label className="font-semibold text-lg">
          Tanggal
        </label>

        <input
          type="date"
          value={tanggal}
          onChange={(e) =>
            setTanggal(e.target.value)
          }
          className="
            h-12
            bg-[#E8E8E8]
            rounded-xl
            px-4
            outline-none
            w-full
          "
        />

      </div>

      {/* Waktu */}

      <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

        <label className="font-semibold text-lg">
          Waktu
        </label>

        <input
          value={waktu}
          onChange={(e) =>
            setWaktu(e.target.value)
          }
          placeholder="08:00 - 10:00"
          className="
            h-12
            bg-[#E8E8E8]
            rounded-xl
            px-4
            outline-none
            w-full
          "
        />

      </div>

      {/* Lokasi */}

      <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

        <label className="font-semibold text-lg">
          Lokasi
        </label>

        <input
          value={lokasi}
          onChange={(e) =>
            setLokasi(e.target.value)
          }
          className="
            h-12
            bg-[#E8E8E8]
            rounded-xl
            px-4
            outline-none
            w-full
          "
        />

      </div>

      {/* Button */}

      <div className="grid grid-cols-2 gap-5 pt-4">

        <button
          onClick={simpanData}
          className="
            h-12
            rounded-xl
            bg-[#4D7B38]
            hover:bg-[#41692F]
            text-white
            font-bold
            text-lg
          "
        >
          Simpan
        </button>

        <button
          onClick={hapusData}
          disabled={!selected}
          className="
            h-12
            rounded-xl
            bg-[#9E1E1E]
            hover:bg-[#851818]
            disabled:opacity-50
            text-white
            font-bold
            text-lg
          "
        >
          Hapus
        </button>

        <button
          onClick={updateData}
          disabled={!selected}
          className="
            h-12
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-50
            text-white
            font-bold
            text-lg
          "
        >
          Update
        </button>

        <button
          onClick={resetForm}
          className="
            h-12
            rounded-xl
            bg-gray-600
            hover:bg-gray-700
            text-white
            font-bold
            text-lg
          "
        >
          Reset
        </button>

      </div>

    </div>

  </div>
);
}