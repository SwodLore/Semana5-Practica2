import Dashboard from '@/components/Dashboard'

/**
 * Tendencia de una métrica respecto al período anterior.
 * @typedef {'up' | 'down' | 'stable'} Trend
 */

/**
 * Estructura inmutable de una métrica académica.
 * Esta interfaz se reutiliza en Dashboard y MetricCard vía
 * `import('../App').Metric` (typedef compartido).
 *
 * @typedef {Object} Metric
 * @property {number} id     - Identificador único, usado como `key` en el .map().
 * @property {string} label  - Nombre legible de la métrica.
 * @property {number} value  - Valor numérico actual.
 * @property {string} unit   - Unidad de medida (%, pts, hrs, …).
 * @property {Trend}  trend  - Tendencia: 'up' | 'down' | 'stable'.
 */

/**
 * Datos a nivel de módulo: se evalúan **una sola vez** al cargar el bundle,
 * no en cada render. Object.freeze refuerza la inmutabilidad del flujo
 * unidireccional (padre → hijo) exigido por la guía.
 *
 * @type {ReadonlyArray<Metric>}
 */
const METRICS_DATA = Object.freeze([
  { id: 1, label: 'Asistencia',        value: 87,   unit: '%',   trend: 'up'     },
  { id: 2, label: 'Rendimiento',       value: 92,   unit: '%',   trend: 'up'     },
  { id: 3, label: 'Promedio de Notas', value: 15.4, unit: 'pts', trend: 'stable' },
  { id: 4, label: 'Cursos Aprobados',  value: 6,    unit: '/ 8', trend: 'down'   },
  { id: 5, label: 'Tareas Entregadas', value: 94,   unit: '%',   trend: 'up'     },
  { id: 6, label: 'Horas de Estudio',  value: 120,  unit: 'hrs', trend: 'up'     },
])

/**
 * App — orquestador raíz.
 * Define el dataset y compone Dashboard pasando datos vía `props`
 * y un nodo extra vía `children` (composición de UI).
 */
const App = () => (
  <main className="app-container">
    <header className="app-header">
      <h1>Panel de Métricas Académicas</h1>
      <p>Universidad Nacional del Centro del Perú — IS093A</p>
    </header>

    <Dashboard metrics={METRICS_DATA} title="Resumen del Ciclo Académico 2025-I">
      <p className="app-footer-note">Datos actualizados al semestre 2025-I</p>
    </Dashboard>
  </main>
)

export default App
