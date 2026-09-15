"use client";

import { useEffect, useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { getObservationsByStudent } from "@/lib/db";
import { species } from "@/lib/species";
import { getStudentName } from "@/lib/storage";

export default function CompararPage() {
  const [studentName, setStudentName] = useState("");
  const [observedIds, setObservedIds] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const currentStudent = getStudentName();
      setStudentName(currentStudent);

      if (!currentStudent) return;

      const records = await getObservationsByStudent(currentStudent);
      setObservedIds(Array.from(new Set(records.map((record) => record.speciesId))));
    };

    load();
  }, []);

  const summaryText = useMemo(() => {
    const names = species
      .filter((item) => observedIds.includes(item.id))
      .map((item) => `• ${item.nombre_comun} (${item.nombre_cientifico})`)
      .join("\n");

    return [
      `📘 Reporte de gira en Tapantí`,
      `👩‍🎓 Estudiante: ${studentName || "Sin nombre"}`,
      `✅ Observaciones: ${observedIds.length} de ${species.length}`,
      "",
      names || "Aún no hay especies observadas.",
      "",
      "#FaunaTapanti #TarjetarioEducativo",
    ].join("\n");
  }, [observedIds, studentName]);

  const copySummary = async () => {
    await navigator.clipboard.writeText(summaryText);
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-4 pb-28">
      <h1 className="rounded-2xl bg-[#f8f0df] p-4 text-2xl font-black text-[#1f3f1d] shadow-md">
        Exportar / Comparar Hallazgos
      </h1>

      <p className="mt-4 text-sm font-semibold text-[#7a5a2f]">
        Comparte este resumen al finalizar la gira de campo.
      </p>

      <textarea
        readOnly
        value={summaryText}
        className="mt-4 h-80 w-full rounded-2xl border border-[#2D5A27]/20 bg-white p-4 text-sm"
      />

      <button
        type="button"
        onClick={copySummary}
        className="mt-3 rounded-xl bg-[#2D5A27] px-4 py-3 text-sm font-bold text-white"
      >
        Copiar resumen
      </button>

      <BottomNav />
    </main>
  );
}
