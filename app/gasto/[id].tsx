import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import EstadoCarga from "../../components/EstadoCarga";
import FormularioGasto from "../../components/FormularioGasto";
import { COLOR_POR_CATEGORIA, EMOJI_POR_CATEGORIA } from "../../constants/categorias";
import { COLORES } from "../../constants/colores";
import { DatosGasto, editarGasto, eliminarGasto, obtenerGasto } from "../../services/gastosService";
import { Gasto } from "../../types/gasto";

function formatearMonto(monto: number): string {
  return `$${monto.toLocaleString("es-AR")}`;
}

function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

export default function PantallaDetalleGasto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [gasto, setGasto] = useState<Gasto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    obtenerGasto(id).then((encontrado) => {
      if (!encontrado) {
        router.replace("/");
        return;
      }
      setGasto(encontrado);
      setCargando(false);
    });
  }, [id, router]);

  async function guardarEdicion(datos: DatosGasto) {
    await editarGasto(id, datos);
    router.back();
  }

  function confirmarEliminar() {
    Alert.alert("Eliminar gasto", "¿Seguro que querés eliminar este gasto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await eliminarGasto(id);
          router.back();
        },
      },
    ]);
  }

  if (cargando || !gasto) {
    return <EstadoCarga mensaje="Buscando el gasto..." />;
  }

  if (editando) {
    return (
      <FormularioGasto
        valoresIniciales={{
          monto: gasto.monto,
          descripcion: gasto.descripcion,
          categoria: gasto.categoria,
        }}
        onGuardar={guardarEdicion}
        textoBoton="Guardar cambios"
      />
    );
  }

  const colorCategoria = COLOR_POR_CATEGORIA[gasto.categoria];

  return (
    <View style={estilos.contenedor}>
      <View style={[estilos.icono, { backgroundColor: `${colorCategoria}1A` }]}>
        <Text style={estilos.emoji}>{EMOJI_POR_CATEGORIA[gasto.categoria]}</Text>
      </View>

      <Text style={estilos.monto}>{formatearMonto(gasto.monto)}</Text>
      <Text style={estilos.descripcion}>{gasto.descripcion}</Text>

      <View style={estilos.filaInfo}>
        <Text style={[estilos.categoria, { color: colorCategoria }]}>{gasto.categoria}</Text>
        <Text style={estilos.separador}>·</Text>
        <Text style={estilos.fecha}>{formatearFecha(gasto.fecha)}</Text>
      </View>

      <View style={estilos.filaBotones}>
        <Pressable style={estilos.botonSecundario} onPress={() => setEditando(true)}>
          <Text style={estilos.botonSecundarioTexto}>Editar</Text>
        </Pressable>
        <Pressable style={estilos.botonEliminar} onPress={confirmarEliminar}>
          <Text style={estilos.botonEliminarTexto}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  icono: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  emoji: {
    fontSize: 32,
  },
  monto: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORES.texto,
  },
  descripcion: {
    fontSize: 18,
    color: COLORES.texto,
  },
  filaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  categoria: {
    fontSize: 14,
    fontWeight: "600",
  },
  separador: {
    fontSize: 14,
    color: COLORES.textoSecundario,
  },
  fecha: {
    fontSize: 14,
    color: COLORES.textoSecundario,
  },
  filaBotones: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    width: "100%",
  },
  botonSecundario: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORES.primario,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botonSecundarioTexto: {
    color: COLORES.primario,
    fontWeight: "700",
    fontSize: 15,
  },
  botonEliminar: {
    flex: 1,
    backgroundColor: COLORES.error,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botonEliminarTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
