"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { getObservationsByStudent } from "@/lib/db";
import { species } from "@/lib/species";
import { getStudentName } from "@/lib/storage";

export default function HallazgosPage() {
  const [studentName, setStudentName] = useState("");
  const [observedIds, setObservedIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const currentStudent = getStudentName();

      if (!currentStudent) {
        router.replace("/");
        return;
      }

      setStudentName(currentStudent);

      const records = await getObservationsByStudent(currentStudent);
      setObservedIds(Array.from(new Set(records.map((record) => record.speciesId))));
    };

    load();
  }, [router]);

  const observedSpecies = useMemo(
    () => species.filter((item) => observedIds.includes(item.id)),
    [observedIds],
  );

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-4 pb-28">
      <header className="rounded-2xl bg-[#f8f0df] p-4 shadow-md">
        <h1 className="text-2xl font-black text-[#1f3f1d]">Mis Hallazgos</h1>
        <p className="text-sm font-semibold text-[#7a5a2f]">Estudiante: {studentName}</p>
        <p className="text-sm font-bold text-[#2D5A27]">
          Has observado {observedIds.length} de {species.length} especies
        </p>
      </header>

      <section className="mt-4 grid grid-cols-5 gap-2 rounded-2xl bg-[#fff8e5] p-3">
        {species.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg p-2 text-center text-[10px] font-bold ${
              observedIds.includes(item.id)
                ? "bg-[#2D5A27] text-white"
                : "bg-white text-[#2D5A27]"
            }`}
          >
            {item.nombre_comun}
          </div>
        ))}
      </section>

      <section className="mt-4 space-y-3">
        {observedSpecies.map((item) => (
          <article key={item.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
            <Image src={item.imagen} alt={item.nombre_comun} className="h-16 w-16 rounded-lg object-cover" width={64} height={64} unoptimized />
            <div>
              <p className="font-extrabold text-[#1f3f1d]">{item.nombre_comun}</p>
              <p className="text-xs italic text-[#7a5a2f]">{item.nombre_cientifico}</p>
            </div>
          </article>
        ))}
      </section>

      {observedIds.length > 0 ? (
        <Link
          href="/comparar"
          className="mt-5 inline-block rounded-xl bg-[#2D5A27] px-4 py-3 text-sm font-bold text-white"
        >
          Exportar / Comparar
        </Link>
      ) : (
        <p className="mt-5 inline-block rounded-xl bg-emerald-200 px-4 py-3 text-sm font-bold text-emerald-800">
          Observa al menos una especie para exportar.
        </p>
      )}

      <BottomNav />
    </main>
  );
}
