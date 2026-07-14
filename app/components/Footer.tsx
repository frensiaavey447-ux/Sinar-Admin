import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
<footer
  className="
    sticky
    bottom-0
    w-full
    bg-[#467235]
    text-white
    z-40
    shadow-[0_-2px_12px_rgba(0,0,0,0.2)]
  "
>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Mail size={15} />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <Phone size={15} />
            <span>Ibu Hanim : 081316853255</span>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-end">
            <Phone size={15} />
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