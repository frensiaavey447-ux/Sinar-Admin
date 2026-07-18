"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

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
  const [profile, setProfile] = useState<ProfileData>({
    id: 1,
    title: "",
    description: "",
    image_hero: "",
    image_banner: "",
    visi: "",
    misi: [],
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { data, error } = await supabase
      .from("Profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  }

  return (
    <main className="min-h-screen bg-[#26331F] flex flex-col text-white">

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <section className="mx-auto w-full max-w-[1160px] px-5 py-7">

              {/* ================= HERO ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[56%_44%]">

        {/* Hero Image */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[260px] overflow-hidden rounded-2xl lg:h-[300px]"
        >
          <Image
            src={profile.image_hero || "/image/gedung1.jpeg"}
            alt="Hero"
            fill
            priority
            sizes="(max-width:768px) 100vw, 56vw"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </motion.div>

        {/* Hero Card */}

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -3 }}
          className="flex h-[260px] flex-col justify-center rounded-2xl bg-white text-gray-900 p-8 lg:h-[300px]"
        >

          <h2 className="text-[14px] font-bold leading-8 text-[#1F1F1F]">
            {profile.title}
          </h2>

          <p className="mt-5 whitespace-pre-line text-[12px] leading-8 text-[#333333]">
            {profile.description}
          </p>

        </motion.div>

      </div>

      {/* ================= BANNER ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-6"
      >

        <div className="relative h-[205px] overflow-hidden rounded-2xl">

          <Image
            src={profile.image_banner || "/image/gedung2.jpeg"}
            alt="Banner"
            fill
            sizes="100vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </motion.div>

            {/* ================= VISI & MISI ================= */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-7"
      >

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* ================= VISI ================= */}

          <div>

            <h2 className="mb-3 text-xl font-bold text-white">
              Visi dan Misi
            </h2>

            <div
              className="
                min-h-[250px]
                rounded-2xl
                bg-white text-gray-900
                p-7
                shadow-lg
              "
            >

              <p
                className="
                  whitespace-pre-line
                  text-[12px]
                  leading-8
                  text-[#333333]
                "
              >
                {profile.visi}
              </p>

            </div>

          </div>

          {/* ================= MISI ================= */}

          <div>

            <h2 className="mb-3 text-xl font-bold text-white">
              Pendidikan Berkualitas
            </h2>

            <div
              className="
                min-h-[250px]
                rounded-2xl
                bg-white text-gray-900
                p-7
                shadow-lg
              "
            >

              <ul
                className="
                  list-disc
                  pl-5
                  space-y-3
                  text-[12px]
                  leading-8
                  text-[#333333]
                "
              >

                {profile.misi.length > 0 ? (
                  profile.misi.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))
                ) : (
                  <li>Belum ada data misi.</li>
                )}

              </ul>

            </div>

          </div>

        </div>

      </motion.section>

            <div className="h-8" />
      </section>

      {/* ================= FOOTER ================= */}

      <Footer />

    </main>
  );
}