"use client";

import { Clock3, X } from "lucide-react";

type Prayer = {
  id: number;
  name: string;
  time: string;
};

type Props = {
  prayer: Prayer | null;
  time: string;
  setTime: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function PrayerPopup({
  prayer,
  time,
  setTime,
  onClose,
  onSave,
}: Props) {
  if (!prayer) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-[390px]
          rounded-3xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between px-7 pt-6">

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-2xl
                bg-[#467235]/10
              "
            >
              <Clock3
                size={22}
                className="text-[#467235]"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#29411C]">
                Edit Jadwal
              </h2>

              <p className="text-sm text-gray-500">
                Ubah waktu sholat
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
              transition
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* BODY */}

        <div className="px-7 py-6 space-y-5">

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nama Sholat
            </label>

            <input
              disabled
              value={prayer.name}
              className="
                h-12
                w-full
                rounded-2xl
                border-0
                bg-gray-100
                px-4
                text-gray-700
                font-medium
                outline-none
              "
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Waktu
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-gray-200
                px-4
                text-lg
                font-semibold
                outline-none
                transition
                focus:border-[#467235]
                focus:ring-4
                focus:ring-[#467235]/15
              "
            />

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 px-7 pb-7">

          <button
            onClick={onClose}
            className="
              h-11
              rounded-xl
              border
              border-gray-300
              px-5
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Batal
          </button>

          <button
            onClick={onSave}
            className="
              h-11
              rounded-xl
              bg-[#467235]
              px-6
              font-semibold
              text-white
              hover:bg-[#355728]
              transition
            "
          >
            Simpan
          </button>

        </div>

      </div>
    </div>
  );
}