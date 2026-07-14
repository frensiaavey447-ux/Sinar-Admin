"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InventarisForm from "./InventarisForm";
import InventarisTable from "./InventarisTable";
import InventarisPopup from "./InventarisPopup";

export interface InventarisData {
  id: number;
  nama_alat: string;
  jumlah: number;
  foto: string;
}

export default function InventarisPage() {
  const [refresh, setRefresh] = useState(false);

  const [selectedInventaris, setSelectedInventaris] =
    useState<InventarisData | null>(null);

  const [openPopup, setOpenPopup] = useState(false);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      <Navbar />

      <section className="flex-1 max-w-[1050px] w-full mx-auto py-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-white text-5xl font-bold">
            Inventaris
          </h1>

          <button
            onClick={() => setOpenPopup(true)}
            className="
              bg-[#F7B500]
              hover:bg-yellow-300
              text-black
              font-bold
              rounded-2xl
              px-6
              py-4
            "
          >
            Lihat Inventaris
          </button>

        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl">

          <InventarisForm
            selected={selectedInventaris}
            refreshTable={reloadTable}
            clearSelected={() =>
              setSelectedInventaris(null)
            }
          />

        </div>

        <InventarisTable
          refresh={refresh}
          onSelect={setSelectedInventaris}
        />

      </section>

      <InventarisPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      />

      <Footer />

    </main>
  );
}