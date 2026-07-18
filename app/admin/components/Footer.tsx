"use client";

import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="w-full bg-[#467235] text-white text-[12x]">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            items-center
            text-[12px]
            md:text-sm
          "
        >
          {/* Email */}
          <a
            href="mailto:yayasan@ypinurulilmi.sch.id"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-yellow-300 transition"
          >
            <Mail size={16} />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </a>

          {/* Hanim */}
          <a
            href="https://wa.me/6281316853255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:text-yellow-300 transition"
          >
            <Phone size={16} />
            <span>Ibu Hanim : 081316853255</span>
          </a>

          {/* Ida */}
          <a
            href="tel:081282307424"
            className="flex items-center justify-center md:justify-end gap-2 hover:text-yellow-300 transition"
          >
            <Phone size={16} />
            <span>Ibu Ida : 081282307424</span>
          </a>
        </div>

      </div>

      <div className="border-t border-white/20">
        <p className="py-2 text-center text-[10px] md:text-[11px]">
          Powered by MIS Class 3 - 2025 Group 1
        </p>
      </div>
    </footer>
  );
}