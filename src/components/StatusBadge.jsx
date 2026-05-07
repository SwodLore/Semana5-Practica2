import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/StatusBadge.module.css'

/**
 * Configuración estática por tendencia (label, símbolo y clase CSS).
 * A nivel de módulo: evaluado una vez por bundle.
 */
const CONFIG = Object.freeze({
  up:     { label: 'En alza', arrow: '↑', cls: styles.up     },
  down:   { label: 'En baja', arrow: '↓', cls: styles.down   },
  stable: { label: 'Estable', arrow: '→', cls: styles.stable },
})

/**
 * StatusBadge — badge accesible que indica la tendencia de una métrica.
 *
 * - Hoja del árbol de componentes; sólo recibe la prop `trend`.
 * - `role="status"` + `aria-label` exponen el estado a lectores de pantalla.
 *
 * @param {{ trend: 'up' | 'down' | 'stable' }} props
 */
const StatusBadge = ({ trend }) => {
  const { label, arrow, cls } = CONFIG[trend] ?? CONFIG.stable

  return (
    <span
      className={`${styles.badge} ${cls}`}
      role="status"
      aria-label={`Tendencia: ${label}`}
    >
      <span aria-hidden="true">{arrow}</span> {label}
    </span>
  )
}

StatusBadge.propTypes = {
  trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
}

const MemoStatusBadge = memo(StatusBadge)
MemoStatusBadge.displayName = 'StatusBadge'

export default MemoStatusBadge
