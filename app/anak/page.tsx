"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AnakForm from "./AnakForm";
import AnakTable from "./AnakTable";

export interface AnakData {
  id: number;
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  alamat: string;
  no_hp: string;
  foto: string | null;
}

export default function AnakPage() {
  const [refresh, setRefresh] = useState(false);

  const [selectedAnak, setSelectedAnak] =
    useState<AnakData | null>(null);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  return (

    <main className="min-h-screen flex flex-col bg-[#16240D]">

  <Navbar />

  <section
    className="
      flex-1
      w-full
      max-w-7xl
      mx-auto
      px-6
      py-10
    "
  >

    {/* Header */}

    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-8
      "
    >

      <div>

        <h1
          className="
            text-white
            text-4xl
            lg:text-5xl
            font-extrabold
          "
        >
          Dasbor Admin
        </h1>

      </div>

      <button
        className="
          bg-[#F7B500]
          hover:bg-[#E2A800]
          transition
          text-black
          font-bold
          px-8
          py-4
          rounded-2xl
          shadow-lg
        "
      >
        Laporan Data Anak
      </button>

    </div>

    {/* Form */}

    <div
      className="
        bg-white
        rounded-[30px]
        shadow-2xl
        p-8
        border
        border-gray-100
      "
    >

      <AnakForm
        selected={selectedAnak}
        refreshTable={reloadTable}
      />

    </div>

    {/* Tabel */}

    <div className="mt-10">

      <AnakTable
  refresh={refresh}
  onSelect={setSelectedAnak}
/>

    </div>

  </section>

  <Footer />

</main>

  );
}