import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORES } from "../constants/colores";

type Props = {
  mensaje?: string;
};

export default function EstadoCarga({ mensaje = "Cargando..." }: Props) {
  return (
    <View style={estilos.contenedor}>
      <ActivityIndicator size="large" color={COLORES.primario} />
      <Text style={estilos.texto}>{mensaje}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORES.fondo,
  },
  texto: {
    fontSize: 16,
    color: COLORES.textoSecundario,
  },
});
