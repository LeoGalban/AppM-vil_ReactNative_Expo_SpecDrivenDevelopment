import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CATEGORIAS, COLOR_POR_CATEGORIA, EMOJI_POR_CATEGORIA } from "../constants/categorias";
import { COLORES } from "../constants/colores";
import { DatosGasto } from "../services/gastosService";
import { Categoria } from "../types/gasto";

type Props = {
  valoresIniciales?: DatosGasto;
  onGuardar: (datos: DatosGasto) => Promise<void>;
  textoBoton?: string;
};

type Errores = {
  monto?: string;
  descripcion?: string;
  categoria?: string;
};

export default function FormularioGasto({ valoresIniciales, onGuardar, textoBoton = "Guardar" }: Props) {
  const [monto, setMonto] = useState(valoresIniciales ? String(valoresIniciales.monto) : "");
  const [descripcion, setDescripcion] = useState(valoresIniciales?.descripcion ?? "");
  const [categoria, setCategoria] = useState<Categoria | null>(valoresIniciales?.categoria ?? null);
  const [errores, setErrores] = useState<Errores>({});
  const [guardando, setGuardando] = useState(false);

  function validar(): Errores {
    const nuevosErrores: Errores = {};
    const montoNumerico = Number(monto.replace(",", "."));

    if (!monto.trim() || Number.isNaN(montoNumerico) || montoNumerico <= 0) {
      nuevosErrores.monto = "Ingresá un monto numérico mayor a 0.";
    }
    if (descripcion.trim().length < 3) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
    }
    if (!categoria) {
      nuevosErrores.categoria = "Elegí una categoría.";
    }
    return nuevosErrores;
  }

  async function manejarGuardar() {
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0 || !categoria) {
      return;
    }

    setGuardando(true);
    await onGuardar({
      monto: Number(monto.replace(",", ".")),
      descripcion: descripcion.trim(),
      categoria,
    });
    setGuardando(false);
  }

  return (
    <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
      <Text style={estilos.etiqueta}>Monto</Text>
      <TextInput
        style={[estilos.input, errores.monto && estilos.inputConError]}
        placeholder="0"
        keyboardType="decimal-pad"
        value={monto}
        onChangeText={setMonto}
      />
      {errores.monto && <Text style={estilos.textoError}>{errores.monto}</Text>}

      <Text style={estilos.etiqueta}>Descripción</Text>
      <TextInput
        style={[estilos.input, errores.descripcion && estilos.inputConError]}
        placeholder="Ej: Supermercado"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      {errores.descripcion && <Text style={estilos.textoError}>{errores.descripcion}</Text>}

      <Text style={estilos.etiqueta}>Categoría</Text>
      <View style={estilos.filaCategorias}>
        {CATEGORIAS.map((opcion) => {
          const seleccionada = categoria === opcion;
          const color = COLOR_POR_CATEGORIA[opcion];
          return (
            <Pressable
              key={opcion}
              style={[
                estilos.chip,
                { borderColor: color },
                seleccionada && { backgroundColor: color },
              ]}
              onPress={() => setCategoria(opcion)}
            >
              <Text style={estilos.chipEmoji}>{EMOJI_POR_CATEGORIA[opcion]}</Text>
              <Text style={[estilos.chipTexto, { color: seleccionada ? "#fff" : color }]}>
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {errores.categoria && <Text style={estilos.textoError}>{errores.categoria}</Text>}

      <Pressable
        style={[estilos.boton, guardando && estilos.botonDeshabilitado]}
        onPress={manejarGuardar}
        disabled={guardando}
      >
        <Text style={estilos.botonTexto}>{guardando ? "Guardando..." : textoBoton}</Text>
      </Pressable>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenido: {
    padding: 20,
    gap: 6,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORES.texto,
    marginTop: 12,
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
  inputConError: {
    borderColor: COLORES.error,
  },
  textoError: {
    color: COLORES.error,
    fontSize: 13,
    marginTop: 4,
  },
  filaCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: "600",
  },
  boton: {
    backgroundColor: COLORES.primario,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
