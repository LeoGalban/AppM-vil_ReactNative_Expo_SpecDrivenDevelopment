import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import EstadoCarga from "../components/EstadoCarga";
import FormularioGasto from "../components/FormularioGasto";
import { listarCategorias } from "../services/categoriasService";
import { crearGasto, DatosGasto } from "../services/gastosService";
import { Categoria } from "../types/gasto";

export default function PantallaNuevoGasto() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    listarCategorias().then((datos) => {
      setCategorias(datos);
      setCargando(false);
    });
  }, []);

  async function guardarGasto(datos: DatosGasto) {
    await crearGasto(datos);
    router.back();
  }

  if (cargando) {
    return <EstadoCarga mensaje="Cargando categorías..." />;
  }

  return (
    <FormularioGasto categorias={categorias} onGuardar={guardarGasto} textoBoton="Agregar gasto" />
  );
}
