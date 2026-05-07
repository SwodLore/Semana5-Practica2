import { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/Modal.module.css'

/**
 * Modal — Ventana emergente para mostrar detalles.
 * 
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title: string,
 *   children: import('react').ReactNode
 * }} props
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const MemoModal = memo(Modal)
MemoModal.displayName = 'Modal'

export default MemoModal
