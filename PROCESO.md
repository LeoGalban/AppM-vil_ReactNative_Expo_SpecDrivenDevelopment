# Documento del Proceso — Mis Gastos

Trabajo Práctico N.° 1 — Taller Complementario React Native II. Desarrollo de un prototipo con
Spec-Driven Development (SDD).

Integrante: Leonel Rolando Galban Rojas

## 1. Investigación



### React Native

**¿Qué es y qué problema resuelve? ¿Cómo logra que código JavaScript termine mostrando componentes nativos en el teléfono?**

_React Native (creado por Facebook/Meta) te deja escribir la interfaz en JavaScript/TypeScript con la sintaxis de React, pero en vez de renderizar HTML, traduce esos componentes a componentes nativos reales de iOS y Android. El problema que resuelve: antes había que escribir y mantener dos apps separadas (una en Kotlin/Java para Android, otra en Swift/Objective-C para iOS). Con RN se comparte la mayor parte del código.

Cómo funciona técnicamente:el código JS corre en un motor JavaScript (Hermes, el que usa Expo por defecto) separado del hilo nativo. Antes se comunicaban por un "Bridge" asíncrono serializando JSON; la arquitectura actual se llama New Architecture, y usa JSI (JavaScript Interface) para que JS y código nativo se llamen directamente sin ese bridge, más Fabric (el renderer nuevo) y TurboModules (módulos nativos que se cargan bajo demanda)_

**¿En qué se diferencia del desarrollo nativo puro (Kotlin/Swift) y de las apps híbridas basadas en web (Ionic, PWA)? Ventajas y desventajas de cada enfoque.**

*Nativo puro: máximo rendimiento y acceso total al SDK del sistema operativo, pero hay que escribir y mantener dos códigos distintos (más tiempo/costo).
*Híbridas basadas en web (Ionic, PWA): renderizan HTML/CSS dentro de un WebView; se comparte casi el 100% del código, pero la UI no es nativa de verdad (se siente "como una página web"), y el acceso a hardware suele depender de plugins.
*React Native: intermedio — componentes nativos reales (buena performance y sensación nativa) con un solo código base para ambas plataformas, aunque para funciones muy específicas del hardware a veces hay que escribir un módulo nativo puntual.

3 apps conocidas hechas con React Native: Instagram, Discord y Shopify son ejemplos documentados oficialmente.

**Nombren 3 apps conocidas construidas con React Native.**

*Instagram
*Dicord
*Shopify


**Fuentes:**
 https://reactnative.dev/architecture/overview
 https://reactnative.dev/showcase


### Expo

Expo es un conjunto de herramientas y servicios sobre React Native: CLI, un runtime con APIs ya listas (cámara, notificaciones, sensores, etc. vía paquetes expo-*), y sobre todo Expo Go, una app movil con el motor de React Native precompilado adentro. Gracias a eso, para probar las app no hace falta compilar nada nativo (no necesitás Android Studio ni Xcode) — Expo Go descarga el código JS por Wi-Fi y lo ejecuta al instante.

**¿Qué es `expo-router` y cómo maneja la navegación?**

Es el sistema de navegación oficial de Expo, basado en enrutamiento por archivos: cada archivo dentro de la carpeta app/ se convierte automáticamente en una pantalla y en una ruta navegable, sin tener que declarar manualmente cada Stack.Screen. Por ejemplo, app/gasto/[id].tsx genera una ruta dinámica /gasto/123. Está construido sobre React Navigation por debajo.

**¿Cuándo conviene usar Expo y qué limitaciones tiene?**

Conviene para la gran mayoría de apps  porque acelera muchísimo el desarrollo y el testing. La limitación aparece cuando necesitás un módulo nativo muy específico que no está en el SDK de Expo ni tiene versión compatible: ahí Expo Go ya no alcanza y hay que generar un "development build" propio, lo cual complica un poco el flujo (aunque sigue siendo mucho más simple que React Native puro).

**Fuentes:**
https://docs.expo.dev/get-started/set-up-your-environment/ y https://docs.expo.dev/more/glossary-of-terms/#expo-go
https://docs.expo.dev/router/introduction/
https://docs.expo.dev/faq/


### SDD — Spec-Driven Development

**¿Qué es el desarrollo guiado por especificaciones y por qué apareció junto con los agentes de IA? ¿Qué es el "vibe coding" y qué problemas trae?**

SDD es una metodología donde la especificación (qué hay que construir) se escribe antes y de forma tan precisa que se convierte en la fuente de verdad que guía el plan, las tareas y finalmente el código — en vez de que el código sea lo único que documenta qué hace el sistema. Apareció con fuerza junto a los agentes de IA porque estos pueden generar código muy rápido, pero sin una spec clara tienden a inventar alcance, tomar decisiones arbitrarias o perder de vista los requisitos originales.

"Vibe coding" es el término (popularizado en 2025) para pedirle a una IA que programe algo "a ojo", iterando por sensación sin specs ni revisión seria del código generado. El problema: se obtiene algo que funciona a corto plazo pero que nadie del equipo entiende del todo, es difícil de mantener, puede tener bugs de seguridad ocultos, y no hay forma de auditar por qué se tomó cada decisión.


**¿Cuál es el flujo típico de SDD? (reglas del proyecto → especificación → plan técnico → tareas → implementación)**

Flujo típico de SDD: reglas del proyecto (constitution) → especificación (spec, el qué) → plan técnico (el cómo) → tareas (pasos chicos verificables) → implementación. Spec Kit le agrega un sexto paso, "converge", para revisar que el código final siga alineado con la spec.

**¿Qué herramientas existen? (GitHub Spec Kit y una alternativa, por ejemplo Kiro). ¿Con qué agentes de IA funcionan?**

GitHub Spec Kit: toolkit open source de GitHub, se usa como CLI (specify) que agrega comandos/skills a más de 30 agentes de IA distintos (Claude Code, GitHub Copilot, Cursor, Gemini CLI, etc.).
Kiro: es de AWS, un IDE/plataforma agéntica propia que integra specs, "hooks" (automatizaciones) y "steering" (reglas persistentes del proyecto) directamente en su flujo, con validación de código mediante tests basados en propiedades.

**Fuentes:**
https://github.com/github/spec-kit
 https://github.com/github/spec-kit 
 https://kiro.dev/


### Agentes de código y skills

**¿Qué es un agente de código (Claude Code, GitHub Copilot, Cursor, Gemini CLI) y en qué se
diferencia de un chat común?**

_(completar)_

**¿Para qué sirven los archivos de contexto como `AGENTS.md` o `CLAUDE.md`?**

_(completar)_

**¿Qué son las skills de un agente? ¿Dónde se consiguen skills hechas por la comunidad y cómo se
instalan?**

_(completar)_

**Fuentes:**
_(completar)_

---

### Mocks

**¿Qué es un mock y por qué permite desarrollar un frontend completo sin tener backend?**

_(completar)_

**¿Qué estrategias hay en React Native? (JSON estático, servicio simulado con `Promise` +
`setTimeout`, `AsyncStorage`)**

_(completar)_

**Fuentes:**
_(completar)_

---

## 2. Especificación y planificación (SDD)

_(completar cuando se generen la constitution, el spec.md, el plan.md y el tasks.md: idea
original, prompts usados, qué propuso la IA, qué se corrigió y por qué)_

---

## 3. Preparar el entorno (Setup)

### Instalación de herramientas

- Node.js, npm y git ya estaban instalados en el equipo (`node v24.19.0`, `npm 11.17.0`,
  `git 2.55.0`).
- Se creó el proyecto con:
  ```powershell
  npx create-expo-app@latest mis-gastos-tmp --template blank-typescript@54
  ```
  Se usó una carpeta temporal porque el nombre real del repositorio tiene tildes/espacios, algo
  que `create-expo-app` no acepta como nombre de proyecto; después se movió el contenido a la
  carpeta definitiva.

### Incidente: incompatibilidad de SDK con Expo Go en iOS

- El proyecto se creó pineado en **SDK 54** (siguiendo la documentación oficial de Expo para fijar
  una versión específica: `--template blank-typescript@54`).
- Al escanear el QR con Expo Go en un iPhone, apareció el error *"Project is incompatible with
  this version of Expo Go"*: la Expo Go de la App Store solo soporta la **última versión del SDK**
  (en ese momento, SDK 57) y Apple no permite instalar versiones anteriores en paralelo, a
  diferencia de Android.
- **Corrección**: se actualizó el proyecto a SDK 57 con el flujo oficial de actualización de Expo:
  ```powershell
  npm install expo@^57.0.0
  npx expo install --fix
  npx expo-doctor
  ```
  `expo-doctor` detectó campos obsoletos en `app.json` heredados de la plantilla SDK 54
  (`newArchEnabled`, `splash`, `android.edgeToEdgeEnabled`, ya no válidos en SDK 57) y se
  corrigieron a mano hasta que los 21 checks pasaron.
- **Segundo incidente**: al correr `npx expo start`, apareció el error *"You need to be signed in
  to Expo Go and Expo CLI to open your project"*. Causa: el celular tenía Expo Go logueado con una
  cuenta, y el enlace abierto (vía la app Cámara) quedaba asociado a esa cuenta, exigiendo que la
  terminal también estuviera logueada. Se resolvió corriendo `npx expo login` en la terminal con la
  misma cuenta del celular.

### Git

- `create-expo-app` inicializa un repositorio git automáticamente al crear el proyecto.
- Se conectó al repositorio remoto:
  ```powershell
  git remote add origin https://github.com/LeoGalban/AppM-vil_ReactNative_Expo_SpecDrivenDevelopment.git
  git push -u origin main
  ```

### Verificación en dispositivo

- Captura de la app base corriendo en el teléfono: _(completar — agregar imagen)_

### Skills instaladas

_(completar cuando se reinstale GitHub Spec Kit: qué skills se agregaron y por qué)_

---

## 4. Desarrollo guiado por tareas

_(completar el detalle de verificación en el teléfono de cada fila; el resto ya está)_

| Tarea | Qué generó la IA | Qué se corrigió | Verificación |
|---|---|---|---|
| T001–T004 (Setup) | Instalación de `expo-router` y dependencias; `main` en `expo-router/entry`; `app/_layout.tsx` con `Stack`; `types/gasto.ts`; lista inicial de categorías fijas | Sin correcciones | `npx tsc --noEmit` sin errores. _(completar: prueba en teléfono)_ |
| T005–T006 (Foundational) | `services/gastosService.ts` con 3 gastos mock y `listarGastos()` con latencia 500–1000ms; `EstadoCarga` y `EstadoVacio` | Sin correcciones | _(completar)_ |
| T007–T008 (US1 - Listado) | `TarjetaGasto.tsx`; `app/index.tsx` con estados carga/vacío/datos y `FlatList` | Se agregó `useFocusEffect` para refrescar la lista al volver de otra pantalla (no estaba en el plan original) | _(completar)_ |
| Diseño visual | Paleta en `constants/colores.ts`, color+emoji por categoría, rediseño de `TarjetaGasto`, `EstadoCarga`, `EstadoVacio` y header del `Stack` | A pedido, sin librerías nuevas (solo emojis, sin `@expo/vector-icons`) | _(completar)_ |
| T009–T012 (US2 - Agregar gasto) | `crearGasto` en el servicio; `FormularioGasto.tsx` con validación de monto/descripción/categoría; `app/nuevo.tsx`; botón "+" en el header | Sin correcciones | _(completar)_ |
| T013–T015 (US3 - Detalle) | `obtenerGasto` en el servicio; `app/gasto/[id].tsx` (vista de detalle); navegación desde `TarjetaGasto` | Sin correcciones | _(completar)_ |
| T016–T018 (US4 - Editar/eliminar) | `editarGasto` y `eliminarGasto` en el servicio; modo edición reutilizando `FormularioGasto` dentro de `app/gasto/[id].tsx`; botón eliminar con `Alert.alert` de confirmación | Sin correcciones | _(completar)_ |
| T019–T020b (US5 - Resumen) | `app/resumen.tsx` con total general, barras por categoría y gráfico `PieChart` de `react-native-chart-kit` | Sin correcciones | _(completar)_ |
| T025–T030 (Refactor categorías) | `Categoria` pasa de string fijo a entidad `{id, nombre, color, emoji}`; `Gasto.categoria` → `Gasto.categoriaId`; `categoriasService.ts`; `SelectorCategoria.tsx`; se actualizaron `FormularioGasto`, `TarjetaGasto`, `index`, `nuevo`, `gasto/[id]` y `resumen` para resolver la categoría por id | Ampliación pedida a mitad de proyecto: se actualizó `spec.md` (nuevas US6/US7, se sacó "gráficos"/"categorías fijas" de Fuera de Alcance) antes de tocar código | _(completar)_ |
| T031–T034 (US6 - Calendario) | `app/calendario.tsx` con `react-native-calendars`: marca los días con gastos, toca un día → lista de gastos de esa fecha | Sin correcciones | _(completar)_ |
| T035–T038 (US7 - Categorías propias) | `app/categorias.tsx`: lista categorías + formulario para crear una nueva (nombre, color de paleta, emoji de una lista fija), con validación de nombre vacío/duplicado | Sin correcciones | _(completar)_ |

**Nota**: T021 (revisión de UX), T022 (AsyncStorage opcional) y T024 (capturas finales) quedan
pendientes. T023 (AGENTS.md real) sigue pendiente.

**Sobre la ampliación de alcance**: la app arrancó con el alcance mínimo de la consigna (listado,
alta, detalle, resumen simple). A mitad del desarrollo se pidió ampliarla (más categorías,
calendario visual, gráfico real, categorías creadas por el usuario) para que se sienta como una
app real y no solo un prototipo mínimo. Se optó por actualizar `spec.md`/`plan.md`/`tasks.md`
*antes* de programar, siguiendo la regla de oro de SDD, en vez de agregar funcionalidad
directamente sin dejarlo documentado.

---

## 5. Conclusiones

_(completar al final: qué aprendieron sobre desarrollar con IA — qué funcionó, qué no, qué harían
distinto)_
