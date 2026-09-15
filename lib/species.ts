import speciesData from "@/data/species.json";
import type { Species } from "@/lib/types";

export const species = speciesData as Species[];

export const categorias: Array<"Todas" | Species["categoria"]> = [
  "Todas",
  "Plantas",
  "Mamíferos",
  "Aves",
  "Anfibios",
  "Reptiles",
  "Insectos",
];

export const getSpeciesById = (id: string) => species.find((item) => item.id === id);
