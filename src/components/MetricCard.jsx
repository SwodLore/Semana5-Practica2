import PropTypes from 'prop-types'
import styles from '@/styles/MetricCard.module.css'
import StatusBadge from './StatusBadge'

const trendColor = {
  up:     '#22c55e',
  down:   '#ef4444',
  stable: '#f59e0b',
}

/**
 * MetricCard — tarjeta individual de métrica académica.
 * @param {{ label: string, value: number, unit: string, trend: 'up'|'down'|'stable' }} props
 */
const MetricCard = ({ label, value, unit, trend }) => (
  <article className={styles.card}>
    <h3 className={styles.label}>{label}</h3>
    <div className={styles.valueBox}>
      <span className={styles.value}>{value}</span>
      <span className={styles.unit}>{unit}</span>
      {/* inline style solo para color dinámico */}
      <span
        className={styles.indicator}
        style={{ background: trendColor[trend] ?? '#cbd5e1' }}
        aria-hidden="true"
      />
    </div>
    <StatusBadge trend={trend} />
  </article>
)

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit:  PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
}

export default MetricCard
