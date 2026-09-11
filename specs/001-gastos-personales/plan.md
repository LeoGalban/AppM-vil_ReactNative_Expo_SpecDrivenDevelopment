# Implementation Plan: Gestor de Gastos Personales

**Branch**: `001-gastos-personales` | **Date**: 2026-09-11 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-gastos-personales/spec.md`

## Summary

Prototipo de una app de gastos personales ("Mis Gastos") con listado, detalle, alta/edición con
validación y resumen por categoría. Sin backend: una capa de servicios simulados en memoria con
latencia artificial hace de "API falsa". Navegación con `expo-router` (enrutamiento por
archivos). Estado local con `useState`/`useContext`, sin librerías de estado externas (constitución
principio I).

## Technical Context

**Language/Version**: TypeScript 6, React 19, React Native 0.86 (vía Expo SDK 57)

**Primary Dependencies**: `expo-router` (navegación por archivos), `react-native-safe-area-context`
y `react-native-screens` (requeridos por expo-router); `react-native-svg` + `react-native-chart-kit`
(gráfico de torta en el resumen, ambos basados en SVG puro, compatibles con Expo Go sin
`expo prebuild`); `react-native-calendars` (grilla de calendario mensual, también pura JS/Expo Go
compatible).

**Storage**: Ninguno obligatorio. Los datos viven en arrays en memoria dentro de
`services/gastosService.ts` y `services/categoriasService.ts`. `AsyncStorage` queda como mejora
opcional (fuera del alcance mínimo).

**Testing**: Prueba manual en dispositivo real con Expo Go, una vez por tarea completada (no se
agrega un framework de testing automatizado: está fuera del alcance del prototipo).

**Target Platform**: iOS y Android, ejecutado dentro de Expo Go (sin build nativo propio).

**Project Type**: mobile-app (single project, sin backend separado).

**Performance Goals**: N/A para un prototipo académico; la única meta explícita es que la
latencia simulada de los mocks (500–1000 ms) sea perceptible pero no moleste la UX.

**Constraints**: Debe correr en Expo Go sin `expo prebuild`; no se pueden usar módulos nativos
que no estén soportados por Expo Go.

**Scale/Scope**: 4 pantallas de rutas + 1 pantalla de detalle dinámica = 5 rutas navegables en
total; una sola entidad de dominio (Gasto).

## Constitution Check

*GATE: revisado contra `.specify/memory/constitution.md` v1.0.0.*

- ✅ Principio I (stack fijo, sin backend): no se agrega ningún backend ni librería de estado
  externa.
- ✅ Principio III (mocks como red real): toda lectura/escritura de gastos pasa por
  `services/gastosService.ts`, con `Promise` + `setTimeout`.
- ✅ Principio IV (español): nombres de carpetas, archivos, variables y componentes en español.
- ✅ Requisitos Técnicos: 5 rutas > mínimo de 4 pantallas; formulario con validación; estados de
  carga/vacío explícitos en cada pantalla que consume el servicio.
- Sin violaciones que requieran justificar en Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-gastos-personales/
├── plan.md              # Este archivo
├── spec.md              # Especificación (historias, requisitos, criterios de éxito)
└── tasks.md             # Lista de tareas (generada por /speckit-tasks)
```

### Source Code (repository root)

```text
app/
├── _layout.tsx              # Stack raíz de expo-router (define las transiciones entre pantallas)
├── index.tsx                # Pantalla 1: Listado de gastos (ruta "/")
├── nuevo.tsx                 # Pantalla 2: Formulario de alta de gasto (ruta "/nuevo")
├── resumen.tsx                # Pantalla 3: Resumen + gráfico de torta (ruta "/resumen")
├── calendario.tsx              # Pantalla 5: Calendario mensual (ruta "/calendario")
├── categorias.tsx               # Pantalla 6: Listado + alta de categorías (ruta "/categorias")
└── gasto/
    └── [id].tsx               # Pantalla 4: Detalle + edición de un gasto (ruta "/gasto/123")

components/
├── TarjetaGasto.tsx          # Ítem individual de la lista (fecha, monto, categoría, descripción)
├── EstadoCarga.tsx            # Indicador de carga reutilizable (spinner + texto)
├── EstadoVacio.tsx             # Mensaje reutilizable de "no hay gastos todavía"
├── FormularioGasto.tsx         # Formulario con validación, reutilizado por alta y edición
└── SelectorCategoria.tsx        # Chips de categoría reutilizados por el formulario de gastos

services/
├── gastosService.ts           # Mock: listarGastos, obtenerGasto, crearGasto, editarGasto,
│                               # eliminarGasto — todas async con latencia simulada
└── categoriasService.ts        # Mock: listarCategorias (predefinidas + creadas), crearCategoria

types/
└── gasto.ts                    # Tipos TypeScript: Gasto, Categoria

constants/
├── colores.ts                   # Paleta general de la app
└── categoriasPorDefecto.ts       # Semilla de categorías predefinidas (nombre, color, emoji)
```

**Structure Decision**: proyecto único (mobile-app), sin separación frontend/backend porque no
hay backend. `app/` queda reservado exclusivamente para pantallas de expo-router (regla del
propio framework); toda la lógica reutilizable vive fuera, en `components/`, `services/`,
`types/` y `constants/`, para que las pantallas queden simples y fáciles de explicar en la
defensa. Las categorías dejan de ser un tipo unión fijo y pasan a ser una entidad propia servida
por `categoriasService.ts`, para poder sumar categorías creadas por el usuario sin tocar el tipo
`Gasto`.

## Complexity Tracking

*Sin violaciones a la constitución que requieran justificación.*
