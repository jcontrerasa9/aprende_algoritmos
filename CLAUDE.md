# Aprende Algoritmos: contexto del proyecto

Este archivo resume las decisiones tomadas con la IA en la sesión de planeación (oct. 2026) y define cómo debe actuar la IA en este proyecto. Claude Code lo carga automáticamente; cualquier otra IA debería leerlo antes de empezar.

## Qué es el proyecto

Una **aplicación web de visualizaciones interactivas** para aprender **Estructuras de Datos** y **Análisis y Diseño de Algoritmos (ADA)**, dirigida a estudiantes de semestres más bajos de la universidad.

El núcleo son **diagramas y figuras interactivas**:
- Cómo funciona un algoritmo **paso a paso** (animación con reproductor).
- Cómo se comporta un algoritmo **a medida que crece n** (gráfica de operaciones vs n, comparada con curvas teóricas como n², n log n).
- En estructuras de datos, **cómo se almacena la información** (pilas, colas, listas, árboles, heaps, hash, grafos).

No es un sitio de apuntes ni de documentación. Los cursos se programan en **Python y C++**, así que el código de cada algoritmo se muestra en ambos lenguajes.

### Material de referencia del autor

El autor tiene material de esos cursos (PDF y PPTX). Ese material **no es el contenido de la página**: sirve como referencia para saber qué temas, estructuras y enfoques usan los profesores, y cómo los enseñan. No se copia tal cual, por derechos de autor, y no se publican soluciones de parciales ni de talleres, por integridad académica.

## Objetivo personal del autor

Es un **proyecto personal para aprender** y ganar experiencia: aprender un stack útil en la industria y construir algo para el portafolio. **Sin sobreingeniería**: siempre la solución más simple que cumpla, con un alcance claro y por fases.

El autor no conocía de antemano los frameworks ni las herramientas mencionadas aquí. Explica los conceptos nuevos de forma breve y clara.

## Rol de la IA (cómo debe actuar)

1. **Mentor, no solo generador de código.** El objetivo principal es que el autor aprenda.
2. **División del trabajo acordada:**
   - La IA hace lo que no enseña nada: configuración, archivos de arranque y boilerplate.
   - En cada hito, la IA **explica primero el concepto** (qué es un generador, qué es un hook, etc.) y **propone tipos o firmas** de funciones.
   - **El autor escribe la implementación** y **la IA la revisa**: qué está bien, qué mejorar y por qué.
   - Si el autor se atasca, la IA da **pistas antes que la solución**.
   - El balance se puede ajustar: más guiado al inicio y más autónomo después, o la IA escribe un ejemplo completo (bubble sort) y el autor replica el patrón.
3. **Explicar el porqué** de cada decisión de diseño, no solo el qué.
4. **Respuestas claras y concisas**, en **español**.
5. **Comandos:** cuando sirva para aprender, dárselos al autor para que los corra él, explicando qué hace cada parte.
6. **No agregar dependencias, capas ni abstracciones** que el hito actual no necesite.
7. Respetar el flujo de Git descrito abajo: nunca trabajar directo en `main` después del commit inicial.

## Stack decidido

| Pieza | Uso | Cuándo |
|---|---|---|
| **React + TypeScript + Vite** | Base de la app | Desde el inicio |
| **ESLint** | Linter (elegido al crear el proyecto) | Desde el inicio |
| **Vitest** | Pruebas unitarias de los algoritmos | Hito 0 |
| **CSS Modules** | Estilos (Tailwind quizá más adelante) | Desde el inicio |
| **SVG dibujado con React** | Visualizaciones (sin D3 al inicio) | Hito 2 |
| **Motion** (antes Framer Motion) | Animar transiciones | Solo si hace falta |
| **Recharts** | Gráfica de operaciones vs n | Hito 6 |
| **React Router** | Varias páginas | Hito 7 |
| **Vercel** | Hosting gratis, previews por PR, funciones serverless | Hito 0 |

Descartados: Astro, Starlight, MkDocs y Docusaurus, porque son para sitios de documentación y esto es una app.

## Arquitectura

### Estructura de carpetas (fase 1)

```
src/
├── algorithms/            ← lógica pura, NO importa nada de React
│   ├── types.ts
│   └── sorting/
│       ├── bubbleSort.ts
│       ├── bubbleSort.test.ts
│       ├── mergeSort.ts
│       └── quickSort.ts
├── player/
│   ├── usePlayer.ts       ← hook genérico: paso actual, play/pausa, velocidad
│   └── PlayerControls.tsx
├── visualizers/
│   └── ArrayBars.tsx
├── code/
│   ├── CodeView.tsx       ← pestañas Python/C++ con la línea actual resaltada
│   └── snippets/
├── complexity/
│   ├── measure.ts         ← ejecuta con varios n y cuenta operaciones
│   └── GrowthChart.tsx
├── pages/
│   ├── Home.tsx
│   └── AlgorithmPage.tsx
├── App.tsx
└── main.tsx
```

### Decisiones de diseño clave

1. **Los algoritmos son generadores (`function*`) que emiten eventos, no copias del arreglo.**
   Ejemplo: `yield { type: "compare", i, j }` y `yield { type: "swap", i, j }`.
   Así, medir complejidad con n grande es barato (solo se cuentan eventos). El reproductor aplica los eventos con n pequeño (~20) y guarda los estados, por lo que "paso atrás" es trivial.
2. **Los eventos no conocen números de línea.** Cada snippet (Python o C++) tiene su propio mapa de evento a línea, por ejemplo `{ compare: 4, swap: 5 }`. El algoritmo no sabe cómo se presenta.
3. **El reproductor (`usePlayer`) es genérico.** Recibe una lista de pasos sin importar el algoritmo. Si agregar un algoritmo obliga a cambiar el reproductor, la abstracción falló y hay que replantearla.
4. **`algorithms/` es independiente de React**: se puede probar sola y reusar después, por ejemplo como contexto para el agente de IA.

## Plan por fases

### Fase 1: ordenamientos (actual)

Una página por algoritmo (bubble, merge, quick) con visualización paso a paso, reproductor, código Python/C++ con línea resaltada y gráfica de crecimiento.

| # | Hito | Qué aprende el autor |
|---|---|---|
| 0 | Crear el proyecto, estructura de carpetas, Vitest, CI, Vercel y protección de `main` | Tooling, git, despliegue continuo |
| 1 | `bubbleSort.ts` como generador de eventos + pruebas | TypeScript, tipos, generadores, testing |
| 2 | `ArrayBars`: dibujar un arreglo fijo | Componentes, props, SVG |
| 3 | `usePlayer` + controles: que se anime | `useState`, `useEffect`, hooks propios, timers |
| 4 | `CodeView` con pestañas y línea resaltada | Renderizar listas, estado derivado |
| 5 | Merge sort y quick sort | Poner a prueba la abstracción y refactorizar |
| 6 | `measure.ts` + `GrowthChart` | Análisis empírico vs teórico, gráficas |
| 7 | Rutas y página de inicio | React Router |

### Fase 2: estructuras de datos y grafos

Pila/cola, lista enlazada, BST/AVL, heap, tabla hash, grafos con BFS/DFS/Dijkstra. Temas de ADA: recurrencias, divide y vencerás, voraces, programación dinámica (por ejemplo, la tabla de DP llenándose).

### Fase 3: agente de IA

Un asistente que responde dudas sobre el algoritmo o la estructura que se está estudiando.
- Requiere una **función serverless** mínima (Vercel Functions o Cloudflare Workers), porque la API key **nunca** puede ir en el navegador.
- Se le envía como contexto **qué algoritmo se está viendo y en qué paso va** el estudiante.
- Hay que considerar el costo por pregunta y poner un límite de uso.

Ideas para después: Python ejecutable en el navegador con Pyodide; para C++, un botón que abra el código en Compiler Explorer (godbolt.org) u OnlineGDB.

## Flujo de Git y GitHub (GitHub Flow)

- Repo: `git@github.com:jcontrerasa9/aprende_algoritmos.git`, con el remoto llamado `origin` y la rama principal `main`.
- `main` siempre funciona y está siempre desplegada. **Solo el commit inicial va directo a `main`.**
- Una rama corta por hito o cambio, con prefijo: `feat/...`, `fix/...`, `chore/...`.
- **Siempre por Pull Request**, aunque se trabaje solo. En el PR:
  - Vercel genera una URL de preview.
  - GitHub Actions corre lint, chequeo de tipos (`tsc`) y pruebas.
  - La IA revisa el código como un compañero de equipo.
- Mezclar con **Squash and merge** y borrar la rama.
- **Conventional Commits**: `feat: ...`, `fix: ...`, `test: ...`, `refactor: ...`, `chore: ...`, en imperativo. Elegir un idioma y mantenerlo; se recomendó inglés por el portafolio.
- Un commit = un cambio lógico.
- Opcional: un issue por hito (el PR lo cierra con `Closes #N`), un milestone "Fase 1" y protección de `main` (solo vía PR con checks en verde).

## Estado actual (28 oct. 2026)

- Repo de GitHub creado y enlazado. El remoto se renombró de `main` a `origin` y la rama de `master` a `main`.
- Entorno: Node 24, npm 11 y `gh` CLI instalados.
- **Hito 0, paso 0.1 en curso:** el proyecto ya se generó con `npm create vite@latest . -- --template react-ts`, con ESLint como linter.
  - Pendiente: `npm install`, verificar que corre con `npm run dev` (http://localhost:5173).
  - Después, explicarle al autor qué es cada archivo generado.
  - Luego, hacer el **commit inicial directo en `main`** y el primer `push`.
- Siguientes pasos del hito 0:
  - 0.2: rama `chore/setup` para crear la estructura de carpetas, agregar Vitest y limpiar la plantilla de Vite. Primer PR.
  - 0.3: GitHub Action con lint, tipos y pruebas, en el mismo PR.
  - 0.4: conectar Vercel y proteger `main`.

Mantener esta sección actualizada al terminar cada hito.
