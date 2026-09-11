import { CATEGORIAS_POR_DEFECTO } from "../constants/categoriasPorDefecto";
import { Categoria } from "../types/gasto";

const LATENCIA_MIN_MS = 500;
const LATENCIA_MAX_MS = 1000;

let categorias: Categoria[] = [...CATEGORIAS_POR_DEFECTO];

function esperarLatenciaSimulada(): Promise<void> {
  const demora = LATENCIA_MIN_MS + Math.random() * (LATENCIA_MAX_MS - LATENCIA_MIN_MS);
  return new Promise((resolve) => setTimeout(resolve, demora));
}

function normalizarNombre(nombre: string): string {
  return nombre.trim().toLowerCase();
}

export async function listarCategorias(): Promise<Categoria[]> {
  await esperarLatenciaSimulada();
  return [...categorias];
}

export async function crearCategoria(datos: {
  nombre: string;
  color: string;
  emoji: string;
}): Promise<Categoria> {
  await esperarLatenciaSimulada();

  const nombre = datos.nombre.trim();
  if (!nombre) {
    throw new Error("El nombre de la categoría es obligatorio.");
  }

  const yaExiste = categorias.some((categoria) => normalizarNombre(categoria.nombre) === normalizarNombre(nombre));
  if (yaExiste) {
    throw new Error("Ya existe una categoría con ese nombre.");
  }

  const nuevaCategoria: Categoria = {
    id: Date.now().toString(),
    nombre,
    color: datos.color,
    emoji: datos.emoji,
  };
  categorias = [...categorias, nuevaCategoria];
  return nuevaCategoria;
}
