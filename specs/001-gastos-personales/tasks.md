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

## Phase 7: User Story 5 - Ver un resumen de gastos con gráfico (Priority: P3)

**Goal**: ver el total general, el total por categoría y un gráfico de torta.

**Independent Test**: cargar gastos en al menos dos categorías distintas y verificar que los
totales y el gráfico del resumen son correctos.

- [ ] T019 [US5] Implementar `app/resumen.tsx`: llama a `listarGastos()`, calcula el total general
      y un total por cada categoría presente, maneja estado de carga y estado vacío.
- [ ] T020 [US5] Agregar navegación desde `app/index.tsx` hacia `/resumen` (botón o ícono en el
      header del `Stack`).
- [ ] T020b [US5] Instalar `react-native-svg` y `react-native-chart-kit` con `npx expo install`, y
      agregar un `PieChart` a `app/resumen.tsx` con una porción por categoría (mismo color que el
      resto de la app).

**Checkpoint**: cargar gastos variados y confirmar a mano que los totales y el gráfico coinciden.

---

## Phase 9: Refactor - Categorías como entidad propia (bloqueante para US6/US7)

**Purpose**: antes de sumar categorías creadas por el usuario, las categorías dejan de ser un
tipo unión fijo (`"Comida" | "Transporte" | ...`) y pasan a ser objetos con id, nombre, color y
emoji, servidos por un mock propio. Esto toca todo lo que ya usaba `Categoria` como string.

- [ ] T025 Redefinir `Categoria` en `types/gasto.ts` como `{ id, nombre, color, emoji }`, y cambiar
      `Gasto.categoria` (string) por `Gasto.categoriaId` (string).
- [ ] T026 Crear `constants/categoriasPorDefecto.ts` con la semilla de categorías de fábrica
      (ampliadas: Comida, Transporte, Servicios, Ocio, Salud, Educación, Hogar, Mascotas, Ropa,
      Otros) con id, nombre, color y emoji.
- [ ] T027 Crear `services/categoriasService.ts`: `listarCategorias()` (devuelve la semilla más
      las creadas por el usuario, con latencia simulada) y `crearCategoria(datos)` (valida nombre
      no vacío y no duplicado, genera id, la agrega en memoria).
- [ ] T028 Crear `components/SelectorCategoria.tsx`: recibe la lista de categorías y la
      seleccionada, renderiza los chips (mismo diseño que ya existía en `FormularioGasto`).
- [ ] T029 Actualizar `FormularioGasto.tsx` para pedir la lista de categorías por props (en vez de
      importar la constante fija) y usar `SelectorCategoria`.
- [ ] T030 Actualizar `TarjetaGasto.tsx`, `app/gasto/[id].tsx` y `app/resumen.tsx` para resolver
      nombre/color/emoji de la categoría a partir del `categoriaId` (reciben la lista de
      categorías ya cargada, o la piden ellos mismos con `listarCategorias()`).

**Checkpoint**: la app sigue funcionando igual que antes del refactor (listar, agregar, editar,
eliminar, resumen), ahora resolviendo la categoría por id en vez de por string fijo.

---

## Phase 10: User Story 6 - Ver los gastos en un calendario (Priority: P4)

**Goal**: calendario mensual con los días que tienen gastos marcados; tocar un día muestra sus
gastos.

**Independent Test**: cargar gastos en distintas fechas del mes y verificar que el calendario
marca esos días, y que tocar uno muestra solo los gastos de esa fecha.

- [ ] T031 [US6] Instalar `react-native-calendars` con `npx expo install`.
- [ ] T032 [US6] Implementar `app/calendario.tsx`: llama a `listarGastos()`, arma un objeto de
      "días marcados" (`markedDates`) a partir de las fechas con gastos, y renderiza el
      componente `Calendar`.
- [ ] T033 [US6] Al tocar un día, mostrar debajo del calendario la lista de gastos de esa fecha
      (reutilizando `TarjetaGasto` y `EstadoVacio` si no hay gastos ese día).
- [ ] T034 [US6] Agregar navegación desde `app/index.tsx` hacia `/calendario` (ícono en el
      header).

**Checkpoint**: cargar gastos en 2-3 fechas distintas y verificar que el calendario los marca
correctamente y que tocar cada fecha muestra los gastos correctos.

---

## Phase 11: User Story 7 - Crear categorías propias (Priority: P4)

**Goal**: pantalla para ver todas las categorías y crear nuevas.

**Independent Test**: crear una categoría nueva y verificar que aparece disponible en el selector
del formulario de gastos.

- [ ] T035 [US7] Implementar `app/categorias.tsx`: lista las categorías (`listarCategorias()`)
      mostrando emoji, nombre y color de cada una.
- [ ] T036 [US7] Agregar un formulario simple dentro de la misma pantalla (nombre + elegir color
      de una paleta fija + elegir emoji de una lista corta) que llama a `crearCategoria` y
      refresca la lista.
- [ ] T037 [US7] Validar en el formulario: nombre obligatorio, sin duplicados (mismo mensaje que
      devuelve el service), color y emoji obligatorios.
- [ ] T038 [US7] Agregar navegación desde `app/index.tsx` o `app/_layout.tsx` hacia `/categorias`.

**Checkpoint**: crear una categoría nueva y confirmar que aparece en el selector al cargar un
gasto nuevo.

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
