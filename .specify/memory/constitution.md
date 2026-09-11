<!--
Sync Impact Report
- Version change: (template) → 1.0.0
- Modified principles: N/A (initial ratification)
- Added sections: Core Principles (5), Requisitos Técnicos, Flujo de Trabajo, Governance
- Removed sections: none
- Follow-up TODOs: ninguno
-->

# Mis Gastos Constitution

## Core Principles

### I. Stack fijo, sin backend
El proyecto usa Expo (SDK 57) + React Native + expo-router + TypeScript. No existe backend real:
todos los datos provienen de una capa de mocks. No se agregan librerías de estado globales
(Redux, Zustand, etc.) ni backend-as-a-service mientras el prototipo cumpla los requisitos con
`useState`/`useContext` y los servicios mock. Justificación: el objetivo de la actividad es
aprender SDD y React Native, no evaluar arquitecturas de backend.

### II. Código explicable (NON-NEGOTIABLE)
Todo el código que se commitea debe poder ser explicado línea por línea por cualquiera de los
integrantes. Se prioriza código simple y legible sobre código "inteligente" o abstracciones
prematuras. Justificación: la defensa oral es individual y eliminatoria; código no entendido es
código no aprobado.

### III. Mocks como si fueran red real
Los datos viven en `services/`: funciones `async` que devuelven datos tras una latencia
artificial (500–1000 ms) simulando un pedido de red, incluyendo casos de éxito y de lista vacía.
La UI nunca importa datos hardcodeados directamente: siempre pasa por `services/`. Justificación:
obliga a manejar estados de carga/vacío/error desde el día uno y deja el proyecto listo para
reemplazar los mocks por un backend real sin tocar las pantallas.

### IV. Español en código y commits
Nombres de variables, funciones, componentes, comentarios y mensajes de commit se escriben en
español (identificadores en `camelCase`/`PascalCase` sin tildes, comentarios y mensajes de commit
con tildes normales). Justificación: consistencia con el resto de la materia y con el documento
del proceso.

### V. Una tarea por vez
No se escribe código que no corresponda a una tarea de `tasks.md`. Cada tarea se implementa, se
prueba en un teléfono real con Expo Go, y se commitea por separado con un mensaje que referencia
el id de la tarea (`feat: T07 - pantalla de detalle de gasto`). Justificación: mantiene el
historial de Git como evidencia del proceso.

## Requisitos Técnicos

- Navegación con `expo-router` (mínimo 4 pantallas navegables entre sí).
- Un listado de elementos (gastos) cargado desde mocks, con pantalla de detalle propia.
- Un formulario de alta/edición con validación de campos (montos numéricos positivos, campos
  obligatorios, categoría seleccionada de una lista cerrada).
- Manejo explícito de estados de carga (`loading`) y vacío (`empty`) en cada pantalla que
  consume un servicio async; manejo básico de error cuando el mock lo simule.
- Persistencia local con `AsyncStorage` es opcional; si se agrega, debe quedar encapsulada
  dentro de `services/`, nunca llamada directamente desde los componentes de pantalla.
- La app debe correr en un teléfono real vía Expo Go, no solo en el emulador.

## Flujo de Trabajo

- Se sigue el flujo SDD de Spec Kit: `constitution` → `specify` → `plan` → `tasks` →
  `implement`, en ese orden.
- Cada tarea completada se prueba en el dispositivo antes de darse por cerrada.
- El documento del proceso (`PROCESO.md`) se actualiza en el momento en que se completa cada
  etapa.
- Ambos integrantes commitean su propio trabajo; el historial de Git debe reflejar quién hizo qué.

## Governance

Esta constitución prevalece sobre preferencias individuales de estilo no documentadas aquí.
Cualquier cambio a estos principios se hace exclusivamente a través del comando/skill
`speckit-constitution`, y debe incrementar la versión según semver: MAJOR para eliminar o
redefinir principios, MINOR para agregar principios o secciones, PATCH para aclaraciones de
redacción.

**Version**: 1.0.0 | **Ratified**: 2026-09-11 | **Last Amended**: 2026-09-11
