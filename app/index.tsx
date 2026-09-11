import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import EstadoCarga from "../components/EstadoCarga";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaGasto from "../components/TarjetaGasto";
import { COLORES } from "../constants/colores";
import { listarGastos } from "../services/gastosService";
import { Gasto } from "../types/gasto";

export default function PantallaListado() {
  const router = useRouter();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarGastos = useCallback(() => {
    setCargando(true);
    listarGastos().then((datos) => {
      setGastos(datos);
      setCargando(false);
    });
  }, []);

  useEffect(() => {
    cargarGastos();
  }, [cargarGastos]);

  // Vuelve a cargar la lista cada vez que la pantalla toma foco (por ejemplo, al volver
  // desde "Agregar gasto"), no solo la primera vez que se monta.
  useFocusEffect(cargarGastos);

  if (cargando) {
    return <EstadoCarga mensaje="Cargando tus gastos..." />;
  }

  if (gastos.length === 0) {
    return <EstadoVacio emoji="💸" mensaje="Todavía no cargaste ningún gasto." />;
  }

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.contenido}
      data={gastos}
      keyExtractor={(gasto) => gasto.id}
      renderItem={({ item }) => (
        <TarjetaGasto gasto={item} onPress={() => router.push(`/gasto/${item.id}`)} />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    paddingVertical: 12,
  },
});
