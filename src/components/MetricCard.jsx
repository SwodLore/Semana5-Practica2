import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/MetricCard.module.css'
import StatusBadge from './StatusBadge'

/**
 * Mapa de colores semánticos por tendencia.
 * Definido a nivel de módulo: una sola asignación al cargar el bundle.
 */
const TREND_COLOR = Object.freeze({
  up:     '#22c55e',
  down:   '#ef4444',
  stable: '#f59e0b',
})

/**
 * MetricCard — tarjeta individual de una métrica académica.
 *
 * - Estilos base con CSS Modules (`styles.card`, etc.).
 * - **Inline style** únicamente para el valor dinámico de color
 *   (`background: TREND_COLOR[trend]`), conforme a la guía
 *   ("inline styles solo para valores dinámicos").
 * - Renderiza `<StatusBadge trend={trend} />` para preservar la jerarquía
 *   App → Dashboard → MetricCard → StatusBadge.
 *
 * @param {{
 *   label: string,
 *   value: number,
 *   unit:  string,
 *   trend: 'up' | 'down' | 'stable'
 * }} props
 */
const MetricCard = ({ label, value, unit, trend }) => {
  const indicatorColor = TREND_COLOR[trend] ?? '#cbd5e1'

  return (
    <article
      className={styles.card}
      role="listitem"
      aria-label={`${label}: ${value} ${unit}, tendencia ${trend}`}
    >
      <h3 className={styles.label}>{label}</h3>

      <div className={styles.valueBox}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
        <span
          className={styles.indicator}
          style={{ background: indicatorColor }}
          aria-hidden="true"
        />
      </div>

      <StatusBadge trend={trend} />
    </article>
  )
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit:  PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
}

const MemoMetricCard = memo(MetricCard)
MemoMetricCard.displayName = 'MetricCard'

export default MemoMetricCard
