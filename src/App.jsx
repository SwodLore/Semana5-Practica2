import Dashboard from '@/components/Dashboard'

/**
 * @typedef {Object} Metric
 * @property {number} id
 * @property {string} label
 * @property {number} value
 * @property {string} unit
 * @property {'up'|'down'|'stable'} trend
 */

const App = () => {
  /** @type {Metric[]} */
  const metricsData = [
    { id: 1, label: 'Asistencia',        value: 87,   unit: '%',   trend: 'up'     },
    { id: 2, label: 'Rendimiento',       value: 92,   unit: '%',   trend: 'up'     },
    { id: 3, label: 'Promedio de Notas', value: 15.4, unit: 'pts', trend: 'stable' },
    { id: 4, label: 'Cursos Aprobados',  value: 6,    unit: '/ 8', trend: 'down'   },
    { id: 5, label: 'Tareas Entregadas', value: 94,   unit: '%',   trend: 'up'     },
    { id: 6, label: 'Horas de Estudio',  value: 120,  unit: 'hrs', trend: 'up'     },
  ]

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Panel de Métricas Académicas</h1>
        <p>Universidad Nacional del Centro del Perú — IS093A</p>
      </header>
      <Dashboard metrics={metricsData} title="Resumen del Ciclo Académico 2025-I">
        <p className="app-footer-note">Datos actualizados al semestre 2025-I</p>
      </Dashboard>
    </main>
  )
}

export default App
