# Panel de Métricas Académicas — IS093A Semana 5

**Asignatura:** Desarrollo de Aplicaciones Web (IS093A)
**Universidad:** UNCP — Facultad de Ingeniería de Sistemas
**Tema:** HTML5, CSS3, React, Flexbox/Grid, Diseño Responsivo, CSR y SEO

## Integrantes

| N° | Apellidos y Nombres |
|----|---------------------|
| 1  | Poves Martinez, Alessandro Piero |
| 2  | Sulluchuco Vilcapoma, Anyelo Roberto |
| 3  | Egoavil Huaman, Cristhian Rudolf |
| 4  | Huaynate Curiñaupa, Angel Mitch |

---

## Descripción del Proyecto

SPA (Single Page Application) con **Client-Side Rendering (CSR)** que muestra un panel
de métricas académicas de la UNCP. El `index.html` llega al navegador sin métricas
renderizadas — React hidrata el DOM tras cargar el bundle JS.

---

## Tecnologías

| Tecnología        | Uso                                      |
|-------------------|------------------------------------------|
| React 18          | Componentes y flujo unidireccional       |
| Vite 5            | Bundler, dev server y code splitting     |
| JSX               | Sintaxis declarativa de componentes      |
| CSS Modules       | Estilos con scope aislado por componente |
| PropTypes         | Validación de props en tiempo de ejecución |
| JSDoc             | Documentación de tipos en App.jsx        |

---

## Estructura de Carpetas

```
semana5-practica2/
├── index.html                        (solo <div id="root"> — CSR puro)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                      (punto de entrada, ReactDOM.createRoot)
    ├── App.jsx                       (orquestador, define metricsData)
    ├── index.css                     (variables CSS globales + reset)
    ├── components/
    │   ├── Dashboard.jsx             (grid de tarjetas, acepta children)
    │   ├── MetricCard.jsx            (tarjeta individual con inline style dinámico)
    │   └── StatusBadge.jsx           (badge ↑↓→ con color por trend)
    └── styles/
        ├── Dashboard.module.css
        ├── MetricCard.module.css
        └── StatusBadge.module.css
```

---

## Árbol de Componentes y Flujo de Props

```
<App>
  metricsData[]  ──────────────────────────────────────────────────┐
  │                                                                 │
  └── <Dashboard metrics={metricsData} title="..." children={...}> │
        │                                                           │
        ├── metrics.map() ──> <MetricCard                          │
        │                       key={m.id}                         │
        │                       label={m.label}   ← string         │
        │                       value={m.value}   ← number         │
        │                       unit={m.unit}     ← string         │
        │                       trend={m.trend}   ← 'up'|'down'|'stable'
        │                     >
        │                       └── <StatusBadge trend={trend} />
        │
        └── {children}  ──> <p className="app-footer-note">...</p>
```

**Flujo unidireccional:** Los datos fluyen solo hacia abajo (padre → hijo).
Ningún hijo modifica props recibidas.

---

## Estrategia de Estilado

| Estrategia       | Dónde se usa                              | Por qué                                      |
|------------------|-------------------------------------------|----------------------------------------------|
| **CSS Modules**  | `.card`, `.grid`, `.badge`, etc.    | Scope aislado — Vite genera hashes únicos (_card_1a2b3), sin colisiones globales |
| **Inline style** | `style={{ background: trendColor[trend] }}` en MetricCard | Solo para valores que cambian en runtime (color dinámico por prop) |
| **CSS Global**   | `index.css`: variables `--bg`, `--text`, reset | Layout raíz y design tokens compartidos      |

---

## División del Trabajo Grupal

### Parte 1 — Arquitecto de Proyecto (15%)
**Archivos:** `package.json`, `vite.config.js`, `index.html`, estructura de carpetas

Responsabilidades:
- Scaffold del proyecto con Vite 5 + React 18
- Configuración del alias `@/` → `src/` en `vite.config.js`
- `index.html` mínimo (solo `<div id="root">`) para garantizar CSR puro
- Verificar que `npm run dev` levanta sin errores
- Verificar que `npm run build` genera `dist/` optimizado

---

### Parte 2 — Desarrollador de Componentes (30%)
**Archivos:** `src/App.jsx`, `src/components/Dashboard.jsx`, `src/components/MetricCard.jsx`, `src/components/StatusBadge.jsx`

Responsabilidades:
- `App.jsx`: define el array `metricsData` (6 métricas) y lo pasa como prop a Dashboard
- `Dashboard.jsx`: recibe `metrics` y `children`, itera con `.map()`, renderiza MetricCard con `key` obligatorio
- `MetricCard.jsx`: recibe `{ label, value, unit, trend }`, calcula color dinámico inline, renderiza StatusBadge
- `StatusBadge.jsx`: recibe `trend`, muestra flecha + label con color según estado
- PropTypes completos en todos los componentes
- JSDoc `@typedef` en `App.jsx` para documentar la interfaz de Metric

---

### Parte 3 — Ingeniero de Estilos (20%)
**Archivos:** `src/styles/*.module.css`, `src/index.css`

Responsabilidades:
- `MetricCard.module.css`: `.card` con hover `translateY(-4px)` y `transition 0.2s ease`, layout flex
- `Dashboard.module.css`: grid responsivo `repeat(auto-fill, minmax(220px, 1fr))`
- `StatusBadge.module.css`: tres variantes `.up`, `.down`, `.stable` con colores semánticos
- `index.css`: variables CSS (`--bg`, `--text`, `--primary`), reset y layout global
- Verificar que no haya colisiones de nombres entre módulos (cada clase tiene scope único)

---

### Parte 4 — QA & CSR Validator (35%)
**Archivos:** `README.md` (este archivo), capturas de pantalla

Responsabilidades:
1. Abrir `Ctrl+U` con el servidor corriendo → confirmar que el HTML fuente **no contiene** métricas (solo `<div id="root"></div>`)
2. Instalar React DevTools → inspeccionar árbol de componentes, props en cada nodo, re-renders con StrictMode
3. Captura de la pestaña **Performance** de DevTools mostrando tiempo de hidratación
4. Ejecutar `npm run build` → verificar generación de `dist/` con chunks separados
5. Documentar en este README: diagrama de árbol, comparativa de estilos y reporte CSR

---

## Validación CSR — Checklist

- [ ] `npm run dev` levanta sin errores en consola
- [ ] `Ctrl+U` muestra HTML sin métricas (CSR confirmado)
- [ ] React DevTools muestra árbol: App → Dashboard → MetricCard → StatusBadge
- [ ] Props correctas en cada nodo de DevTools
- [ ] `npm run build` genera `dist/` sin errores
- [ ] Captura de Performance adjunta en el repositorio

---

## CSR vs HTML Estático

| Característica       | CSR (este proyecto)                        | SSR / HTML Estático               |
|----------------------|--------------------------------------------|-----------------------------------|
| HTML inicial         | Solo `<div id="root">`                  | Contenido renderizado             |
| Tiempo al primer byte| Rápido (HTML vacío)                        | Más lento (servidor procesa)      |
| Tiempo a interactivo | Más lento (espera JS)                      | Más rápido                        |
| SEO                  | Depende de meta tags estáticos             | Mejor soporte nativo              |
| Verificación         | `Ctrl+U` no muestra métricas            | `Ctrl+U` muestra contenido      |

---

## Instalación y Ejecución

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # previsualiza el build
```
