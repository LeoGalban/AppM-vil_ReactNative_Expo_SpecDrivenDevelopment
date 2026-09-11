import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Calendar, DateData } from "react-native-calendars";
import EstadoCarga from "../components/EstadoCarga";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaGasto from "../components/TarjetaGasto";
import { COLORES } from "../constants/colores";
import { listarCategorias } from "../services/categoriasService";
import { listarGastos } from "../services/gastosService";
import { Categoria, Gasto } from "../types/gasto";

export default function PantallaCalendario() {
  const router = useRouter();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);

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
    return <EstadoCarga mensaje="Cargando calendario..." />;
  }

  const fechasConGastos = new Set(gastos.map((gasto) => gasto.fecha));
  const marcas: Record<string, { marked?: boolean; dotColor?: string; selected?: boolean; selectedColor?: string }> = {};
  fechasConGastos.forEach((fecha) => {
    marcas[fecha] = { marked: true, dotColor: COLORES.primario };
  });
  if (fechaSeleccionada) {
    marcas[fechaSeleccionada] = {
      ...marcas[fechaSeleccionada],
      selected: true,
      selectedColor: COLORES.primario,
    };
  }

  const gastosDelDia = fechaSeleccionada
    ? gastos.filter((gasto) => gasto.fecha === fechaSeleccionada)
    : [];

  return (
    <View style={estilos.contenedor}>
      <Calendar
        markedDates={marcas}
        onDayPress={(dia: DateData) => setFechaSeleccionada(dia.dateString)}
        theme={{
          todayTextColor: COLORES.primario,
          arrowColor: COLORES.primario,
          selectedDayBackgroundColor: COLORES.primario,
        }}
      />

      {!fechaSeleccionada && (
        <Text style={estilos.ayuda}>Tocá un día marcado para ver sus gastos.</Text>
      )}

      {fechaSeleccionada && gastosDelDia.length === 0 && (
        <EstadoVacio emoji="🗓️" mensaje="No cargaste gastos en este día." />
      )}

      {fechaSeleccionada && gastosDelDia.length > 0 && (
        <FlatList
          style={estilos.lista}
          data={gastosDelDia}
          keyExtractor={(gasto) => gasto.id}
          renderItem={({ item }) => {
            const categoria = categorias.find((c) => c.id === item.categoriaId);
            if (!categoria) return null;
            return (
              <TarjetaGasto
                gasto={item}
                categoria={categoria}
                onPress={() => router.push(`/gasto/${item.id}`)}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  ayuda: {
    textAlign: "center",
    color: COLORES.textoSecundario,
    marginTop: 24,
    fontSize: 14,
  },
  lista: {
    flex: 1,
    marginTop: 8,
  },
});
