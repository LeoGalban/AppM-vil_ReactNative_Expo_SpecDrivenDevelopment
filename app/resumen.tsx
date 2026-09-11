import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import EstadoCarga from "../components/EstadoCarga";
import EstadoVacio from "../components/EstadoVacio";
import { COLOR_POR_CATEGORIA, EMOJI_POR_CATEGORIA } from "../constants/categorias";
import { COLORES } from "../constants/colores";
import { listarGastos } from "../services/gastosService";
import { Categoria, Gasto } from "../types/gasto";

function formatearMonto(monto: number): string {
  return `$${monto.toLocaleString("es-AR")}`;
}

function calcularTotalesPorCategoria(gastos: Gasto[]): { categoria: Categoria; total: number }[] {
  const totales = new Map<Categoria, number>();
  for (const gasto of gastos) {
    totales.set(gasto.categoria, (totales.get(gasto.categoria) ?? 0) + gasto.monto);
  }
  return [...totales.entries()]
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total);
}

export default function PantallaResumen() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setCargando(true);
      listarGastos().then((datos) => {
        setGastos(datos);
        setCargando(false);
      });
    }, [])
  );

  if (cargando) {
    return <EstadoCarga mensaje="Calculando tu resumen..." />;
  }

  if (gastos.length === 0) {
    return <EstadoVacio emoji="📊" mensaje="Cargá algún gasto para ver tu resumen." />;
  }

  const totalGeneral = gastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
  const totalesPorCategoria = calcularTotalesPorCategoria(gastos);

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <View style={estilos.tarjetaTotal}>
        <Text style={estilos.etiquetaTotal}>Total gastado</Text>
        <Text style={estilos.montoTotal}>{formatearMonto(totalGeneral)}</Text>
      </View>

      <Text style={estilos.subtitulo}>Por categoría</Text>

      {totalesPorCategoria.map(({ categoria, total }) => {
        const color = COLOR_POR_CATEGORIA[categoria];
        const porcentaje = Math.round((total / totalGeneral) * 100);
        return (
          <View key={categoria} style={estilos.filaCategoria}>
            <View style={[estilos.icono, { backgroundColor: `${color}1A` }]}>
              <Text style={estilos.emoji}>{EMOJI_POR_CATEGORIA[categoria]}</Text>
            </View>
            <View style={estilos.infoCategoria}>
              <Text style={estilos.nombreCategoria}>{categoria}</Text>
              <View style={estilos.barraFondo}>
                <View style={[estilos.barraProgreso, { width: `${porcentaje}%`, backgroundColor: color }]} />
              </View>
            </View>
            <Text style={estilos.montoCategoria}>{formatearMonto(total)}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
  tarjetaTotal: {
    backgroundColor: COLORES.primario,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 4,
  },
  etiquetaTotal: {
    color: "#E0E7FF",
    fontSize: 14,
    fontWeight: "600",
  },
  montoTotal: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORES.texto,
    marginTop: 8,
  },
  filaCategoria: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 12,
    padding: 12,
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
  },
  infoCategoria: {
    flex: 1,
    gap: 6,
  },
  nombreCategoria: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORES.texto,
  },
  barraFondo: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORES.borde,
    overflow: "hidden",
  },
  barraProgreso: {
    height: "100%",
    borderRadius: 3,
  },
  montoCategoria: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORES.texto,
  },
});
