"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InventarisTable from "./InventarisTable";
import InventarisPopup from "./InventarisPopup";

import { supabase } from "../../lib/supabase";
import { InventarisData } from "./types";

export default function InventarisPage() {

  const emptyForm: InventarisData = {
    id: 0,
    nama_alat: "",
    jumlah: 0,
    foto: "",
  };

  const [form, setForm] =
    useState<InventarisData>(emptyForm);

  const [data, setData] =
    useState<InventarisData[]>([]);

  const [selectedData, setSelectedData] =
    useState<InventarisData | null>(null);

  const [openPopup, setOpenPopup] =
    useState(false);

  useEffect(() => {
    getData();
  }, []);

  // ================= GET DATA =================

  async function getData() {

    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setData(data ?? []);

    const nextId =
      data && data.length > 0
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);

  }

  // ================= RESET =================

  function resetForm(id: number) {

    setForm({
      id,
      nama_alat: "",
      jumlah: 0,
      foto: "",
    });

  }

  // ================= TAMBAH =================

  function handleTambah() {

    setSelectedData(null);

    const nextId =
      data.length > 0
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);

    setOpenPopup(true);

  }

  // ================= EDIT =================

  function handleEdit(item: InventarisData) {

    setSelectedData(item);

    setForm(item);

    setOpenPopup(true);

  }

  // ================= CLOSE =================

  function handleClose() {

    setSelectedData(null);

    const nextId =
      data.length > 0
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);

    setOpenPopup(false);

  }

    // ================= SIMPAN =================

  async function simpanData() {

    if (
      !form.nama_alat ||
      form.jumlah <= 0 ||
      !form.foto
    ) {
      alert("Lengkapi semua data.");
      return;
    }

    const { error } = await supabase
      .from("inventaris")
      .insert([
        {
          nama_alat: form.nama_alat,
          jumlah: form.jumlah,
          foto: form.foto,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();

  }

  // ================= UPDATE =================

  async function updateData() {

    if (!selectedData) {
      alert("Pilih data yang akan diupdate.");
      return;
    }

    const { error } = await supabase
      .from("inventaris")
      .update({
        nama_alat: form.nama_alat,
        jumlah: form.jumlah,
        foto: form.foto,
      })
      .eq("id", selectedData.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();

  }

  // ================= HAPUS =================

  async function hapusData() {

    if (!selectedData) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    const konfirmasi = confirm(
      "Yakin ingin menghapus data ini?"
    );

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("inventaris")
      .delete()
      .eq("id", selectedData.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();

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
          px-3
          md:px-7
          py-4
          pb-18
        "
      >

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center text-[12px] lg:justify-between gap-6 mb-6">

          <div>

            <h1 className="text-[38px] font-bold text-white">
              Inventaris
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

            Tambah Inventaris

          </button>

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">

          <div className="mb-4">

            <h2 className="text-[30px] font-bold text-gray-800">
              Daftar Inventaris
            </h2>

          </div>

          <InventarisTable
            data={data}
            onSelect={handleEdit}
          />

        </div>

        {/* Popup */}

        <InventarisPopup
          open={openPopup}
          selected={selectedData}
          form={form}
          setForm={setForm}
          onClose={handleClose}
          onSave={simpanData}
          onEdit={() => {}}
          onUpdate={updateData}
          onDelete={hapusData}
        />

      </section>

      <Footer />

    </main>
  );
}