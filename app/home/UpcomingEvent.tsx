"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import { supabase } from "../lib/supabase";

type Event = {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
};

export default function UpcomingEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingEvent();
  }, []);

  async function getUpcomingEvent() {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .gte("tanggal", today)
      .order("tanggal", { ascending: true })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setEvent(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <section>
        <h2 className="text-white text-[20px] font-bold mb-5">
          Kegiatan Terdekat
        </h2>

        <div className="bg-white rounded-xl p-6">
          Loading...
        </div>
      </section>
    );
  }

 if (!event) {
  return (
    <section>
      <h2 className="text-white text-[20px] font-bold mb-5">
        Kegiatan Terdekat
      </h2>

      <div className="bg-white rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-[#29411C]">
          Belum ada kegiatan
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Belum ada jadwal kegiatan yang akan datang.
        </p>
      </div>
    </section>
  );
}

  const day = new Date(event.tanggal).getDate();

  return (
    <section className="h-full">

      <h2 className="text-white text-[20px] font-bold mb-5">
        Kegiatan Terdekat
      </h2>

      <div
className="
  bg-white
  text-[#29411C]
  rounded-[12px]
  shadow-lg
  px-6
  py-5
  flex
  items-start
  gap-6
  h-[160px]
"
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-4
            flex
            items-center
            gap-4
            h-[100px]
          "
        >

          <CalendarDays size={24} />

          <span className="font-bold text-[30px]">
            {day}
          </span>

        </div>

        <div className="flex flex-col justify-center h-full">

          <h3 className="text-[24px] font-bold leading-tight">
            {event.nama_kegiatan}
          </h3>

          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">

              <Clock3 size={18} />

              <span className="text-[14px]">
                {event.waktu}
              </span>

            </div>

            <div className="flex items-center gap-3">

              <MapPin size={18} />

              <span className="text-[14px]">
                {event.lokasi}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}