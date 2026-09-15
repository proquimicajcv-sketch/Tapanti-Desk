"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { OfflineBanner } from "@/components/OfflineBanner";
import { categorias, species } from "@/lib/species";
import { getStudentName } from "@/lib/storage";
import type { Species } from "@/lib/types";

export default function TarjetarioPage() {
  const [studentName, setStudentName] = useState("");
  const [categoria, setCategoria] = useState<(typeof categorias)[number]>("Todas");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const currentStudent = getStudentName();

    if (!currentStudent) {
      router.replace("/");
      return;
    }

    setStudentName(currentStudent);
  }, [router]);

  const filteredSpecies = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return species.filter((item) => {
      const matchesCategory = categoria === "Todas" || item.categoria === categoria;
      const matchesSearch =
        !searchValue ||
        item.nombre_comun.toLowerCase().includes(searchValue) ||
        item.nombre_cientifico.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [categoria, search]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-4 pb-28">
      <OfflineBanner />
      <header className="mt-4 rounded-2xl bg-[#f8f0df] p-4 shadow-md">
        <h1 className="text-2xl font-black text-[#1f3f1d]">Índice de Tarjetas</h1>
        <p className="text-sm font-semibold text-[#7a5a2f]">Hola, {studentName}</p>
      </header>

      <label htmlFor="search-species" className="mt-4 block text-sm font-bold text-[#2D5A27]">
        Buscar por nombre común o científico
      </label>
      <input
        id="search-species"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Ej. quetzal o Duellmanohyla"
        className="mt-2 w-full rounded-xl border border-emerald-800/30 bg-white p-3 text-sm font-medium"
      />

      <section className="mt-4 flex flex-wrap gap-2">
        {categorias.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategoria(value)}
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              categoria === value
                ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                : "border-emerald-800/30 bg-white text-[#2D5A27]"
            }`}
          >
            {value}
          </button>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSpecies.map((item: Species) => (
          <Link
            key={item.id}
            href={`/tarjeta/${item.id}`}
            className="overflow-hidden rounded-2xl border-2 border-[#2D5A27]/20 bg-[#fffdf6] shadow hover:shadow-lg"
          >
            <Image src={item.imagen} alt={item.nombre_comun} className="h-44 w-full object-cover" width={800} height={500} unoptimized />
            <div className="p-3">
              <p className="text-lg font-extrabold text-[#1f3f1d]">{item.nombre_comun}</p>
              <p className="text-sm italic text-[#7a5a2f]">{item.nombre_cientifico}</p>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}
