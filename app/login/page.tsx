"use client";

import LoginNavbar from "./LoginNavbar";
import LoginFooter from "./LoginFooter";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <main className="h-screen bg-[#16240D] flex flex-col overflow-hidden">

      <LoginNavbar />

      <section
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          lg:px-8
        "
      >
        <LoginCard />
      </section>

      <LoginFooter />

    </main>
  );
}