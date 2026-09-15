"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OfflineBanner } from "@/components/OfflineBanner";
import { getStudentName, saveStudentName } from "@/lib/storage";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(getStudentName());
  }, []);

  const onStart = () => {
    if (!name.trim()) return;

    saveStudentName(name);
    router.push("/tarjetario");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6 pb-24">
      <OfflineBanner />
      <section className="rounded-3xl border-4 border-[#7a5a2f] bg-[#f8f0df] p-6 shadow-xl">
        <p className="text-xs font-bold tracking-[0.2em] text-[#2D5A27]">TAPANTÍ</p>
        <h1 className="mt-2 text-3xl font-black text-[#1f3f1d]">Fauna Tapantí</h1>
        <p className="text-base font-semibold text-[#7a5a2f]">Tarjetario Educativo</p>

        <label className="mt-6 block text-sm font-bold text-[#2D5A27]">
          Escribe tu nombre para iniciar tu gira
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#2D5A27]/30 bg-white p-3 font-semibold text-[#244822] focus:border-[#2D5A27] focus:outline-none"
            placeholder="Ej. Sofía Mora"
          />
        </label>

        <button
          type="button"
          onClick={onStart}
          className="mt-5 w-full rounded-xl bg-[#2D5A27] px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-emerald-300"
          disabled={!name.trim()}
        >
          Iniciar Exploración
        </button>
      </section>
    </main>
  );
}
