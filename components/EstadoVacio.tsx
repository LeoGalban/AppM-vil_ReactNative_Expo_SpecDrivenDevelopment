import { StyleSheet, Text, View } from "react-native";
import { COLORES } from "../constants/colores";

type Props = {
  mensaje: string;
  emoji?: string;
};

export default function EstadoVacio({ mensaje, emoji = "🗒️" }: Props) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.emoji}>{emoji}</Text>
      <Text style={estilos.texto}>{mensaje}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
    backgroundColor: COLORES.fondo,
  },
  emoji: {
    fontSize: 40,
  },
  texto: {
    fontSize: 16,
    color: COLORES.textoSecundario,
    textAlign: "center",
  },
});
