"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye } from "lucide-react";

import { supabase } from "../lib/supabase";

export default function LoginCard() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

async function handleLogin() {
  console.log("Login diklik");

  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  console.log("DATA =", data);
  console.log("ERROR =", error);

  if (error) {
    alert(error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("Username atau Password salah");
    return;
  }

  alert("Login berhasil");
  router.push("/home");
}
  return (
    <div
      className="
        w-full
        max-w-[1300px]
        mx-auto
        bg-white
        rounded-[28px]
        overflow-hidden
        shadow-xl
        flex
        flex-col
        lg:flex-row
        lg:h-[550px]
      "
    >

      {/* ================= LEFT ================= */}

      <div
        className="
          w-full
          lg:w-[43%]
          flex
          items-center
          justify-center
          py-10
          px-6
          bg-white
        "
      >

        <div
          className="
            w-full
            max-w-[330px]
            flex
            flex-col
            items-center
          "
        >

          <Image
            src="/image/logo2 - Edited2.png"
            alt="SINAR"
            width={150}
            height={150}
            priority
            className="
              w-28
              md:w-36
              lg:w-[150px]
              h-auto
              object-contain
            "
          />

          <label
            className="
              self-start
              mt-8
              mb-2
              text-[#557D3E]
              text-sm
              font-medium
            "
          >
            Email or Username
          </label>

          <div
            className="
              w-full
              h-12
              rounded-md
              bg-[#557D3E]
              shadow-lg
              flex
              items-center
              px-4
            "
          >

            <Mail
              size={20}
              className="text-black"
            />

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Masukkan Username"
              className="
                flex-1
                ml-3
                bg-transparent
                outline-none
                text-white
                placeholder:text-white
              "
            />

          </div>

          <label
            className="
              self-start
              mt-6
              mb-2
              text-[#557D3E]
              text-sm
              font-medium
            "
          >
            Password
          </label>

          <div
            className="
              w-full
              h-12
              rounded-md
              bg-[#557D3E]
              shadow-lg
              flex
              items-center
              px-4
            "
          >

            <Lock
              size={20}
              className="text-black"
            />

            <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Masukkan Password"
  className="
    flex-1
    ml-3
    bg-transparent
    outline-none
    text-white
    placeholder:text-white
  "
/>

<Eye
  size={18}
  onClick={() =>
    setShowPassword(!showPassword)
  }
  className="
    text-black
    cursor-pointer
  "
/>

</div>

<button
  onClick={handleLogin}
  disabled={loading}
  className="
    mt-12
    w-44
    h-12
    rounded-xl
    bg-[#FFC928]
    hover:bg-yellow-400
    transition
    font-bold
    text-xl
    text-[#29411C]
    disabled:bg-gray-400
    disabled:cursor-not-allowed
  "
>
  {loading ? "Loading..." : "Masuk"}
</button>

</div>

</div>

{/* ================= RIGHT ================= */}

<div className="relative hidden lg:block lg:w-[57%]">

  <Image
    src="/image/gedung1.jpeg"
    alt="Gedung"
    fill
    priority
    sizes="57vw"
    className="object-cover"
  />

  <div
    className="
      absolute
      inset-y-0
      left-0
      w-44
      bg-gradient-to-r
      from-white
      via-white/90
      to-transparent
    "
  />

</div>

</div>
);
} 