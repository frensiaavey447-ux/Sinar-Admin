"use client";

import {
  MoonStar,
  Sunrise,
  Sun,
  Sunset,
  CloudMoon,
} from "lucide-react";

const prayers = [
  {
    name: "Imsak",
    time: "04:20",
    icon: <MoonStar size={18} strokeWidth={2} />,
  },
  {
    name: "Subuh",
    time: "04:35",
    icon: <MoonStar size={18} strokeWidth={2} />,
  },
  {
    name: "Terbit",
    time: "05:50",
    icon: <Sunrise size={18} strokeWidth={2} />,
  },
  {
    name: "Dzuhur",
    time: "12:01",
    icon: <Sun size={18} strokeWidth={2} />,
  },
  {
    name: "Ashar",
    time: "15:20",
    icon: <CloudMoon size={18} strokeWidth={2} />,
  },
  {
    name: "Magrib",
    time: "18:01",
    icon: <Sunset size={18} strokeWidth={2} />,
  },
  {
    name: "Isya",
    time: "19:10",
    icon: <CloudMoon size={18} strokeWidth={2} />,
  },
];

export default function PrayerSchedule() {
  return (
    <section>

      <h2 className="text-white text-[20px] font-bold mb-4">
        Jadwal Sholat
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-4">

        {prayers.map((item) => (
          <div
            key={item.name}
            className="
              bg-white
              rounded-[12px]
              shadow-md
              h-[100px]
              flex
              flex-col
              items-center
              justify-center
              transition
              hover:scale-105
            "
          >
            <h3 className="font-bold text-[12px]">
              {item.name}
            </h3>

            <div className="my-3">
              {item.icon}
            </div>

            <p className="font-semibold text-[16px] text-gray-700">
              {item.time}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}