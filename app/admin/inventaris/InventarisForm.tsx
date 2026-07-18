"use client";

import {
  ImagePlus,
  Package,
  Hash,
} from "lucide-react";

import { InventarisData } from "./types";

interface Props {

  selected: InventarisData | null;

  form: InventarisData;

  setForm: React.Dispatch<
    React.SetStateAction<InventarisData>
  >;

  onSave: () => void;
  onEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;

}

export default function InventarisForm({

  selected,

  form,

  setForm,

  onSave,

  onEdit,

  onUpdate,

  onDelete,

}: Props) {

  const isEdit = selected !== null;

  function resetForm() {

    setForm({
      ...form,
      nama_alat: "",
      jumlah: 0,
      foto: "",
    });

  }

  return (

    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Nama Alat */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

            <Package
              size={18}
              className="text-[#4D7B38]"
            />

            Nama Alat

          </label>

          <input
            value={form.nama_alat}
            onChange={(e)=>

              setForm({
                ...form,
                nama_alat:e.target.value,
              })

            }
            placeholder="Masukkan nama inventaris"
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

        {/* Jumlah */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

            <Hash
              size={18}
              className="text-[#4D7B38]"
            />

            Jumlah

          </label>

          <input
            type="number"
            value={form.jumlah}
            onChange={(e)=>

              setForm({
                ...form,
                jumlah:Number(e.target.value),
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
placeholder:text-gray-400
            "
          />

        </div>

                {/* Foto */}

        <div className="md:col-span-2">

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

            <ImagePlus
              size={18}
              className="text-[#4D7B38]"
            />

            Foto Inventaris

          </label>

          <label
            className="
              w-full
              h-[220px]
              rounded-2xl
              border-2
              border-dashed
              border-gray-300
              bg-gray-50
              flex
              items-center
              justify-center
              cursor-pointer
              overflow-hidden
              hover:border-[#4D7B38]
              transition
            "
          >

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (!file) return;

                setForm({
                  ...form,
                  foto: URL.createObjectURL(file),
                });

              }}
            />

            {form.foto ? (

              <img
                src={form.foto}
                alt="Preview"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            ) : (

              <div className="flex flex-col items-center text-gray-500">

                <ImagePlus size={45} />

                <p className="mt-3 text-sm">

                  Klik untuk upload foto

                </p>

              </div>

            )}

          </label>

        </div>

              </div>

      {/* Tombol */}

      <div className="flex justify-end gap-3 mt-8">

        {isEdit ? (

          <>

            <button
              type="button"
              onClick={onDelete}
              className="
                px-6
                h-11
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                text-[#3F662E]
                font-semibold
                transition
              "
            >
              Hapus
            </button>

            <button
              type="button"
              onClick={onUpdate}
              className="
                px-6
                h-11
                rounded-2xl
                bg-[#4D7B38]
                hover:bg-[#3F662E]
                text-white
                font-semibold
                transition
              "
            >
              Update
            </button>

          </>

        ) : (

          <>

            <button
              type="button"
              onClick={resetForm}
              className="
                px-6
                h-11
                rounded-2xl
                border
                border-gray-300
                hover:bg-gray-100
                font-semibold
                transition
                text-gray-800
              "
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onSave}
              className="
                px-6
                h-11
                rounded-2xl
                bg-[#4D7B38]
                hover:bg-[#3F662E]
                text-white
                font-semibold
                transition
              "
            >
              Simpan
            </button>

          </>

        )}

      </div>

    </div>

  );

}