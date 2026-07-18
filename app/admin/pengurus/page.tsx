"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import PengurusForm from "./PengurusForm";
import PengurusTable from "./PengurusTable";

export interface PengurusData {
  id: number;
  nama: string;
  jabatan: string;
  foto: string | null;
}

export default function PengurusPage() {
  const [selectedPengurus, setSelectedPengurus] =
    useState<PengurusData | null>(null);

  const [refresh, setRefresh] = useState(false);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      <Navbar />

      <section className="flex-1 py-4">

        <div className="mx-auto w-full max-w-[1250px] px-4 lg:px-10">

          {/* ================= HEADER ================= */}

          <h1 className="text-[38px] font-bold text-white">
            Dashboard Pengurus
          </h1>

          {/* ================= CONTENT ================= */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-[400px_1fr]
              gap-8
              items-start
            "
          >

            {/* ================= FORM ================= */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-8
                flex
                justify-center
              "
            >
              <PengurusForm
                selected={selectedPengurus}
                refreshTable={reloadTable}
                clearSelected={() =>
                  setSelectedPengurus(null)
                }
              />
            </div>

            {/* ================= TABLE ================= */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-8
              "
            >
              <PengurusTable
                refresh={refresh}
                onSelect={setSelectedPengurus}
              />
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}