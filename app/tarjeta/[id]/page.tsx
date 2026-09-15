import { notFound } from "next/navigation";
import { TarjetaDetalleClient } from "@/components/TarjetaDetalleClient";
import { species } from "@/lib/species";

export function generateStaticParams() {
  return species.map((item) => ({ id: item.id }));
}

export default function TarjetaDetallePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const exists = species.some((item) => item.id === id);

  if (!exists) {
    notFound();
  }

  return <TarjetaDetalleClient id={id} />;
}
