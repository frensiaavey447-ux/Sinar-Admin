"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import JadwalForm from "./JadwalForm";
import JadwalTable from "./JadwalTable";

export interface JadwalData {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export default function JadwalPage() {
  const [refresh, setRefresh] = useState(false);
  const [selectedJadwal, setSelectedJadwal] =
    useState<JadwalData | null>(null);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      <Navbar />

      <section className="flex-1 max-w-[1450px] w-full mx-auto px-8 py-8 pb-28">
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-white text-6xl font-bold">
            Dasbor Admin
          </h1>

          <button
            className="
              bg-[#F7B500]
              text-black
              font-bold
              text-2xl
              px-8
              py-4
              rounded-2xl
            "
          >
            Jadwal Kegiatan
          </button>

        </div>

        <div
          className="
            bg-white
            rounded-[28px]
            p-10
            shadow-xl
          "
        >

          <JadwalForm
            selected={selectedJadwal}
            refreshTable={reloadTable}
            clearSelected={() =>
              setSelectedJadwal(null)
            }
          />

        </div>

        <div className="mt-10">

          <JadwalTable
            refresh={refresh}
            onSelect={setSelectedJadwal}
          />

        </div>

      </section>

      <Footer />

    </main>
  );
}