import { useRouter } from "expo-router";
import FormularioGasto from "../components/FormularioGasto";
import { crearGasto, DatosGasto } from "../services/gastosService";

export default function PantallaNuevoGasto() {
  const router = useRouter();

  async function guardarGasto(datos: DatosGasto) {
    await crearGasto(datos);
    router.back();
  }

  return <FormularioGasto onGuardar={guardarGasto} textoBoton="Agregar gasto" />;
}
