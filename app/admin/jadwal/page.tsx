"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import JadwalTable from "./JadwalTable";
import JadwalPopup from "./JadwalPopup";

export interface JadwalData {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export default function JadwalPage() {
  const [refresh, setRefresh] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [selectedData, setSelectedData] =
    useState<JadwalData | null>(null);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  function handleTambah() {
    setSelectedData(null);
    setOpenPopup(true);
  }

  function handleEdit(data: JadwalData) {
    setSelectedData(data);
    setOpenPopup(true);
  }

  function handleClose() {
    setSelectedData(null);
    setOpenPopup(false);
  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      <Navbar />

      <section
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-4
          md:px-7
          py-4
          pb-18
        "
      >

              {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">

        <div>

        <h1 className="text-[38px] font-bold text-white">  
            Jadwal Kegiatan
          </h1>

        </div>

        <button
          onClick={handleTambah}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-[#4D7B38]
            hover:bg-[#3F662E]
            text-white
            font-semibold
            px-3
            py-3
            text-[14px]
            rounded-2xl
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            w-full
            lg:w-auto
          "
        >

          <Plus size={20} />

          Tambah Jadwal

        </button>

      </div>

      {/* Card */}

      <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">

        <div className="mb-4">

          <h2 className="text-[30px] font-bold text-gray-800">
            Daftar Jadwal
          </h2>

        </div>

        <JadwalTable
          refresh={refresh}
          onSelect={handleEdit}
        />

      </div>

            {/* Popup */}

      <JadwalPopup
        open={openPopup}
        selected={selectedData}
        onClose={handleClose}
        refreshTable={() => {
          reloadTable();
          handleClose();
        }}
      />

    </section>

    <Footer />

  </main>
);
}
