"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LaporanForm from "./LaporanForm";
import LaporanTable from "./LaporanTable";

import { supabase } from "../lib/supabase";
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

  useEffect(() => {
    getData();
  }, []);

  // ================= GET DATA =================

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

  // nomor berikutnya
  const nextId =
    data && data.length > 0
      ? data[data.length - 1].id + 1
      : 1;

  setForm((prev) => ({
    ...prev,
    id: nextId,
  }));
}

  // ================= RESET =================

function resetForm(nextId: number) {
  setForm({
    id: nextId,
    tanggal: "",
    jenis: "",
    kategori: "",
    deskripsi: "",
    jumlah: 0,
    status: "",
  });
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

    const { error } = await supabase.from("laporan").insert([
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
      console.log(error);
      return;
    }

    alert("Data berhasil ditambahkan");

await getData();
  }

  // ================= EDIT =================

  function editData() {
    if (!form.id) {
      alert("Pilih data pada tabel.");
      return;
    }
  }

  // ================= UPDATE =================

  async function updateData() {
    if (!form.id) {
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
      .eq("id", form.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil diupdate");

    await getData();

  
  }

  // ================= HAPUS =================

  async function hapusData() {
    if (!form.id) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const { error } = await supabase
      .from("laporan")
      .delete()
      .eq("id", form.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Data berhasil dihapus");

    await getData();


  }

  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white">
            Laporan Keuangan
          </h1>
        </div>

        <LaporanForm
          form={form}
          setForm={setForm}
          onSave={simpanData}
          onEdit={editData}
          onUpdate={updateData}
          onDelete={hapusData}
        />

        <LaporanTable
          data={data}
          onSelect={(item) => setForm(item)}
        />
      </section>

      <Footer />
    </main>
  );
}