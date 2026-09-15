export type Categoria =
  | "Plantas"
  | "Mamíferos"
  | "Aves"
  | "Anfibios"
  | "Reptiles"
  | "Insectos";

export interface Species {
  id: string;
  nombre_comun: string;
  nombre_cientifico: string;
  categoria: Categoria;
  imagen: string;
  endemica: boolean;
  habitat: string;
  caracteristicas: string[];
  estado_conservacion: string;
  descripcion_corta: string;
}

export interface Observation {
  id?: number;
  speciesId: string;
  studentName: string;
  timestamp: string;
}
