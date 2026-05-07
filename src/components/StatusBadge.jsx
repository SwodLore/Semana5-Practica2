import PropTypes from 'prop-types'
import styles from '@/styles/StatusBadge.module.css'

const CONFIG = {
  up:     { label: 'En alza', arrow: '↑', cls: styles.up     },
  down:   { label: 'En baja', arrow: '↓', cls: styles.down   },
  stable: { label: 'Estable', arrow: '→', cls: styles.stable },
}

/**
 * StatusBadge — badge de tendencia para una métrica.
 * @param {{ trend: 'up'|'down'|'stable' }} props
 */
const StatusBadge = ({ trend }) => {
  const { label, arrow, cls } = CONFIG[trend] ?? CONFIG.stable
  return (
    <span className={styles.badge + ' ' + cls}>
      {arrow} {label}
    </span>
  )
}

StatusBadge.propTypes = {
  trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
}

export default StatusBadge
