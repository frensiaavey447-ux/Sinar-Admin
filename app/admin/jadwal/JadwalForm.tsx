"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  NotebookPen,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  selected: JadwalData | null;
  refreshTable: () => void;
  onClose: () => void;
}

export default function JadwalForm({
  selected,
  refreshTable,
  onClose,
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

resetForm();
refreshTable();
onClose();
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

resetForm();
refreshTable();
onClose();

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

resetForm();
refreshTable();
onClose();
  }

  return (

    <div className="w-full">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Nama Kegiatan */}

    <div className="md:col-span-2">

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

        <NotebookPen
          size={18}
          className="text-[#4D7B38]"
        />

        Nama Kegiatan

      </label>

      <input
        value={namaKegiatan}
        onChange={(e) =>
          setNamaKegiatan(e.target.value)
        }
        placeholder="Masukkan nama kegiatan"
        className="
          w-full
          h-11
          rounded-2xl
          border
          border-gray-200
          px-5
          bg-white
          shadow-sm
          outline-none
          transition-all
          focus:ring-4
          focus:ring-green-100
          focus:border-[#4D7B38]
          text-gray-900
placeholder:text-gray-500
        "
      />

    </div>

    {/* Tanggal */}

    <div>

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

        <CalendarDays
          size={18}
          className="text-[#4D7B38]"
        />

        Tanggal

      </label>

      <input
        type="date"
        value={tanggal}
        onChange={(e) =>
          setTanggal(e.target.value)
        }
        className="
          w-full
          h-11
          rounded-2xl
          border
          border-gray-200
          px-5
          bg-white
          shadow-sm
          outline-none
          transition-all
          focus:ring-4
          focus:ring-green-100
          focus:border-[#4D7B38]
          text-gray-900
placeholder:text-gray-400
        "
      />

    </div>

    {/* Waktu */}

    <div>

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

        <Clock3
          size={18}
          className="text-[#4D7B38]"
        />

        Waktu

      </label>

      <input
        value={waktu}
        onChange={(e) =>
          setWaktu(e.target.value)
        }
        placeholder="08:00 - 10:00"
        className="
          w-full
          h-11
          rounded-2xl
          border
          border-gray-200
          px-5
          bg-white
          shadow-sm
          outline-none
          transition-all
          focus:ring-4
          focus:ring-green-100
          focus:border-[#4D7B38]
          text-gray-900
placeholder:text-gray-400
        "
      />

    </div>

    {/* Lokasi */}

    <div className="md:col-span-2">

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

        <MapPin
          size={18}
          className="text-[#4D7B38]"
        />

        Lokasi

      </label>

      <input
        value={lokasi}
        onChange={(e) =>
          setLokasi(e.target.value)
        }
        placeholder="Masukkan lokasi kegiatan"
        className="
          w-full
          h-11
          rounded-2xl
          border
          border-gray-200
          px-5
          bg-white
          shadow-sm
          outline-none
          transition-all
          focus:ring-4
          focus:ring-green-100
          focus:border-[#4D7B38]
          text-gray-900
placeholder:text-gray-400
        "
      />

    </div>

        {/* Tombol */}

    <div className="md:col-span-2 pt-4">

      {!selected ? (

        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={resetForm}
            className="
              w-60
              h-11
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-700
              font-semibold
              hover:bg-gray-100
              transition
              text-gray-900
placeholder:text-gray-400
            "
          >
            Reset
          </button>

          <button
            type="button"
            onClick={simpanData}
            className="
              w-60
              h-11
              rounded-xl
              bg-[#4D7B38]
              hover:bg-[#3F662E]
              text-white
              font-semibold
              transition
              shadow-md
            "
          >
            Simpan
          </button>

        </div>

      ) : (

        <div className="flex justify-center gap-4 mt-4">

          <button
            type="button"
            onClick={hapusData}
            className="
              w-60
              h-11
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-700
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Hapus
          </button>

          <button
            type="button"
            onClick={updateData}
            className="
              h-11
              w-60
              rounded-xl
              bg-[#4D7B38]
              hover:bg-[#3F662E]
              text-white
              font-semibold
              transition
            "
          >
            Update
          </button>

        </div>

      )}

    </div>

  </div>

</div>

  );
}