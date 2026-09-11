# Feature Specification: Gestor de Gastos Personales

**Feature Branch**: `001-gastos-personales`

**Created**: 2026-09-11

**Status**: Draft

**Input**: User description: "App de gestión de gastos personales llamada 'Mis Gastos'. El usuario
puede: ver un listado de sus gastos (fecha, monto, categoría, descripción breve) ordenados del más
reciente al más viejo; tocar un gasto para ver su pantalla de detalle completa; agregar un gasto
nuevo con un formulario que valida monto, descripción y categoría; editar o eliminar un gasto
existente desde su detalle; ver una pantalla de resumen con el total gastado y el total agrupado
por categoría. No hay backend real: todo son datos mock en memoria con latencia simulada."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver el listado de gastos (Priority: P1)

Como usuario, al abrir la app quiero ver la lista de mis gastos cargados, ordenados del más
reciente al más viejo, para tener una idea rápida de en qué estoy gastando.

**Why this priority**: Es la pantalla de entrada de la app y la base para todo lo demás. Es el
MVP.

**Independent Test**: Se puede probar sola abriendo la app y verificando que, tras el tiempo de
carga simulado, aparece la lista de gastos mock (o el estado vacío si no hay ninguno cargado).

**Acceptance Scenarios**:

1. **Given** la app recién se abre, **When** el servicio de gastos todavía está resolviendo,
   **Then** se muestra un indicador de carga en lugar de una pantalla en blanco.
2. **Given** el servicio mock devolvió gastos, **When** termina de cargar, **Then** se muestra la
   lista ordenada de más reciente a más viejo, con fecha, monto, categoría y descripción de cada
   gasto.
3. **Given** el servicio mock no tiene gastos cargados, **When** termina de cargar, **Then** se
   muestra un mensaje de estado vacío en lugar de una lista en blanco.

---

### User Story 2 - Agregar un gasto nuevo (Priority: P1)

Como usuario quiero cargar un gasto nuevo completando un formulario, para llevar un registro
actualizado de mis gastos.

**Why this priority**: Sin poder agregar gastos la app no tiene utilidad real; junto con la
User Story 1 forma el flujo mínimo demostrable.

**Independent Test**: Se puede probar sola completando el formulario de alta con datos válidos y
verificando que el gasto nuevo aparece en el listado.

**Acceptance Scenarios**:

1. **Given** el formulario de alta vacío, **When** el usuario intenta guardar sin completar
   monto, descripción o categoría, **Then** se muestra un error de validación por cada campo
   inválido y no se guarda el gasto.
2. **Given** el usuario ingresó un monto no numérico o menor o igual a 0, **When** intenta
   guardar, **Then** se muestra un error específico de monto inválido.
3. **Given** el usuario ingresó una descripción de menos de 3 caracteres, **When** intenta
   guardar, **Then** se muestra un error específico de descripción inválida.
4. **Given** el formulario tiene monto válido, descripción válida y una categoría seleccionada,
   **When** el usuario guarda, **Then** el gasto se agrega y aparece como el primero del listado.

---

### User Story 3 - Ver el detalle de un gasto (Priority: P2)

Como usuario quiero tocar un gasto del listado para ver toda su información en una pantalla
propia.

**Why this priority**: Es el segundo flujo más usado después de ver el listado, y es
prerrequisito para poder editar o eliminar un gasto puntual.

**Independent Test**: Se puede probar sola tocando cualquier gasto del listado y verificando que
se navega a una pantalla con la fecha, el monto, la categoría y la descripción completos de ese
gasto.

**Acceptance Scenarios**:

1. **Given** el listado de gastos visible, **When** el usuario toca un gasto, **Then** se navega
   a la pantalla de detalle de ese gasto específico (no de otro).
2. **Given** la pantalla de detalle recién se abre, **When** el gasto todavía se está buscando en
   el servicio mock, **Then** se muestra un indicador de carga.

---

### User Story 4 - Editar o eliminar un gasto (Priority: P3)

Como usuario quiero poder corregir o borrar un gasto que cargué mal, desde su pantalla de
detalle.

**Why this priority**: Mejora la usabilidad pero la app ya es utilizable sin esto, por eso queda
en tercera prioridad.

**Independent Test**: Se puede probar sola editando un gasto existente y verificando que el
listado refleja los cambios, y por separado eliminando un gasto y verificando que desaparece del
listado.

**Acceptance Scenarios**:

1. **Given** la pantalla de detalle de un gasto, **When** el usuario edita sus datos con valores
   válidos y guarda, **Then** el listado muestra los datos actualizados.
2. **Given** la pantalla de detalle de un gasto, **When** el usuario pide eliminarlo, **Then** se
   pide una confirmación antes de borrarlo definitivamente.
3. **Given** el usuario confirmó la eliminación, **When** vuelve al listado, **Then** el gasto
   eliminado ya no aparece.

---

### User Story 5 - Ver un resumen de gastos con gráfico (Priority: P3)

Como usuario quiero ver el total gastado, el total por categoría y un gráfico de torta, para
entender rápido en qué estoy gastando más.

**Why this priority**: Es información derivada de las otras historias, por lo que se prioriza al
final aunque suma valor de análisis.

**Independent Test**: Se puede probar sola cargando varios gastos de distintas categorías y
verificando que el resumen calcula el total general, el total por cada categoría y que el gráfico
representa esas proporciones correctamente.

**Acceptance Scenarios**:

1. **Given** hay gastos cargados en más de una categoría, **When** el usuario abre la pantalla de
   resumen, **Then** ve el total general, un total independiente por cada categoría con gastos, y
   un gráfico de torta con una porción por categoría.
2. **Given** no hay ningún gasto cargado, **When** el usuario abre la pantalla de resumen,
   **Then** ve un estado vacío en lugar de totales o gráfico en cero sin contexto.

---

### User Story 6 - Ver los gastos en un calendario (Priority: P4)

Como usuario quiero ver un calendario mensual con los días que tienen gastos marcados, y tocar un
día para ver los gastos de esa fecha puntual.

**Why this priority**: Es una forma alternativa de explorar los mismos datos que ya existen desde
el listado; no es indispensable para el flujo principal, por eso queda última en prioridad.

**Independent Test**: Se puede probar sola cargando gastos en distintas fechas del mes actual y
verificando que el calendario marca esos días, y que tocar uno muestra únicamente los gastos de
esa fecha.

**Acceptance Scenarios**:

1. **Given** hay gastos cargados en distintos días del mes, **When** el usuario abre el
   calendario, **Then** ve marcados únicamente los días que tienen al menos un gasto.
2. **Given** el calendario visible, **When** el usuario toca un día marcado, **Then** ve la lista
   de los gastos cargados en esa fecha específica.
3. **Given** el usuario toca un día sin gastos, **When** se muestra la selección, **Then** ve un
   estado vacío para ese día en lugar de una lista en blanco.

---

### User Story 7 - Crear categorías propias (Priority: P4)

Como usuario quiero poder crear mis propias categorías además de las que ya vienen predefinidas,
para clasificar gastos que no encajan bien en ninguna de las existentes.

**Why this priority**: Las categorías predefinidas cubren la mayoría de los casos de uso; crear
categorías propias es una mejora de personalización, no un bloqueante del flujo principal.

**Independent Test**: Se puede probar sola creando una categoría nueva con nombre/color/emoji y
verificando que aparece disponible para elegir al cargar un gasto.

**Acceptance Scenarios**:

1. **Given** la pantalla de categorías, **When** el usuario crea una categoría con un nombre, un
   color y un emoji válidos, **Then** la nueva categoría queda disponible en el selector del
   formulario de gastos.
2. **Given** el usuario intenta crear una categoría sin nombre, **When** intenta guardar, **Then**
   se muestra un error de validación y no se crea la categoría.
3. **Given** dos categorías con el mismo nombre (ignorando mayúsculas/espacios), **When** el
   usuario intenta crear la segunda, **Then** se rechaza para evitar duplicados confusos.

### Edge Cases

- ¿Qué pasa si el usuario borra el único gasto que había? El listado y el resumen deben volver al
  estado vacío correctamente, sin quedar mostrando datos viejos.
- ¿Qué pasa si el usuario intenta guardar el formulario varias veces rápido (doble tap)? No debe
  crear gastos duplicados.
- ¿Qué pasa si el monto ingresado tiene decimales (por ejemplo 1500.50)? Debe aceptarse como
  válido.
- ¿Qué pasa si el usuario navega al detalle de un gasto que ya no existe (id inválido)? Debe
  volver al listado en lugar de mostrar una pantalla rota.
- ¿Qué pasa si se elimina el último gasto de una categoría recién creada? La categoría sigue
  existiendo (solo se borra el gasto, no la categoría) y sigue disponible para usar de nuevo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST mostrar un listado de gastos ordenado del más reciente al más
  viejo.
- **FR-002**: El sistema MUST mostrar un estado de carga mientras el listado de gastos se está
  obteniendo del servicio mock.
- **FR-003**: El sistema MUST mostrar un estado vacío cuando no haya ningún gasto cargado.
- **FR-004**: Los usuarios MUST poder tocar un gasto del listado para navegar a su pantalla de
  detalle.
- **FR-005**: El sistema MUST mostrar en el detalle la fecha, el monto, la categoría y la
  descripción completa del gasto seleccionado.
- **FR-006**: Los usuarios MUST poder agregar un gasto nuevo mediante un formulario con los
  campos monto, descripción y categoría.
- **FR-007**: El sistema MUST validar que el monto sea numérico y mayor a 0 antes de permitir
  guardar.
- **FR-008**: El sistema MUST validar que la descripción tenga al menos 3 caracteres antes de
  permitir guardar.
- **FR-009**: El sistema MUST requerir que se seleccione una categoría (predefinida o creada por
  el usuario) antes de permitir guardar un gasto.
- **FR-010**: Los usuarios MUST poder editar los datos de un gasto existente desde su pantalla de
  detalle, con las mismas validaciones que el alta.
- **FR-011**: Los usuarios MUST poder eliminar un gasto existente desde su pantalla de detalle,
  previa confirmación.
- **FR-012**: El sistema MUST mostrar una pantalla de resumen con el total general gastado, el
  total agrupado por cada categoría, y un gráfico de torta con esas proporciones.
- **FR-013**: El sistema MUST obtener y modificar los datos exclusivamente a través de una capa
  de servicios mock con latencia artificial de 500–1000 ms; no debe existir ninguna llamada a un
  backend real.
- **FR-014**: El sistema MUST ofrecer una pantalla de calendario que marque los días con al menos
  un gasto cargado, y muestre los gastos de un día al tocarlo.
- **FR-015**: Los usuarios MUST poder crear categorías nuevas (nombre, color, emoji) además de
  las predefinidas, desde una pantalla dedicada.
- **FR-016**: El sistema MUST rechazar la creación de una categoría sin nombre o con un nombre
  duplicado (ignorando mayúsculas y espacios) respecto a una categoría existente.

### Key Entities

- **Gasto**: representa un movimiento de dinero cargado por el usuario. Atributos: identificador
  único, monto (número positivo), descripción (texto corto), id de categoría (referencia a una
  `Categoria`), fecha de creación.
- **Categoria**: representa un tipo de gasto. Atributos: identificador único, nombre, color
  (para chips y gráficos), emoji. Existen categorías predefinidas cargadas de fábrica y
  categorías creadas por el usuario; ambas se tratan igual una vez creadas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que nunca vio la app puede entender el listado y cargar su primer gasto
  en menos de 1 minuto sin ayuda externa.
- **SC-002**: El 100% de los intentos de guardar un gasto con datos inválidos (monto no numérico
  o ≤ 0, descripción de menos de 3 caracteres, sin categoría seleccionada) es rechazado con un
  mensaje de error específico por campo.
- **SC-003**: El 100% de las pantallas que dependen de datos del servicio mock muestran un
  indicador de carga visible mientras esperan la respuesta, sin mostrar una pantalla en blanco.
- **SC-004**: El total mostrado en la pantalla de resumen coincide siempre con la suma real de
  los montos de los gastos cargados en ese momento.

## Fuera de Alcance

- Login, registro o manejo de múltiples usuarios: la app es de un único usuario local.
- Backend real, sincronización en la nube o acceso multi-dispositivo.
- Persistencia obligatoria: `AsyncStorage` queda como mejora opcional; si no se implementa, los
  datos se reinician al cerrar la app.
- Tendencias históricas o comparación entre meses/años (el gráfico es una torta del estado
  actual, no una serie temporal).
- Soporte multi-moneda o conversión de moneda.
- Edición o eliminación de categorías existentes (predefinidas o creadas): solo se permite
  **crear** categorías nuevas, no editar ni borrar las existentes, para no dejar gastos
  huérfanos apuntando a una categoría que ya no existe.

## Assumptions

- No hay usuarios ni autenticación: se asume un único usuario local por dispositivo.
- Los datos viven en memoria durante la sesión de la app; no se garantiza que persistan al cerrar
  la app salvo que se implemente la mejora opcional con `AsyncStorage`.
- No se requiere conexión a internet porque no existe backend real.
- Existe un conjunto de categorías predefinidas de fábrica, y el usuario puede sumar categorías
  propias; ambas conviven en la misma lista sin distinción visual obligatoria.
