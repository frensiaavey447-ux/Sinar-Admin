"use client";

import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="bg-[#467235] text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 text-xs md:text-sm">

          {/* Email */}

          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Mail size={16} />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </div>

          {/* Nomor 1 */}

          <div className="flex items-center gap-2 justify-center">
            <Phone size={16} />
            <span>Ibu Hanim : 081316853255</span>
          </div>

          {/* Nomor 2 */}

          <div className="flex items-center gap-2 justify-center md:justify-end">
            <Phone size={16} />
            <span>Ibu Ida : 081282307424</span>
          </div>

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