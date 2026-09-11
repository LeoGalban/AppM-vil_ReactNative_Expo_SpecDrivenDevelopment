import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { COLORES } from "../constants/colores";

export default function LayoutRaiz() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORES.primario },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: COLORES.fondo },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mis Gastos",
          headerRight: () => (
            <View style={estilos.filaBotonesHeader}>
              <Link href="/calendario">
                <Text style={estilos.botonHeader}>🗓️</Text>
              </Link>
              <Link href="/categorias">
                <Text style={estilos.botonHeader}>🏷️</Text>
              </Link>
              <Link href="/resumen">
                <Text style={estilos.botonHeader}>📊</Text>
              </Link>
              <Link href="/nuevo">
                <Text style={estilos.botonHeaderMas}>+</Text>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen name="nuevo" options={{ title: "Nuevo gasto" }} />
      <Stack.Screen name="resumen" options={{ title: "Resumen" }} />
      <Stack.Screen name="calendario" options={{ title: "Calendario" }} />
      <Stack.Screen name="categorias" options={{ title: "Categorías" }} />
      <Stack.Screen name="gasto/[id]" options={{ title: "Detalle del gasto" }} />
    </Stack>
  );
}

const estilos = StyleSheet.create({
  filaBotonesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  botonHeader: {
    fontSize: 17,
  },
  botonHeaderMas: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "400",
  },
});
