"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { markObservation } from "@/lib/db";
import { getSpeciesById, species } from "@/lib/species";
import { getStudentName } from "@/lib/storage";

export function TarjetaDetalleClient({ id }: { id: string }) {
  const item = getSpeciesById(id);
  const [message, setMessage] = useState("");

  if (!item) {
    return (
      <main className="mx-auto min-h-screen max-w-md p-4">
        <p>Tarjeta no encontrada.</p>
        <Link href="/tarjetario" className="text-emerald-800 underline">
          Volver al tarjetario
        </Link>
      </main>
    );
  }

  const onObserved = async () => {
    const studentName = getStudentName() || "Estudiante";

    await markObservation({
      speciesId: item.id,
      studentName,
      timestamp: new Date().toISOString(),
    });

    setMessage("¡Registro guardado sin conexión!");
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-4 pb-28">
      <article className="overflow-hidden rounded-3xl border-4 border-[#7a5a2f] bg-[#fff8e5] shadow-xl">
        <header className="bg-[#2D5A27] p-3 text-center text-xs font-extrabold tracking-[0.15em] text-white">
          COLECCIÓN FAUNA DE COSTA RICA
        </header>

        <Image src={item.imagen} alt={item.nombre_comun} className="h-72 w-full object-cover" width={1200} height={720} priority unoptimized />

        <section className="space-y-3 p-5">
          <p className="text-sm italic text-[#7a5a2f]">{item.nombre_cientifico}</p>
          <h1 className="text-3xl font-black text-[#1f3f1d]">{item.nombre_comun}</h1>
          <p className="rounded-xl bg-emerald-100 p-2 text-sm font-semibold text-emerald-900">
            🗺️ {item.endemica ? "Especie endémica de Costa Rica" : "Distribución amplia en Mesoamérica"}
          </p>
          <p className="rounded-xl bg-amber-100 p-2 text-sm font-semibold text-amber-900">🌿 Hábitat: {item.habitat}</p>
          <p className="text-sm text-[#244822]">{item.descripcion_corta}</p>

          <ul className="list-disc space-y-1 pl-5 text-sm text-[#244822]">
            {item.caracteristicas.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <p className="inline-block rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
            {item.estado_conservacion}
          </p>

          <button
            type="button"
            onClick={onObserved}
            className="block w-full rounded-xl bg-[#2D5A27] px-4 py-3 text-center font-bold text-white"
          >
            ✓ ¡La Observé!
          </button>

          {message ? <p className="text-center text-sm font-bold text-emerald-800">{message}</p> : null}
        </section>

        <footer className="border-t border-[#7a5a2f]/30 bg-[#f8f0df] p-3 text-center text-xs font-bold text-[#7a5a2f]">
          Nº {String(species.findIndex((value) => value.id === id) + 1).padStart(3, "0")} - Serie Costa Rica
        </footer>
      </article>
      <BottomNav />
    </main>
  );
}
