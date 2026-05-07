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
 * - **Inline style** únicamente para los valores dinámicos:
 *     · color del indicador (`background: TREND_COLOR[trend]`)
 *     · ancho de la barra de progreso (`width: progress%`)
 *     · color de la barra (también dinámico por trend)
 *   conforme a la guía PDF ("inline styles solo para valores dinámicos").
 * - Renderiza `<StatusBadge trend={trend} />` para preservar la jerarquía
 *   App → Dashboard → MetricCard → StatusBadge.
 *
 * @param {{
 *   label:     string,
 *   value:     number,
 *   unit:      string,
 *   trend:     'up' | 'down' | 'stable',
 *   icon?:     string,
 *   progress?: number,
 *   onClick?:  () => void
 * }} props
 */
const MetricCard = ({ label, value, unit, trend, icon, progress, onClick }) => {
  const color = TREND_COLOR[trend] ?? '#cbd5e1'
  const pct   = Math.max(0, Math.min(100, progress ?? 0))

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${value} ${unit}, tendencia ${trend}. Click para ver más detalles.`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {icon && (
        <span className={styles.cardIcon} aria-hidden="true">{icon}</span>
      )}

      <h3 className={styles.label}>{label}</h3>

      <div className={styles.valueBox}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
        <span
          className={styles.indicator}
          style={{ background: color }}
          aria-hidden="true"
        />
      </div>

      {progress !== undefined && (
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso de ${label}`}
        >
          <span
            className={styles.progressFill}
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
      )}

      <StatusBadge trend={trend} />
    </article>
  )
}

MetricCard.propTypes = {
  label:    PropTypes.string.isRequired,
  value:    PropTypes.number.isRequired,
  unit:     PropTypes.string.isRequired,
  trend:    PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
  icon:     PropTypes.string,
  progress: PropTypes.number,
  onClick:  PropTypes.func,
}

const MemoMetricCard = memo(MetricCard)
MemoMetricCard.displayName = 'MetricCard'

export default MemoMetricCard
