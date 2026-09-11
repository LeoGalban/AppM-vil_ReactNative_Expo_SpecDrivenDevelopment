import { Categoria } from "../types/gasto";

export const CATEGORIAS: Categoria[] = ["Comida", "Transporte", "Servicios", "Ocio", "Otros"];

export const COLOR_POR_CATEGORIA: Record<Categoria, string> = {
  Comida: "#F97316",
  Transporte: "#3B82F6",
  Servicios: "#8B5CF6",
  Ocio: "#EC4899",
  Otros: "#6B7280",
};

export const EMOJI_POR_CATEGORIA: Record<Categoria, string> = {
  Comida: "🍔",
  Transporte: "🚌",
  Servicios: "💡",
  Ocio: "🎉",
  Otros: "📦",
};
