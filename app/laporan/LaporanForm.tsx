"use client";

import { LaporanData } from "./types";

interface Props {
  form: LaporanData;
  setForm: React.Dispatch<React.SetStateAction<LaporanData>>;

  onSave: () => void;
  onEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function LaporanForm({
  form,
  setForm,
  onSave,
  onEdit,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div
      className="
        w-full
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-6
        md:p-8
      "
    >
      <div className="space-y-5">

        {/* NO */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
            No
          </label>

          <input
            value={form.id || ""}
            readOnly
            className="
              w-full
              h-11
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          />
        </div>

        {/* TANGGAL */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
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
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          />
        </div>

        {/* JENIS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
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
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          >
            <option value="">
              Pilih Jenis
            </option>

            <option value="Pemasukan">
              Pemasukan
            </option>

            <option value="Pengeluaran">
              Pengeluaran
            </option>

          </select>
        </div>

        {/* KATEGORI */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
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
            className="
              w-full
              h-11
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          />
        </div>

                {/* DESKRIPSI */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-start
          "
        >
          <label className="font-semibold text-[17px] md:pt-3">
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
            className="
              w-full
              min-h-[140px]
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              py-3
              outline-none
              resize-none
            "
          />
        </div>

        {/* JUMLAH */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
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
            className="
              w-full
              h-11
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          />
        </div>

        {/* STATUS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[170px_1fr]
            gap-2
            md:gap-5
            items-center
          "
        >
          <label className="font-semibold text-[17px]">
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
              rounded-xl
              bg-gray-100
              border
              border-gray-300
              px-4
              outline-none
            "
          >
            <option value="">
              Pilih Status
            </option>

            <option value="Lunas">
              Lunas
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>
        </div>

        {/* BUTTON */}

        <div className="pt-6">

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >

            <button
              onClick={onSave}
              className="
                w-32
                h-11
                rounded-xl
                bg-[#557D3E]
                hover:bg-[#456831]
                text-white
                font-semibold
                transition
              "
            >
              Simpan
            </button>

            <button
              onClick={onEdit}
              className="
                w-32
                h-11
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                transition
              "
            >
              Edit
            </button>

            <button
              onClick={onUpdate}
              className="
                w-32
                h-11
                rounded-xl
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                font-semibold
                transition
              "
            >
              Update
            </button>

            <button
              onClick={onDelete}
              className="
                w-32
                h-11
                rounded-xl
                bg-red-600
                hover:bg-red-700
                text-white
                font-semibold
                transition
              "
            >
              Hapus
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}