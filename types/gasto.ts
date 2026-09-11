export type Categoria = {
  id: string;
  nombre: string;
  color: string;
  emoji: string;
};

export type Gasto = {
  id: string;
  monto: number;
  descripcion: string;
  categoriaId: string;
  fecha: string;
};
