"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { supabase } from "../../lib/supabase";

interface ProfileData {
  id: number;
  title: string;
  description: string;
  image_hero: string;
  image_banner: string;
  visi: string;
  misi: string[];
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    id: 1,
    title: "",
    description: "",
    image_hero: "",
    image_banner: "",
    visi: "",
    misi: [],
  });

  /* ================= TEXT POPUP ================= */

  const [showTextModal, setShowTextModal] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  /* ================= IMAGE POPUP ================= */

  const [showImageModal, setShowImageModal] =
    useState(false);

  const [imageField, setImageField] = useState<
    "image_hero" | "image_banner" | ""
  >("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProfile(data);

    setLoading(false);
  }

  function openTextPopup(
    field: string,
    value: string
  ) {
    setEditField(field);
    setEditValue(value);
    setShowTextModal(true);
  }

  function openImagePopup(
    field: "image_hero" | "image_banner"
  ) {
    setImageField(field);
    setSelectedImage(null);
    setShowImageModal(true);
  }

    async function updateProfile(
    data: ProfileData
  ) {
    setSaving(true);

    const { error } = await supabase
      .from("Profile")
      .update({
        title: data.title,
        description: data.description,
        image_hero: data.image_hero,
        image_banner: data.image_banner,
        visi: data.visi,
        misi: data.misi,
      })
      .eq("id", 1);

    if (error) {
      alert(error.message);
      console.error(error);
      setSaving(false);
      return;
    }

    setProfile(data);

    setSaving(false);
  }

  async function uploadImage() {
    if (!selectedImage) return;

    setSaving(true);

    const extension =
      selectedImage.name.split(".").pop();

    const fileName =
      `${Date.now()}.${extension}`;

    const { error } =
      await supabase.storage
        .from("profile")
        .upload(fileName, selectedImage, {
          upsert: true,
        });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    const { data } =
      supabase.storage
        .from("profile")
        .getPublicUrl(fileName);

    const updated: ProfileData = {
      ...profile,

      image_hero:
        imageField === "image_hero"
          ? data.publicUrl
          : profile.image_hero,

      image_banner:
        imageField === "image_banner"
          ? data.publicUrl
          : profile.image_banner,
    };

    await updateProfile(updated);

    await fetchProfile();

    setShowImageModal(false);
    setSelectedImage(null);

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#26331F] text-2xl font-bold text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#26331F] text-white">

      <Navbar />

      <section className="mx-auto max-w-[1160px] px-5 py-8">

              {/* ================= HERO ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[56%_44%]"
      >

        {/* HERO IMAGE */}

        <div
          onClick={() => openImagePopup("image_hero")}
          className="group relative h-[310px] cursor-pointer overflow-hidden rounded-[24px]"
        >

          <Image
            src={profile.image_hero || "/image/gedung1.jpeg"}
            alt="Hero"
            fill
            priority
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

            <div className="rounded-xl bg-white px-5 py-3 font-semibold shadow-lg">
              Ganti Hero
            </div>

          </div>

        </div>

        {/* HERO CARD */}

        <div className="flex h-[310px] flex-col justify-center rounded-[24px] bg-white p-10">

          <h2
            onClick={() =>
              openTextPopup(
                "title",
                profile.title
              )
            }
            className="cursor-pointer text-[17px] font-bold leading-9 transition hover:text-green-700"
          >
            {profile.title}
          </h2>

          <p
            onClick={() =>
              openTextPopup(
                "description",
                profile.description
              )
            }
            className="mt-7 cursor-pointer whitespace-pre-line text-[14px] leading-8 transition hover:text-green-700"
          >
            {profile.description}
          </p>

        </div>

      </motion.div>

            {/* ================= BANNER ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-7"
      >
        <div
          onClick={() =>
            openImagePopup("image_banner")
          }
          className="group relative h-[240px] cursor-pointer overflow-hidden rounded-[24px]"
        >
          <Image
            src={
              profile.image_banner ||
              "/image/gedung2.jpeg"
            }
            alt="Banner"
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <div className="rounded-xl bg-white px-5 py-3 font-semibold shadow-lg">
              Ganti Banner
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= VISI & MISI ================= */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <h2 className="mb-6 text-3xl font-bold text-white">
          Visi dan Misi
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                      {/* ================= VISI ================= */}

          <div>
            <div
              onClick={() =>
                openTextPopup(
                  "visi",
                  profile.visi
                )
              }
              className="cursor-pointer rounded-[24px] bg-white p-8 shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <p className="cursor-pointer whitespace-pre-line text-[14px] leading-8 text-black transition hover:text-green-700">
                {profile.visi}
              </p>
            </div>
          </div>

          {/* ================= MISI ================= */}

          <div>
            <h3 className="mb-6 text-3xl font-bold text-white">
              Pendidikan Berkualitas
            </h3>

            <div
              onClick={() =>
                openTextPopup(
                  "misi",
                  profile.misi.join("\n")
                )
              }
              className="cursor-pointer rounded-[24px] bg-white p-8 shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <p className="cursor-pointer whitespace-pre-line text-[14px] leading-8 text-black transition hover:text-green-700">
                {profile.misi.join("\n")}
              </p>
            </div>
          </div>

        </div>

      </motion.section>

            {/* ================= TEXT POPUP ================= */}

      {showTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-2xl rounded-[24px] bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-[#26331F]">
                Edit Data
              </h2>

              <button
                onClick={() => setShowTextModal(false)}
                className="text-3xl font-bold text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            <textarea
              rows={12}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none focus:border-[#26331F]"
            />

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setShowTextModal(false)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold"
              >
                Batal
              </button>

              <button
                disabled={saving}
                onClick={async () => {

                  const updated: ProfileData = {
                    ...profile,
                  };

                  switch (editField) {

                    case "title":
                      updated.title = editValue;
                      break;

                    case "description":
                      updated.description = editValue;
                      break;

                    case "visi":
                      updated.visi = editValue;
                      break;

                    case "misi":
                      updated.misi = editValue
                        .split("\n")
                        .map((item) => item.trim())
                        .filter((item) => item !== "");
                      break;

                  }

                  await updateProfile(updated);

                  await fetchProfile();

                  setShowTextModal(false);

                }}
                className="rounded-xl bg-[#26331F] px-7 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>

            </div>

          </div>

        </div>
      )}

            {/* ================= IMAGE POPUP ================= */}

      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-xl rounded-[24px] bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-[#26331F]">
                Upload Gambar
              </h2>

              <button
                onClick={() => setShowImageModal(false)}
                className="text-3xl font-bold text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;
                setSelectedImage(e.target.files[0]);
              }}
              className="w-full rounded-xl border p-3"
            />

            {selectedImage && (
              <div className="relative mt-6 h-64 w-full overflow-hidden rounded-xl border">

                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  fill
                  className="object-cover"
                />

              </div>
            )}

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setShowImageModal(false)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold"
              >
                Batal
              </button>

              <button
                disabled={!selectedImage || saving}
                onClick={uploadImage}
                className="rounded-xl bg-[#26331F] px-7 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Mengupload..." : "Upload"}
              </button>

            </div>

          </div>

        </div>
      )}

      </section>

      <Footer />

    </main>
  );
}