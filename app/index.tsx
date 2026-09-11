import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import EstadoCarga from "../components/EstadoCarga";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaGasto from "../components/TarjetaGasto";
import { COLORES } from "../constants/colores";
import { listarCategorias } from "../services/categoriasService";
import { listarGastos } from "../services/gastosService";
import { Categoria, Gasto } from "../types/gasto";

export default function PantallaListado() {
  const router = useRouter();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = useCallback(() => {
    setCargando(true);
    Promise.all([listarGastos(), listarCategorias()]).then(([datosGastos, datosCategorias]) => {
      setGastos(datosGastos);
      setCategorias(datosCategorias);
      setCargando(false);
    });
  }, []);

  // Se recarga cada vez que la pantalla toma foco (por ejemplo, al volver de "Agregar gasto").
  useFocusEffect(cargarDatos);

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
