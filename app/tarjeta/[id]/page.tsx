import { notFound } from "next/navigation";
import { TarjetaDetalleClient } from "@/components/TarjetaDetalleClient";
import { species } from "@/lib/species";

export function generateStaticParams() {
  return species.map((item) => ({ id: item.id }));
}

export default function TarjetaDetallePage({ params }: { params: { id: string } }) {
  const exists = species.some((item) => item.id === params.id);

  if (!exists) {
    notFound();
  }

  return <TarjetaDetalleClient id={params.id} />;
}
