"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Search,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  refresh: boolean;
  onSelect: (jadwal: JadwalData) => void;
}

export default function JadwalTable({
  refresh,
  onSelect,
}: Props) {
  const [data, setData] = useState<JadwalData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [refresh]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", {
        ascending: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setData(data || []);
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        item.nama_kegiatan
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.lokasi
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  return (
    <div className="space-y-4">

            {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:max-w-sm">

          <Search
            size={16}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[12px] text-gray-300"
          />

          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-8
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              focus:bg-white
              focus:border-[#4D7B38]
              focus:ring-2
              focus:ring-green-100
            "
          />

        </div>

        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-500">
            Total Data
          </span>

          <div
            className="
              bg-[#4D7B38]
              text-white
              px-3
              py-1
              rounded-full
              text-[12px]
              font-semibold
            "
          >
            {filteredData.length}
          </div>

        </div>

      </div>

      {/* Table */}

      <div
        className="
            max-h-[330px]
            overflow-y-auto
            overflow-x-auto
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-md
            text-[12px]
        "
      >

        <table className="w-full">

          <thead className="sticky top-0 z-10 bg-[#4D7B38]">

            <tr className="bg-[#4D7B38] text-white ">

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Nama Kegiatan
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Waktu
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Lokasi
              </th>

              <th className="px-5 py-4 text-center text-[13px] font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-center text-[13px] font-semibold">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {filteredData.length === 0 ? (

  <tr>

    <td
      colSpan={6}
      className="py-12 text-center"
    >

      <CalendarDays
        size={30}
        className="mx-auto text-gray-300 mb-4"
      />

      <h2 className="text-lg font-semibold text-gray-700">
        Belum ada jadwal kegiatan
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Klik tombol Tambah Jadwal untuk membuat jadwal baru.
      </p>

    </td>

  </tr>

) : (

  filteredData.map((item) => {

    const status =
      new Date(item.tanggal) >= new Date()
        ? "Akan Datang"
        : "Selesai";

    return (

      <tr
        key={item.id}
        className="
          hover:bg-green-50
          transition-all
          duration-200
        "
      >

        {/* Nama */}

        <td className="px-5 py-4">

          <div>

            <h3 className="text-[12px] font-semibold text-gray-800">
              {item.nama_kegiatan}
            </h3>

          </div>

        </td>

        {/* Tanggal */}

        <td className="px-5 py-4">

          <div className="flex items-center gap-2 text-[12px]">

            <CalendarDays
              size={15}
              className="text-[#4D7B38]"
            />

            {item.tanggal}

          </div>

        </td>

        {/* Waktu */}

        <td className="px-5 py-4">

          <div className="flex items-center gap-2 text-[12px]">

            <Clock3
              size={15}
              className="text-[#4D7B38]"
            />

            {item.waktu}

          </div>

        </td>

        {/* Lokasi */}

        <td className="px-5 py-4">

          <div className="flex items-center gap-2 text-[12px]">

            <MapPin
              size={15}
              className="text-[#4D7B38]"
            />

            {item.lokasi}

          </div>

        </td>

        {/* Status */}

        <td className="px-5 py-4 text-center">

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs text-[12px] ${
              status === "Akan Datang"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>

        </td>

        {/* Aksi */}

        <td className="px-5 py-4 text-center">

          <button
            onClick={() => onSelect(item)}
            className="
              inline-flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-blue-50
              hover:bg-blue-100
              transition
            "
          >

            <Pencil
              size={16}
              className="text-blue-600"
            />

          </button>

        </td>

      </tr>

    );

  })

)}
          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">

        <p className="text-sm text-gray-500">
          Menampilkan
          <span className="mx-1 font-semibold text-[#4D7B38]">
            {filteredData.length}
          </span>
          jadwal kegiatan.
        </p>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <p className="text-xs text-gray-400">
            Klik ikon edit untuk mengubah data
          </p>

        </div>

      </div>

    </div>

  );
}