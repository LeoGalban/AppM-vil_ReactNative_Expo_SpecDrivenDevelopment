# Documento del Proceso — Mis Gastos

Trabajo Práctico N.° 1 — Taller Complementario React Native II. Desarrollo de un prototipo con
Spec-Driven Development (SDD).

Integrante/s: _(completar nombre y apellido)_

---

## 1. Investigación

> Responder cada pregunta con palabras propias, citando las fuentes consultadas (link o
> referencia). No copiar texto tal cual de ningún lado: se comparte en una puesta en común oral.

### React Native

**¿Qué es y qué problema resuelve? ¿Cómo logra que código JavaScript termine mostrando
componentes nativos en el teléfono?**

_(completar)_

**¿En qué se diferencia del desarrollo nativo puro (Kotlin/Swift) y de las apps híbridas basadas
en web (Ionic, PWA)? Ventajas y desventajas de cada enfoque.**

_(completar)_

**Nombren 3 apps conocidas construidas con React Native.**

_(completar)_

**Fuentes:**
_(completar)_

---

### Expo

**¿Qué agrega Expo sobre React Native "pelado"? ¿Qué es Expo Go y por qué facilita probar en el
teléfono?**

_(completar)_

**¿Qué es `expo-router` y cómo maneja la navegación?**

_(completar)_

**¿Cuándo conviene usar Expo y qué limitaciones tiene?**

_(completar)_

**Fuentes:**
_(completar)_

---

### SDD — Spec-Driven Development

**¿Qué es el desarrollo guiado por especificaciones y por qué apareció junto con los agentes de
IA? ¿Qué es el "vibe coding" y qué problemas trae?**

_(completar)_

**¿Cuál es el flujo típico de SDD? (reglas del proyecto → especificación → plan técnico → tareas
→ implementación)**

_(completar)_

**¿Qué herramientas existen? (GitHub Spec Kit y una alternativa, por ejemplo Kiro). ¿Con qué
agentes de IA funcionan?**

_(completar)_

**Fuentes:**
_(completar)_

---

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

_(completar por cada tarea de `tasks.md`: prompt utilizado, qué generó la IA, qué se corrigió a
mano, cómo se verificó en el teléfono, y el commit correspondiente)_

| Tarea | Prompt usado | Qué generó la IA | Qué se corrigió | Verificación |
|---|---|---|---|---|
| | | | | |

---

## 5. Conclusiones

_(completar al final: qué aprendieron sobre desarrollar con IA — qué funcionó, qué no, qué harían
distinto)_
