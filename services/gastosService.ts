import { Gasto } from "../types/gasto";

export type DatosGasto = {
  monto: number;
  descripcion: string;
  categoriaId: string;
};

const LATENCIA_MIN_MS = 500;
const LATENCIA_MAX_MS = 1000;

let gastos: Gasto[] = [
  {
    id: "1",
    monto: 8500,
    descripcion: "Supermercado",
    categoriaId: "comida",
    fecha: "2026-09-08",
  },
  {
    id: "2",
    monto: 1200,
    descripcion: "Colectivo",
    categoriaId: "transporte",
    fecha: "2026-09-09",
  },
  {
    id: "3",
    monto: 15000,
    descripcion: "Factura de luz",
    categoriaId: "servicios",
    fecha: "2026-09-10",
  },
];

function esperarLatenciaSimulada(): Promise<void> {
  const demora = LATENCIA_MIN_MS + Math.random() * (LATENCIA_MAX_MS - LATENCIA_MIN_MS);
  return new Promise((resolve) => setTimeout(resolve, demora));
}

export async function listarGastos(): Promise<Gasto[]> {
  await esperarLatenciaSimulada();
  return [...gastos].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function obtenerGasto(id: string): Promise<Gasto | undefined> {
  await esperarLatenciaSimulada();
  return gastos.find((gasto) => gasto.id === id);
}

export async function crearGasto(datos: DatosGasto): Promise<Gasto> {
  await esperarLatenciaSimulada();
  const nuevoGasto: Gasto = {
    id: Date.now().toString(),
    fecha: new Date().toISOString().slice(0, 10),
    ...datos,
  };
  gastos = [...gastos, nuevoGasto];
  return nuevoGasto;
}

export async function editarGasto(id: string, datos: DatosGasto): Promise<void> {
  await esperarLatenciaSimulada();
  gastos = gastos.map((gasto) => (gasto.id === id ? { ...gasto, ...datos } : gasto));
}

export async function eliminarGasto(id: string): Promise<void> {
  await esperarLatenciaSimulada();
  gastos = gastos.filter((gasto) => gasto.id !== id);
}
