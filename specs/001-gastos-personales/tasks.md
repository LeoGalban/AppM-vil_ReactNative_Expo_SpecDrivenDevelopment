# Tasks: Gestor de Gastos Personales

**Input**: Design documents from `/specs/001-gastos-personales/`

**Prerequisites**: plan.md, spec.md

**Tests**: No se incluyen tareas de testing automatizado (no fue solicitado en la spec). La
verificación de cada tarea es manual, en un teléfono real con Expo Go, según el principio V de la
constitución.

**Organization**: Las tareas están agrupadas por historia de usuario para poder implementar y
probar cada una de forma independiente.

## Format: `[ID] [P?] [Story] Descripción`

- **[P]**: se puede hacer en paralelo (archivos distintos, sin dependencias)
- **[Story]**: a qué historia de usuario pertenece (US1, US2, US3, US4, US5)

---

## Phase 1: Setup

**Purpose**: dejar el proyecto Expo listo con navegación por archivos.

- [ ] T001 Instalar `expo-router` y sus dependencias (`react-native-safe-area-context`,
      `react-native-screens`, `expo-linking`, `expo-constants`) con `npx expo install`.
- [ ] T002 Configurar el entry point: `package.json` → `"main": "expo-router/entry"`, agregar
      `"scheme": "misgastos"` en `app.json`, borrar `App.tsx` e `index.ts` (ya no se usan), crear
      `app/_layout.tsx` con un `Stack` vacío de expo-router.
- [ ] T003 [P] Crear `types/gasto.ts` con los tipos `Categoria` (unión de los 5 valores fijos) y
      `Gasto` (id, monto, descripcion, categoria, fecha).
- [ ] T004 [P] Crear `constants/categorias.ts` exportando el array de las 5 categorías
      permitidas, reutilizado por el formulario y el resumen.

**Checkpoint**: `npx expo start` levanta sin errores y muestra una pantalla en blanco de
expo-router en el teléfono (todavía sin contenido real).

---

## Phase 2: Foundational (bloqueante para todas las historias)

**Purpose**: la capa de datos mock y los componentes de estado que van a usar todas las
pantallas.

- [ ] T005 Crear `services/gastosService.ts` con un array en memoria de gastos de ejemplo y la
      función `listarGastos()`: `async`, devuelve una `Promise` que resuelve con el array después
      de 500–1000 ms (simulado con `setTimeout`), ordenado del más nuevo al más viejo.
- [ ] T006 [P] Crear `components/EstadoCarga.tsx` (spinner + texto "Cargando...") y
      `components/EstadoVacio.tsx` (mensaje configurable por `props`), reutilizables por
      cualquier pantalla.

**Checkpoint**: fundación lista — a partir de acá cada historia de usuario se puede implementar.

---

## Phase 3: User Story 1 - Ver el listado de gastos (Priority: P1) 🎯 MVP

**Goal**: abrir la app y ver los gastos cargados, con loading y estado vacío.

**Independent Test**: abrir la app y verificar que aparece el indicador de carga y después la
lista (o el estado vacío si se vacía el array mock).

- [ ] T007 [US1] Crear `components/TarjetaGasto.tsx`: recibe un `Gasto` por props y muestra fecha,
      monto formateado, categoría y descripción.
- [ ] T008 [US1] Implementar `app/index.tsx`: al montar, llama a `listarGastos()`, maneja los tres
      estados (`cargando` / `vacio` / `datos`) usando `EstadoCarga`, `EstadoVacio` y una
      `FlatList` de `TarjetaGasto`.

**Checkpoint**: probar en el teléfono — se ve el loading y después la lista mock.

---

## Phase 4: User Story 2 - Agregar un gasto nuevo (Priority: P1)

**Goal**: cargar un gasto nuevo desde un formulario validado y verlo en el listado.

**Independent Test**: completar el formulario con datos válidos y verificar que el gasto nuevo
aparece primero en el listado.

- [ ] T009 [US2] Agregar `crearGasto(datos)` a `services/gastosService.ts`: valida internamente
      que no falten campos, genera un id nuevo, lo agrega al array en memoria, simula la misma
      latencia que el resto.
- [ ] T010 [US2] Crear `components/FormularioGasto.tsx`: campos monto/descripción/categoría con
      validación (monto numérico > 0, descripción ≥ 3 caracteres, categoría obligatoria de
      `constants/categorias.ts`) y mensajes de error por campo.
- [ ] T011 [US2] Implementar `app/nuevo.tsx` usando `FormularioGasto`, llama a `crearGasto` al
      guardar y navega de vuelta al listado (`router.back()`) si sale bien.
- [ ] T012 [US2] Agregar un botón/ícono en `app/index.tsx` que navegue a `/nuevo`.

**Checkpoint**: cargar un gasto desde el teléfono y verlo aparecer en el listado.

---

## Phase 5: User Story 3 - Ver el detalle de un gasto (Priority: P2)

**Goal**: tocar un gasto del listado y ver su información completa en una pantalla propia.

**Independent Test**: tocar distintos gastos del listado y verificar que cada uno abre su propio
detalle correcto.

- [ ] T013 [US3] Agregar `obtenerGasto(id)` a `services/gastosService.ts` (busca por id en el
      array en memoria, simula latencia).
- [ ] T014 [US3] Implementar `app/gasto/[id].tsx`: lee el `id` de la URL con `useLocalSearchParams`,
      llama a `obtenerGasto`, maneja loading, y si no encuentra el gasto vuelve al listado
      (`router.replace('/')`).
- [ ] T015 [US3] Conectar `TarjetaGasto`/`app/index.tsx` para que tocar un ítem navegue a
      `/gasto/[id]` con el id correspondiente.

**Checkpoint**: tocar cada gasto del listado y confirmar que el detalle mostrado corresponde.

---

## Phase 6: User Story 4 - Editar o eliminar un gasto (Priority: P3)

**Goal**: corregir o borrar un gasto existente desde su detalle.

**Independent Test**: editar un gasto y ver el cambio reflejado en el listado; eliminar otro y
verificar que desaparece.

- [ ] T016 [US4] Agregar `editarGasto(id, datos)` y `eliminarGasto(id)` a
      `services/gastosService.ts`.
- [ ] T017 [US4] Extender `app/gasto/[id].tsx` para reutilizar `FormularioGasto` en modo edición
      (precargado con los datos actuales) y guardar con `editarGasto`.
- [ ] T018 [US4] Agregar un botón "Eliminar" en `app/gasto/[id].tsx` que pida confirmación
      (`Alert.alert`) antes de llamar a `eliminarGasto` y volver al listado.

**Checkpoint**: editar un gasto y confirmar el cambio en el listado; eliminar el único gasto
restante y confirmar que el listado vuelve al estado vacío.

---

## Phase 7: User Story 5 - Ver un resumen de gastos (Priority: P3)

**Goal**: ver el total general y el total por categoría.

**Independent Test**: cargar gastos en al menos dos categorías distintas y verificar que los
totales del resumen son correctos.

- [ ] T019 [US5] Implementar `app/resumen.tsx`: llama a `listarGastos()`, calcula el total general
      y un total por cada categoría presente, maneja estado de carga y estado vacío.
- [ ] T020 [US5] Agregar navegación desde `app/index.tsx` hacia `/resumen` (botón o ícono en el
      header del `Stack`).

**Checkpoint**: cargar gastos variados y confirmar a mano que los totales del resumen suman bien.

---

## Phase 8: Polish & Cross-Cutting

**Purpose**: mejoras finales que no son una historia de usuario propia.

- [ ] T021 [P] Revisar textos de error y UX general de `FormularioGasto` (mensajes claros en
      español).
- [ ] T022 [P] (Opcional, suma nota) Agregar persistencia con `AsyncStorage` dentro de
      `services/gastosService.ts` (cargar/guardar el array de gastos), sin cambiar la interfaz
      pública del servicio.
- [ ] T023 Reemplazar `AGENTS.md` genérico por uno con las convenciones reales del proyecto.
- [ ] T024 Sacar capturas de cada pantalla en el teléfono para `PROCESO.md`.

---

## Dependencies & Execution Order

- **Setup (Fase 1)** → **Foundational (Fase 2)**: bloquea todas las historias.
- **US1 (Fase 3)** y **US2 (Fase 4)** son P1: se implementan primero, en ese orden (US1 antes
  porque US2 depende de tener el listado para verificar que el gasto nuevo aparece).
- **US3 (Fase 5)** depende de que exista el listado (US1) para navegar desde ahí.
- **US4 (Fase 6)** depende del detalle (US3).
- **US5 (Fase 7)** depende de `listarGastos` (Fase 2), pero es independiente de US3/US4.
- **Polish (Fase 8)** al final, sobre todo lo demás.

## Implementation Strategy

MVP mínimo demostrable: Fases 1, 2, 3 y 4 (listar + agregar). A partir de ahí, cada fase
siguiente suma una historia sin romper las anteriores — se puede hacer una demo funcional después
de cada checkpoint.
