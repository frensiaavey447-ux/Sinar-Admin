"use client";

import LoginNavbar from "./LoginNavbar";
import LoginFooter from "./LoginFooter";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#16240D]">

      <LoginNavbar />

      <section
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          py-4
          text-[12px]
        "
      >
        <LoginCard />
      </section>

      <LoginFooter />

    </main>
  );
}