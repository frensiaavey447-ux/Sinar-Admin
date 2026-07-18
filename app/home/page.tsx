import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";

import Hero from "./heroo";
import PrayerSchedule from "./PrayerSchedule";
import UpcomingEvent from "./UpcomingEvent";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#16240D] flex flex-col">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= CONTENT ================= */}
      <section className="flex-1">

        <div className="w-full max-w-[1440px] mx-auto px-5 lg:px-8">

          {/* HERO */}
          <Hero />

          {/* JADWAL + KEGIATAN */}
          <section className="pb-8">

            <div className="grid grid-cols-1 lg:grid-cols-[2.15fr_1fr] gap-8 items-start">

              {/* Jadwal Sholat */}
              <PrayerSchedule />

              {/* Kegiatan Terdekat */}
              <UpcomingEvent />

            </div>

          </section>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </main>
  );
}