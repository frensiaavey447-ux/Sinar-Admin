"use client";

import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  NotebookPen,
  Tag,
} from "lucide-react";

import { LaporanData } from "./types";

interface Props {
  selected: LaporanData | null;

  form: LaporanData;

  setForm: React.Dispatch<
    React.SetStateAction<LaporanData>
  >;

  onSave: () => void;
  onEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function LaporanForm({
  selected,
  form,
  setForm,
  onSave,
  onEdit,
  onUpdate,
  onDelete,
}: Props) {

  const resetForm = () => {
    setForm({
      ...form,
      tanggal: "",
      jenis: "",
      kategori: "",
      deskripsi: "",
      jumlah: 0,
      status: "",
    });
  };

  const isEdit = selected !== null;

  return (

    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Tanggal */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <CalendarDays
              size={18}
              className="text-[#4D7B38]"
            />

            Tanggal

          </label>

          <input
            type="date"
            value={form.tanggal}
            onChange={(e) =>
              setForm({
                ...form,
                tanggal: e.target.value,
              })
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
placeholder:text-gray-500
            "
          />

        </div>

        {/* Jenis */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <Tag
              size={18}
              className="text-[#4D7B38]"
            />

            Jenis

          </label>

          <select
            value={form.jenis}
            onChange={(e) =>
              setForm({
                ...form,
                jenis: e.target.value,
              })
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
placeholder:text-gray-500
            "
          >
            <option value="">Pilih Jenis</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>

        </div>

        {/* Kategori */}

        <div className="md:col-span-2">

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <NotebookPen
              size={18}
              className="text-[#4D7B38]"
            />

            Kategori

          </label>

          <input
            value={form.kategori}
            onChange={(e) =>
              setForm({
                ...form,
                kategori: e.target.value,
              })
            }
            placeholder="Masukkan kategori"
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

        {/* Deskripsi */}

        <div className="md:col-span-2">

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <FileText
              size={18}
              className="text-[#4D7B38]"
            />

            Deskripsi

          </label>

          <textarea
            rows={5}
            value={form.deskripsi}
            onChange={(e) =>
              setForm({
                ...form,
                deskripsi: e.target.value,
              })
            }
            placeholder="Masukkan deskripsi laporan"
className="
w-full
rounded-2xl
border
border-gray-200
px-5
py-3
bg-white
shadow-sm
outline-none
resize-none
transition-all
focus:ring-4
focus:ring-green-100
focus:border-[#4D7B38]
text-gray-900
placeholder:text-gray-500
caret-black
"
          />

        </div>

        {/* Jumlah */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <CircleDollarSign
              size={18}
              className="text-[#4D7B38]"
            />

            Jumlah (Rp)

          </label>

          <input
            type="number"
            value={form.jumlah}
            onChange={(e) =>
              setForm({
                ...form,
                jumlah: Number(e.target.value),
              })
            }
            placeholder="0"
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

        {/* Status */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">

            <Tag
              size={18}
              className="text-[#4D7B38]"
            />

            Status

          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
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
"
          >
            <option value="">Pilih Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Pending">Pending</option>
          </select>

        </div>

        {/* Tombol */}

        <div className="md:col-span-2 pt-4">

          {!isEdit ? (

            <div className="flex justify-center gap-4">

              <button
                type="button"
                onClick={resetForm}
                className="w-60 h-11 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={onSave}
                className="w-60 h-11 rounded-xl bg-[#4D7B38] text-white hover:bg-[#3F662E] font-semibold"
              >
                Simpan
              </button>

            </div>

          ) : (

            <div className="flex justify-center gap-4">

<button
  type="button"
  onClick={onDelete}
  className="w-60 h-11 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold"
>
  Hapus
</button>

              <button
                type="button"
                onClick={onUpdate}
                className="w-60 h-11 rounded-xl bg-[#4D7B38] text-white hover:bg-[#3F662E] font-semibold"
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
