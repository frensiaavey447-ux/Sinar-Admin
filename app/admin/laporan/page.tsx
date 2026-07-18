"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LaporanTable from "./LaporanTable";
import LaporanPopup from "./LaporanPopup";

import { supabase } from "../../lib/supabase";
import { LaporanData } from "./types";

export default function LaporanPage() {
  const emptyForm: LaporanData = {
    id: 0,
    tanggal: "",
    jenis: "",
    kategori: "",
    deskripsi: "",
    jumlah: 0,
    status: "",
  };

  const [form, setForm] = useState<LaporanData>(emptyForm);
  const [data, setData] = useState<LaporanData[]>([]);
  const [openPopup, setOpenPopup] = useState(false);

  // Penanda mode Edit / Tambah
  const [selectedData, setSelectedData] =
    useState<LaporanData | null>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("laporan")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setData(data ?? []);

    const nextId =
      data && data.length
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);
  }

  function resetForm(id: number) {
    setForm({
      id,
      tanggal: "",
      jenis: "",
      kategori: "",
      deskripsi: "",
      jumlah: 0,
      status: "",
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

  function handleEdit(item: LaporanData) {
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
      !form.tanggal ||
      !form.jenis ||
      !form.kategori ||
      !form.deskripsi ||
      form.jumlah <= 0 ||
      !form.status
    ) {
      alert("Lengkapi semua data.");
      return;
    }

    const { error } = await supabase
      .from("laporan")
      .insert([
        {
          tanggal: form.tanggal,
          jenis: form.jenis,
          kategori: form.kategori,
          deskripsi: form.deskripsi,
          jumlah: form.jumlah,
          status: form.status,
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
      .from("laporan")
      .update({
        tanggal: form.tanggal,
        jenis: form.jenis,
        kategori: form.kategori,
        deskripsi: form.deskripsi,
        jumlah: form.jumlah,
        status: form.status,
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
      .from("laporan")
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
              Laporan Keuangan
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
            Tambah Laporan
          </button>

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">

          <div className="mb-4">

            <h2 className="text-[30px] font-bold text-gray-800">
              Daftar Laporan Keuangan
            </h2>

          </div>

          <LaporanTable
            data={data}
            onSelect={handleEdit}
          />

        </div>

        {/* Popup */}

        <LaporanPopup
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