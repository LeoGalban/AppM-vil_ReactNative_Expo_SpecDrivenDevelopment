import { Pressable, StyleSheet, Text, View } from "react-native";
import { Categoria } from "../types/gasto";

type Props = {
  categorias: Categoria[];
  categoriaSeleccionadaId: string | null;
  onSeleccionar: (categoria: Categoria) => void;
};

export default function SelectorCategoria({
  categorias,
  categoriaSeleccionadaId,
  onSeleccionar,
}: Props) {
  return (
    <View style={estilos.fila}>
      {categorias.map((categoria) => {
        const seleccionada = categoriaSeleccionadaId === categoria.id;
        return (
          <Pressable
            key={categoria.id}
            style={[
              estilos.chip,
              { borderColor: categoria.color },
              seleccionada && { backgroundColor: categoria.color },
            ]}
            onPress={() => onSeleccionar(categoria)}
          >
            <Text style={estilos.chipEmoji}>{categoria.emoji}</Text>
            <Text style={[estilos.chipTexto, { color: seleccionada ? "#fff" : categoria.color }]}>
              {categoria.nombre}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
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
});
