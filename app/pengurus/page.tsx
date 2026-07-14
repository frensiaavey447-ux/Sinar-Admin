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

      <section className="flex-1 w-full max-w-[1250px] mx-auto px-6 lg:px-10 py-8">

        <h1 className="text-white text-4xl lg:text-4xl font-bold mb-8">
          Dasbor Admin
        </h1>
<div
  className="
    grid
    grid-cols-1
    lg:grid-cols-[0.9fr_1.1fr]
    gap-8
    items-stretch
  "
>
          <PengurusForm
            selected={selectedPengurus}
            refreshTable={reloadTable}
            clearSelected={() => setSelectedPengurus(null)}
          />

          <PengurusTable
            refresh={refresh}
            onSelect={setSelectedPengurus}
          />

        </div>

      </section>

      <Footer />

    </main>
  );
}