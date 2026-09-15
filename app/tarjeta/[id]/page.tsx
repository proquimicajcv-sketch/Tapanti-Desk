import { TarjetaDetalleClient } from "@/components/TarjetaDetalleClient";
import { species } from "@/lib/species";

export function generateStaticParams() {
  return species.map((item) => ({ id: item.id }));
}

export default function TarjetaDetallePage({ params }: { params: { id: string } }) {
  return <TarjetaDetalleClient id={params.id} />;
}
