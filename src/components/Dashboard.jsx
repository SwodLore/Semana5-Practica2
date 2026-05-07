import PropTypes from 'prop-types'
import MetricCard from './MetricCard'
import styles from '@/styles/Dashboard.module.css'

/**
 * Dashboard — contenedor del grid de métricas.
 * @param {{ metrics: import('../App').Metric[], title?: string, children?: import('react').ReactNode }} props
 */
const Dashboard = ({ metrics, title, children }) => (
  <section className={styles.dashboard}>
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={styles.grid}>
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
    })
  ).isRequired,
  title:    PropTypes.string,
  children: PropTypes.node,
}

export default Dashboard
