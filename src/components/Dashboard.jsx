import { memo } from 'react'
import PropTypes from 'prop-types'
import MetricCard from './MetricCard'
import styles from '@/styles/Dashboard.module.css'

/**
 * Dashboard — contenedor del grid de métricas.
 *
 * - Recibe el dataset por `props.metrics` (flujo unidireccional padre → hijo).
 * - Acepta `children` para composición visual debajo del grid.
 * - Itera con `.map()` y entrega `key={m.id}` (requisito de listas en React).
 *
 * Memoizado con `React.memo`: si las props no cambian (referencia estable
 * de METRICS_DATA en App), evita re-render innecesario — patrón recomendado
 * por la guía ("Performance CSR: evitar render innecesario con memo").
 *
 * @param {{
 *   metrics:   ReadonlyArray<import('../App').Metric>,
 *   title?:    string,
 *   children?: import('react').ReactNode
 * }} props
 */
const Dashboard = ({ metrics, title, children }) => (
  <section
    className={styles.dashboard}
    aria-labelledby={title ? 'dashboard-title' : undefined}
  >
    {title && (
      <h2 id="dashboard-title" className={styles.title}>
        {title}
      </h2>
    )}

    <div className={styles.grid} role="list">
      {metrics.map((m) => (
        <MetricCard
          key={m.id}
          label={m.label}
          value={m.value}
          unit={m.unit}
          trend={m.trend}
        />
      ))}
    </div>

    {children}
  </section>
)

Dashboard.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id:    PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unit:  PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
    }),
  ).isRequired,
  title:    PropTypes.string,
  children: PropTypes.node,
}

const MemoDashboard = memo(Dashboard)
MemoDashboard.displayName = 'Dashboard'

export default MemoDashboard
