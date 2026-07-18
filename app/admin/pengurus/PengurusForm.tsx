"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
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
  const [previewFoto, setPreviewFoto] = useState("");

useEffect(() => {
  if (selected) {
    setNama(selected.nama);
    setJabatan(selected.jabatan);
    setPreviewFoto(selected.foto ?? "");
  } else {
    resetForm();
  }
}, [selected]);

function resetForm() {
  setNama("");
  setJabatan("");
  setFoto(null);
  setPreviewFoto("");
}

async function simpanPengurus() {
  if (!nama || !jabatan) {
    alert("Lengkapi semua data!");
    return;
  }

  let fotoUrl: string | null = null;

  // Upload foto jika ada
if (foto) {
  console.log(foto);

  const fileName = `${Date.now()}-${foto.name}`;

  const { data: uploadData, error: uploadError } =
  await supabase.storage
    .from("pengurus")
    .upload(fileName, foto);

console.log(uploadData);
console.log(uploadError);

if (uploadError) {
  alert(uploadError.message);
  return;
}

  const { data } = supabase.storage
    .from("pengurus")
    .getPublicUrl(fileName);

  console.log(data.publicUrl);

  fotoUrl = data.publicUrl;
}

  if (selected) {
    const { error } = await supabase
      .from("pengurus")
.update({
  nama,
  jabatan,
  foto: fotoUrl ?? selected?.foto,
})
      .eq("id", selected.id);

    if (error) {
      alert(error.message);
      return;
    }

  } else {
    const { error } = await supabase
      .from("pengurus")
      .insert({
        nama,
        jabatan,
        foto: fotoUrl,
      });

    if (error) {
      alert(error.message);
      return;
    }
  }

  resetForm();
  clearSelected();
  refreshTable();
}

return (
<div
  className="
    w-full
    space-y-5
    text-[12px]
  "
>

      <div className="space-y-5">

                {/* Nama */}
        <div className="md:col-span-2">

<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap 
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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

        {/* Jabatan */}
        <div className="md:col-span-2">
 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            Jabatan 
          </label>

          <select
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
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
        <div className="flex flex-col items-center gap-3">

<label
  className="
    w-full
    text-[#29411C]
    font-semibold
  "
>
  Foto
</label>

         <div className="w-full flex justify-center">

            <label
  htmlFor="foto"
  className="
w-[130px]
h-[130px]
rounded-full
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
) : previewFoto ? (
  <img
    src={previewFoto}
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
    className="
  h-11
  rounded-xl
  shadow-md
  transition-all
  hover:scale-[1.02]
"
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