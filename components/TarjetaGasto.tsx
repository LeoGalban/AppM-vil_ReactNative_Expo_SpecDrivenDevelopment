import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORES } from "../constants/colores";
import { COLOR_POR_CATEGORIA, EMOJI_POR_CATEGORIA } from "../constants/categorias";
import { Gasto } from "../types/gasto";

type Props = {
  gasto: Gasto;
  onPress?: () => void;
};

function formatearMonto(monto: number): string {
  return `$${monto.toLocaleString("es-AR")}`;
}

function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

export default function TarjetaGasto({ gasto, onPress }: Props) {
  const colorCategoria = COLOR_POR_CATEGORIA[gasto.categoria];

  return (
    <Pressable
      style={({ pressed }) => [estilos.tarjeta, pressed && estilos.tarjetaPresionada]}
      onPress={onPress}
    >
      <View style={[estilos.iconoCategoria, { backgroundColor: `${colorCategoria}1A` }]}>
        <Text style={estilos.emoji}>{EMOJI_POR_CATEGORIA[gasto.categoria]}</Text>
      </View>

      <View style={estilos.info}>
        <Text style={estilos.descripcion} numberOfLines={1}>
          {gasto.descripcion}
        </Text>
        <View style={estilos.filaInferior}>
          <Text style={[estilos.categoria, { color: colorCategoria }]}>{gasto.categoria}</Text>
          <Text style={estilos.separador}>·</Text>
          <Text style={estilos.fecha}>{formatearFecha(gasto.fecha)}</Text>
        </View>
      </View>

      <Text style={estilos.monto}>{formatearMonto(gasto.monto)}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORES.tarjeta,
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tarjetaPresionada: {
    opacity: 0.7,
  },
  iconoCategoria: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  descripcion: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORES.texto,
  },
  filaInferior: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoria: {
    fontSize: 13,
    fontWeight: "600",
  },
  separador: {
    fontSize: 13,
    color: COLORES.textoSecundario,
  },
  fecha: {
    fontSize: 13,
    color: COLORES.textoSecundario,
  },
  monto: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORES.texto,
  },
});
