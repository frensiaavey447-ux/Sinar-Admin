"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { InventarisData } from "./page";

interface Props {
  selected: InventarisData | null;
  refreshTable: () => void;
  clearSelected: () => void;
}

export default function InventarisForm({
  selected,
  refreshTable,
  clearSelected,
}: Props) {

  const [namaAlat, setNamaAlat] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {

    if (selected) {
      setNamaAlat(selected.nama_alat);
      setJumlah(String(selected.jumlah));
      setPreview(selected.foto);
    } else {
      resetForm();
    }

  }, [selected]);

  function resetForm() {
    setNamaAlat("");
    setJumlah("");
    setFoto(null);
    setPreview("");

    clearSelected();
  }

  async function uploadFoto() {
  if (!foto) return preview;

  const fileName = `${Date.now()}-${foto.name}`;

  const { error } = await supabase.storage
    .from("inventaris")
    .upload(fileName, foto);

  if (error) {
    alert(error.message);
    return "";
  }

  const { data } = supabase.storage
    .from("inventaris")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function simpanData() {

  if (!namaAlat || !jumlah) {
    alert("Lengkapi semua data.");
    return;
  }

  const fotoUrl = await uploadFoto();

  if (!fotoUrl) return;

  const { error } = await supabase
    .from("inventaris")
    .insert({
      nama_alat: namaAlat,
      jumlah: Number(jumlah),
      foto: fotoUrl,
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

  let fotoUrl = preview;

  if (foto) {
    fotoUrl = await uploadFoto();
  }

  const { error } = await supabase
    .from("inventaris")
    .update({
      nama_alat: namaAlat,
      jumlah: Number(jumlah),
      foto: fotoUrl,
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

  if (!confirm("Yakin ingin menghapus inventaris?")) return;

  const { error } = await supabase
    .from("inventaris")
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

    <div className="grid lg:grid-cols-[1fr_280px] gap-8">

      {/* ================= FORM ================= */}

      <div className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Nama Alat
          </label>

          <input
            value={namaAlat}
            onChange={(e) => setNamaAlat(e.target.value)}
            className="
              h-11
              bg-[#E8E8E8]
              rounded-xl
              px-4
              outline-none
              w-full
            "
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Jumlah
          </label>

          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="
              h-11
              bg-[#E8E8E8]
              rounded-xl
              px-4
              outline-none
              w-full
            "
          />

        </div>

      </div>

      {/* ================= FOTO ================= */}

      <div className="flex flex-col items-center">

        <h2 className="font-bold text-2xl mb-5">
          Foto Inventaris
        </h2>

        <label
          className="
            w-[180px]
            h-[180px]
            rounded-2xl
            border-2
            border-dashed
            border-gray-400
            cursor-pointer
            overflow-hidden
            flex
            items-center
            justify-center
            bg-[#F7F7F7]
          "
        >

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {

              const file = e.target.files?.[0];

              if (!file) return;

              setFoto(file);

              setPreview(
                URL.createObjectURL(file)
              );

            }}
          />

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="
                w-full
                h-full
                object-cover
              "
            />

          ) : (

            <span className="text-gray-500">
              Upload Foto
            </span>

          )}

        </label>

      </div>

    </div>

    {/* ================= BUTTON ================= */}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

      <button
        onClick={simpanData}
        className="
          h-11
          rounded-xl
          bg-[#4D7B38]
          hover:bg-[#41692F]
          text-white
          font-semibold
        "
      >
        Simpan
      </button>

      <button
        onClick={updateData}
        disabled={!selected}
        className="
          h-11
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          text-white
          font-semibold
        "
      >
        Update
      </button>

      <button
        onClick={hapusData}
        disabled={!selected}
        className="
          h-11
          rounded-xl
          bg-red-600
          hover:bg-red-700
          disabled:opacity-50
          text-white
          font-semibold
        "
      >
        Hapus
      </button>

      <button
        onClick={resetForm}
        className="
          h-11
          rounded-xl
          bg-gray-600
          hover:bg-gray-700
          text-white
          font-semibold
        "
      >
        Reset
      </button>

    </div>

  </div>
);
}