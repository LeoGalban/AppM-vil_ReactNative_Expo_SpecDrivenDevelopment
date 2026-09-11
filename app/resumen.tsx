import { useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import EstadoCarga from "../components/EstadoCarga";
import EstadoVacio from "../components/EstadoVacio";
import { COLORES } from "../constants/colores";
import { listarCategorias } from "../services/categoriasService";
import { listarGastos } from "../services/gastosService";
import { Categoria, Gasto } from "../types/gasto";

function formatearMonto(monto: number): string {
  return `$${monto.toLocaleString("es-AR")}`;
}

type TotalPorCategoria = {
  categoria: Categoria;
  total: number;
};

function calcularTotalesPorCategoria(gastos: Gasto[], categorias: Categoria[]): TotalPorCategoria[] {
  const totales = new Map<string, number>();
  for (const gasto of gastos) {
    totales.set(gasto.categoriaId, (totales.get(gasto.categoriaId) ?? 0) + gasto.monto);
  }
  return [...totales.entries()]
    .map(([categoriaId, total]) => {
      const categoria = categorias.find((c) => c.id === categoriaId);
      return categoria ? { categoria, total } : null;
    })
    .filter((item): item is TotalPorCategoria => item !== null)
    .sort((a, b) => b.total - a.total);
}

export default function PantallaResumen() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setCargando(true);
      Promise.all([listarGastos(), listarCategorias()]).then(([datosGastos, datosCategorias]) => {
        setGastos(datosGastos);
        setCategorias(datosCategorias);
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
  const totalesPorCategoria = calcularTotalesPorCategoria(gastos, categorias);

  const datosGrafico = totalesPorCategoria.map(({ categoria, total }) => ({
    name: categoria.nombre,
    population: total,
    color: categoria.color,
    legendFontColor: COLORES.texto,
    legendFontSize: 13,
  }));

  const anchoPantalla = Dimensions.get("window").width;

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <View style={estilos.tarjetaTotal}>
        <Text style={estilos.etiquetaTotal}>Total gastado</Text>
        <Text style={estilos.montoTotal}>{formatearMonto(totalGeneral)}</Text>
      </View>

      <PieChart
        data={datosGrafico}
        width={anchoPantalla - 32}
        height={200}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        chartConfig={{ color: () => COLORES.texto }}
      />

      <Text style={estilos.subtitulo}>Por categoría</Text>

      {totalesPorCategoria.map(({ categoria, total }) => {
        const porcentaje = Math.round((total / totalGeneral) * 100);
        return (
          <View key={categoria.id} style={estilos.filaCategoria}>
            <View style={[estilos.icono, { backgroundColor: `${categoria.color}1A` }]}>
              <Text style={estilos.emoji}>{categoria.emoji}</Text>
            </View>
            <View style={estilos.infoCategoria}>
              <Text style={estilos.nombreCategoria}>{categoria.nombre}</Text>
              <View style={estilos.barraFondo}>
                <View
                  style={[
                    estilos.barraProgreso,
                    { width: `${porcentaje}%`, backgroundColor: categoria.color },
                  ]}
                />
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
