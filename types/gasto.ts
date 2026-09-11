export type Categoria = "Comida" | "Transporte" | "Servicios" | "Ocio" | "Otros";

export type Gasto = {
  id: string;
  monto: number;
  descripcion: string;
  categoria: Categoria;
  fecha: string;
};
