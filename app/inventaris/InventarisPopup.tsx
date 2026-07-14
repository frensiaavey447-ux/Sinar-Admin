"use client";

import { useEffect, useState } from "react";
import { Search, X, Package } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Inventaris {
  id: number;
  nama_alat: string;
  jumlah: number;
  foto: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InventarisPopup({
  open,
  onClose,
}: Props) {
  const [inventaris, setInventaris] = useState<Inventaris[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      getInventaris();
    }
  }, [open]);

  async function getInventaris() {
    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("nama_alat", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setInventaris(data || []);
  }

  const filtered = inventaris.filter((item) =>
    item.nama_alat
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

      <div className="bg-[#14240F] rounded-[32px] w-full max-w-7xl h-[90vh] overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Inventaris Masjid
            </h1>

            <p className="text-green-200 mt-1">
              Total Barang : {inventaris.length}
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-12
              h-12
              rounded-full
              bg-red-600
              hover:bg-red-700
              flex
              items-center
              justify-center
              transition
            "
          >
            <X className="text-white" />
          </button>

        </div>

        {/* Search */}

        <div className="px-8 py-5">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari inventaris..."
              className="
                w-full
                h-12
                rounded-xl
                bg-white
                pl-12
                pr-4
                outline-none
              "
            />

          </div>

        </div>

        <div className="px-8 pb-8 overflow-y-auto h-[calc(90vh-160px)]">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {filtered.length === 0 ? (

  <div className="col-span-full flex flex-col items-center justify-center py-20">

    <Package
      size={70}
      className="text-gray-400"
    />

    <h2 className="text-white text-2xl font-bold mt-5">
      Inventaris Tidak Ditemukan
    </h2>

    <p className="text-gray-300 mt-2">
      Coba gunakan kata kunci lain.
    </p>

  </div>

) : (

  filtered.map((item) => (

    <div
      key={item.id}
      className="
        group
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >

      {/* Badge */}

      <div className="absolute mt-4 ml-4 z-20">

        <span
          className="
            bg-[#4D7B38]
            text-white
            text-sm
            font-bold
            px-4
            py-1
            rounded-full
            shadow-lg
          "
        >
          {item.jumlah} Unit
        </span>

      </div>

      {/* FOTO */}

      <div
        className="
          h-40
          bg-[#F5F5F5]
          flex
          items-center
          justify-center
          p-6
        "
      >

        <img
          src={item.foto || "/no-image.png"}
          alt={item.nama_alat}
          className="
            h-20
            w-auto
            object-contain
            transition-all
            duration-300
            group-hover:scale-110
          "
        />

      </div>

      {/* Isi */}

      <div className="p-5">

        <h2
          className="
            text-xl
            font-bold
            text-center
            text-gray-800
          "
        >
          {item.nama_alat}
        </h2>

        <div
          className="
            mt-5
            flex
            justify-center
          "
        >

          <div
            className="
              bg-green-100
              text-green-700
              font-semibold
              rounded-full
              px-5
              py-2
            "
          >
            Tersedia {item.jumlah} Unit
          </div>

        </div>

      </div>

    </div>

  ))

)}

          </div>

        </div>

      </div>

    </div>

  );
}