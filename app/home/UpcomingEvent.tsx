import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

export default function UpcomingEvent() {
  return (
    <section className="h-full">

      <h2 className="text-white text-[20px] font-bold mb-5">
        Kegiatan Terdekat
      </h2>

      <div
        className="
          bg-white
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

        {/* Kalender */}

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
            22
          </span>

        </div>

        {/* Detail */}

        <div className="flex flex-col justify-center h-full">

          <h3 className="text-[24px] font-bold leading-tight">
            Sosial Projek
            <br />
            SINAR
          </h3>

          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">

              <Clock3 size={18} />

              <span className="text-[14px]">
                13:00 - selesai
              </span>

            </div>

            <div className="flex items-center gap-3">

              <MapPin size={18} />

              <span className="text-[14px]">
                Auditorium
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}