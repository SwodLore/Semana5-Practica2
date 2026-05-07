import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import styles from '@/styles/Modal.module.css'

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
 * @property {number} id        - Identificador único, usado como `key` en el .map().
 * @property {string} label     - Nombre legible de la métrica.
 * @property {number} value     - Valor numérico actual.
 * @property {string} unit      - Unidad de medida (%, pts, hrs, …).
 * @property {Trend}  trend     - Tendencia: 'up' | 'down' | 'stable'.
 * @property {string} icon      - Emoji representativo (decorativo).
 * @property {number} progress  - Avance 0..100 para la barra de progreso.
 */

/**
 * Datos a nivel de módulo: se evalúan **una sola vez** al cargar el bundle,
 * no en cada render. Object.freeze refuerza la inmutabilidad del flujo
 * unidireccional (padre → hijo) exigido por la guía.
 *
 * @type {ReadonlyArray<Metric>}
 */
const METRICS_DATA = Object.freeze([
  { id: 1, label: 'Asistencia',        value: 87,   unit: '%',   trend: 'up',     icon: '📅', progress: 87 },
  { id: 2, label: 'Rendimiento',       value: 92,   unit: '%',   trend: 'up',     icon: '⭐', progress: 92 },
  { id: 3, label: 'Promedio de Notas', value: 15.4, unit: 'pts', trend: 'stable', icon: '📊', progress: 77 },
  { id: 4, label: 'Cursos Aprobados',  value: 6,    unit: '/ 8', trend: 'down',   icon: '✅', progress: 75 },
  { id: 5, label: 'Tareas Entregadas', value: 94,   unit: '%',   trend: 'up',     icon: '📝', progress: 94 },
  { id: 6, label: 'Horas de Estudio',  value: 120,  unit: 'hrs', trend: 'up',     icon: '🕒', progress: 80 },
])

/**
 * Datos de cursos para la tabla.
 */
const COURSES_DATA = Object.freeze([
  { id: 1, course: 'Ingeniería de Software II', professor: 'Dr. Marco Polo', schedule: 'Lun - Mié 08:00 - 10:00', status: 'Activo', grade: 16.5 },
  { id: 2, course: 'Base de Datos II', professor: 'MSc. Ana García', schedule: 'Mar - Jue 10:00 - 12:00', status: 'Activo', grade: 15.0 },
  { id: 3, course: 'Sistemas Operativos', professor: 'Ing. Luis Pérez', schedule: 'Vie 14:00 - 18:00', status: 'Cerrado', grade: 14.2 },
  { id: 4, course: 'Inteligencia Artificial', professor: 'Dra. Sofía Luna', schedule: 'Lun - Mié 10:00 - 12:00', status: 'Activo', grade: 18.0 },
  { id: 5, course: 'Redes y Conectividad', professor: 'Ing. Carlos Ruiz', schedule: 'Mar - Jue 08:00 - 10:00', status: 'Activo', grade: 13.5 },
])

/**
 * App — orquestador raíz.
 */
const App = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState(null) // 'metric' | 'course'

  const handleMetricClick = (metric) => {
    setSelectedItem(metric)
    setModalType('metric')
  }

  const handleCourseClick = (course) => {
    setSelectedItem(course)
    setModalType('course')
  }

  const closeModal = () => {
    setSelectedItem(null)
    setModalType(null)
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="app-brand">
          <img
            className="app-logo"
            src="https://e7.pngegg.com/pngimages/498/231/png-clipart-national-university-of-the-center-of-peru-cepre-uncp-conareme-national-university-of-the-center-of-peru-cepre-uncp.png"
            alt="Logo Universidad Nacional del Centro del Perú"
            width="72"
            height="72"
            loading="eager"
            decoding="async"
          />
          <div className="app-titles">
            <h1>Panel de Métricas Académicas</h1>
            <p>Universidad Nacional del Centro del Perú — IS093A</p>
            <p className="app-subtitle">Facultad de Ingeniería de Sistemas</p>
          </div>
          <img
            className="app-logo"
            src="https://cdn.imgbin.com/11/7/3/imgbin-systems-engineering-national-university-of-the-center-of-peru-logo-cultural-rYJqKu9y1R5KZb5fPe4tRN2dd.jpg"
            alt="Logo Facultad de Ingeniería de Sistemas — UNCP"
            width="72"
            height="72"
            loading="eager"
            decoding="async"
          />
        </div>
      </header>

      <Dashboard 
        metrics={METRICS_DATA} 
        title="Resumen del Ciclo Académico 2025-I"
        onMetricClick={handleMetricClick}
      >
        <p className="app-footer-note">Datos actualizados al semestre 2025-I</p>
      </Dashboard>

      <DataTable 
        data={COURSES_DATA} 
        title="Detalle de Cursos Matriculados" 
        onRowClick={handleCourseClick}
      />

      <Modal 
        isOpen={!!selectedItem} 
        onClose={closeModal} 
        title={modalType === 'metric' ? 'Detalle de Métrica' : 'Detalle de Curso'}
      >
        {selectedItem && (
          <div className={styles.detailsContainer}>
            {modalType === 'metric' ? (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Métrica:</span>
                  <span className={styles.detailValue}>{selectedItem.label}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Valor Actual:</span>
                  <span className={styles.detailValue}>{selectedItem.value} {selectedItem.unit}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Estado:</span>
                  <span className={styles.detailValue}>{selectedItem.trend === 'up' ? 'En alza' : selectedItem.trend === 'down' ? 'En baja' : 'Estable'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Progreso:</span>
                  <span className={styles.detailValue}>{selectedItem.progress}%</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Curso:</span>
                  <span className={styles.detailValue}>{selectedItem.course}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Docente:</span>
                  <span className={styles.detailValue}>{selectedItem.professor}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Horario:</span>
                  <span className={styles.detailValue}>{selectedItem.schedule}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Estado:</span>
                  <span className={styles.detailValue}>{selectedItem.status}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Promedio:</span>
                  <span className={styles.detailValue}>{selectedItem.grade.toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </main>
  )
}

export default App
