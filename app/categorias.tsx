import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useFocusEffect } from "expo-router";
import EstadoCarga from "../components/EstadoCarga";
import { COLORES } from "../constants/colores";
import { crearCategoria, listarCategorias } from "../services/categoriasService";
import { Categoria } from "../types/gasto";

const PALETA_COLORES = [
  "#F97316",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#06B6D4",
  "#F59E0B",
  "#84CC16",
  "#14B8A6",
  "#6B7280",
];

const EMOJIS_DISPONIBLES = ["🎮", "📱", "✈️", "💰", "🎁", "📚", "⚽", "🎵"];

export default function PantallaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);

  const [nombre, setNombre] = useState("");
  const [colorElegido, setColorElegido] = useState(PALETA_COLORES[0]);
  const [emojiElegido, setEmojiElegido] = useState(EMOJIS_DISPONIBLES[0]);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const cargarCategorias = useCallback(() => {
    setCargando(true);
    listarCategorias().then((datos) => {
      setCategorias(datos);
      setCargando(false);
    });
  }, []);

  useFocusEffect(cargarCategorias);

  async function manejarCrear() {
    if (!nombre.trim()) {
      setError("Ingresá un nombre para la categoría.");
      return;
    }

    setGuardando(true);
    setError(null);
    try {
      await crearCategoria({ nombre, color: colorElegido, emoji: emojiElegido });
      setNombre("");
      cargarCategorias();
    } catch (excepcion) {
      setError(excepcion instanceof Error ? excepcion.message : "No se pudo crear la categoría.");
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return <EstadoCarga mensaje="Cargando categorías..." />;
  }

  return (
    <View style={estilos.contenedor}>
      <FlatList
        style={estilos.lista}
        data={categorias}
        keyExtractor={(categoria) => categoria.id}
        renderItem={({ item }) => (
          <View style={estilos.filaCategoria}>
            <View style={[estilos.icono, { backgroundColor: `${item.color}1A` }]}>
              <Text style={estilos.emoji}>{item.emoji}</Text>
            </View>
            <Text style={estilos.nombreCategoria}>{item.nombre}</Text>
          </View>
        )}
      />

      <View style={estilos.formulario}>
        <Text style={estilos.titulo}>Nueva categoría</Text>

        <TextInput
          style={estilos.input}
          placeholder="Nombre (ej: Suscripciones)"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={estilos.etiqueta}>Color</Text>
        <View style={estilos.filaOpciones}>
          {PALETA_COLORES.map((color) => (
            <Pressable
              key={color}
              style={[
                estilos.circuloColor,
                { backgroundColor: color },
                colorElegido === color && estilos.circuloSeleccionado,
              ]}
              onPress={() => setColorElegido(color)}
            />
          ))}
        </View>

        <Text style={estilos.etiqueta}>Emoji</Text>
        <View style={estilos.filaOpciones}>
          {EMOJIS_DISPONIBLES.map((emoji) => (
            <Pressable
              key={emoji}
              style={[
                estilos.chipEmoji,
                emojiElegido === emoji && { borderColor: colorElegido, borderWidth: 2 },
              ]}
              onPress={() => setEmojiElegido(emoji)}
            >
              <Text style={estilos.emojiGrande}>{emoji}</Text>
            </Pressable>
          ))}
        </View>

        {error && <Text style={estilos.textoError}>{error}</Text>}

        <Pressable
          style={[estilos.boton, guardando && estilos.botonDeshabilitado]}
          onPress={manejarCrear}
          disabled={guardando}
        >
          <Text style={estilos.botonTexto}>{guardando ? "Creando..." : "Crear categoría"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  lista: {
    maxHeight: "40%",
  },
  filaCategoria: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icono: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 16,
  },
  nombreCategoria: {
    fontSize: 15,
    color: COLORES.texto,
    fontWeight: "500",
  },
  formulario: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORES.borde,
    gap: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORES.texto,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORES.borde,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORES.tarjeta,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORES.texto,
    marginTop: 8,
  },
  filaOpciones: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  circuloColor: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  circuloSeleccionado: {
    borderWidth: 3,
    borderColor: COLORES.texto,
  },
  chipEmoji: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORES.tarjeta,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  emojiGrande: {
    fontSize: 18,
  },
  textoError: {
    color: COLORES.error,
    fontSize: 13,
  },
  boton: {
    backgroundColor: COLORES.primario,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
