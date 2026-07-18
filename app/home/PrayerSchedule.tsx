"use client";

import { useEffect, useState } from "react";
import {
  MoonStar,
  Sunrise,
  Sun,
  Sunset,
  CloudMoon,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import PrayerPopup from "./PrayerPopup";

type Prayer = {
  id: number;
  name: string;
  time: string;
};

const prayerIcons: Record<string, React.ReactNode> = {
  Imsak: <MoonStar size={18} strokeWidth={2} />,
  Subuh: <MoonStar size={18} strokeWidth={2} />,
  Terbit: <Sunrise size={18} strokeWidth={2} />,
  Dzuhur: <Sun size={18} strokeWidth={2} />,
  Ashar: <CloudMoon size={18} strokeWidth={2} />,
  Magrib: <Sunset size={18} strokeWidth={2} />,
  Isya: <CloudMoon size={18} strokeWidth={2} />,
};

export default function PrayerSchedule() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPrayer, setSelectedPrayer] =
    useState<Prayer | null>(null);

  const [editTime, setEditTime] = useState("");

  /* ===== CEK LOGIN ADMIN ===== */

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getPrayerSchedule();

    if (typeof window !== "undefined") {
      setIsAdmin(
        localStorage.getItem("isLogin") === "true"
      );
    }
  }, []);

  async function getPrayerSchedule() {
    const { data, error } = await supabase
      .from("PrayerSchedule")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setPrayers(data ?? []);
    setLoading(false);
  }

  async function handleSave() {
    if (!selectedPrayer) return;

    const { error } = await supabase
      .from("PrayerSchedule")
      .update({
        time: editTime,
      })
      .eq("id", selectedPrayer.id);

    if (error) {
      alert(error.message);
      return;
    }

    setSelectedPrayer(null);

    getPrayerSchedule();
  }

  if (loading) {
    return (
      <section>
        <h2 className="mb-4 text-[20px] font-bold text-white">
          Jadwal Sholat
        </h2>

        <p className="text-white">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <>
      <section>

        <h2 className="mb-4 text-[20px] font-bold text-white">
          Jadwal Sholat
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-7">

                    {prayers.map((item) => (

            <div
              key={item.id}
              onClick={() => {

                if (!isAdmin) return;

                setSelectedPrayer(item);
                setEditTime(item.time.slice(0, 5));

              }}
              className={`
                bg-white
                rounded-[12px]
                shadow-md
                h-[100px]

                flex
                flex-col
                items-center
                justify-center

                transition

                ${
                  isAdmin
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-default"
                }
              `}
            >

              <h3 className="font-bold text-[12px]">
                {item.name}
              </h3>

              <div className="my-3">
                {prayerIcons[item.name]}
              </div>

              <p className="font-semibold text-[16px] text-gray-700">
                {item.time.slice(0, 5)}
              </p>

            </div>

          ))}

        </div>

      </section>

      {isAdmin && (
        <PrayerPopup
          prayer={selectedPrayer}
          time={editTime}
          setTime={setEditTime}
          onClose={() => setSelectedPrayer(null)}
          onSave={handleSave}
        />
      )}

    </>
  );
}