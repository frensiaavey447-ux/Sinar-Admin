"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

import { supabase } from "../lib/supabase";
import type { AnakData } from "./page";

interface Props {
  selected: AnakData | null;
  refreshTable: () => void;
}

export default function AnakForm({
  selected,
  refreshTable,
}: Props) {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [nextId, setNextId] = useState(1);

async function getNextId() {
  const { data, error } = await supabase
    .from("anak")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    return;
  }

  if (data && data.length > 0) {
    setNextId(Number(data[0].id) + 1);
  } else {
    setNextId(1);
  }
}

useEffect(() => {
  getNextId();
}, []);

useEffect(() => {
  if (selected) {
    setNama(selected.nama);
    setJenisKelamin(selected.jenis_kelamin);
    setTanggalLahir(selected.tanggal_lahir);
    setTempatLahir(selected.tempat_lahir);
    setAlamat(selected.alamat);
    setNoHp(selected.no_hp);
    setPreview(selected.foto ?? "");
  } else {
    resetForm();
  }
}, [selected]);
  function resetForm() {
    setNama("");
    setJenisKelamin("");
    setTanggalLahir("");
    setTempatLahir("");
    setAlamat("");
    setNoHp("");
    setFoto(null);
    setPreview("");

    getNextId();
  }

  async function uploadFoto() {
    if (!foto) return preview;

    const ext = foto.name.split(".").pop();

    const fileName =
      `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("anak")
      .upload(fileName, foto);

    if (error) {
      alert(error.message);
      return "";
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("anak")
      .getPublicUrl(fileName);

    return publicUrl;
  }
    async function simpanData() {
    if (
      !nama ||
      !jenisKelamin ||
      !tanggalLahir ||
      !tempatLahir ||
      !alamat ||
      !noHp
    ) {
      alert("Lengkapi semua data.");
      return;
    }

    const fotoUrl = await uploadFoto();

    const { error } = await supabase
      .from("anak")
      .insert({
        nama,
        jenis_kelamin: jenisKelamin,
        tanggal_lahir: tanggalLahir,
        tempat_lahir: tempatLahir,
        alamat,
        no_hp: noHp,
        foto: fotoUrl,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil ditambahkan");

    refreshTable();
    resetForm();
  }

  async function updateData() {
    if (!selected) {
      alert("Pilih data yang akan diupdate.");
      return;
    }

    const fotoUrl = await uploadFoto();

    const { error } = await supabase
      .from("anak")
      .update({
        nama,
        jenis_kelamin: jenisKelamin,
        tanggal_lahir: tanggalLahir,
        tempat_lahir: tempatLahir,
        alamat,
        no_hp: noHp,
        foto: fotoUrl || preview,
      })
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil diupdate");

    refreshTable();
    resetForm();
  }

  async function hapusData() {
    if (!selected) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const { error } = await supabase
      .from("anak")
      .delete()
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil dihapus");

await refreshTable();
resetForm();
await getNextId();
  }

  return (
  <div className="w-full">

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

      {/* ================= FORM ================= */}

      <div className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-semibold text-[18px]">
            No
          </label>

<input
  value={selected ? selected.id : nextId}
  readOnly
  className="h-11 bg-[#E8E8E8] rounded-xl px-4 outline-none"
/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-semibold text-lg">
            Nama
          </label>

          <input
            value={nama}
            onChange={(e)=>setNama(e.target.value)}
            className="h-11 bg-[#E8E8E8] rounded-xl px-4 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Jenis Kelamin
          </label>

          <select
            value={jenisKelamin}
            onChange={(e)=>setJenisKelamin(e.target.value)}
            className="h-11 bg-[#E8E8E8] rounded-xl px-4 outline-none"
          >

            <option value="">
              Pilih
            </option>

            <option value="Laki-laki">
              Laki-laki
            </option>

            <option value="Perempuan">
              Perempuan
            </option>

          </select>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Tanggal Lahir
          </label>

          <input
            type="date"
            value={tanggalLahir}
            onChange={(e)=>setTanggalLahir(e.target.value)}
            className="h-11 bg-[#E8E8E8] rounded-xl px-4 outline-none"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Tempat Lahir
          </label>

          <input
            value={tempatLahir}
            onChange={(e)=>setTempatLahir(e.target.value)}
            className="h-11 bg-[#E8E8E8] rounded-xl px-4 outline-none"
          />

        </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            Alamat
          </label>

          <textarea
            value={alamat}
            onChange={(e)=>setAlamat(e.target.value)}
            rows={3}
            className="
              bg-[#E8E8E8]
              rounded-xl
              px-4
              py-3
              outline-none
              resize-none
            "
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-3">

          <label className="font-semibold text-lg">
            No Telp
          </label>
<input
  type="tel"
  value={noHp}
  onChange={(e)=>setNoHp(e.target.value)}
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
          Foto Anak
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
            onChange={(e)=>{
              const file = e.target.files?.[0];

              if(!file) return;

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

            <Plus
              size={70}
              className="text-gray-400"
            />

          )}

        </label>
                <div className="grid grid-cols-2 gap-3 mt-8 w-full">

          <button
            onClick={simpanData}
            className="
              h-11
              rounded-xl
              bg-[#4D7B38]
              hover:bg-[#41692F]
              text-white
              font-semibold
              transition
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
              transition
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
              transition
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
              transition
            "
          >
            Reset
          </button>

        </div>

      </div>

    </div>

  </div>
);
}
