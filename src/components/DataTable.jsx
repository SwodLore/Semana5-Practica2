import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/DataTable.module.css'

/**
 * DataTable — Componente para mostrar información detallada en formato tabular.
 * 
 * - Diseño responsivo con scroll horizontal.
 * - Estilos integrados con el sistema de diseño global.
 * - Animaciones de entrada.
 * 
 * @param {{
 *   data: Array<{
 *     id: number,
 *     course: string,
 *     professor: string,
 *     schedule: string,
 *     status: 'Activo' | 'Cerrado',
 *     grade: number
 *   }>,
 *   title: string,
 *   onRowClick: (item: any) => void
 * }} props
 */
const DataTable = ({ data, title, onRowClick }) => {
  return (
    <section className={styles.tableContainer}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Curso</th>
              <th>Docente</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick(item)}
                className={styles.clickableRow}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onRowClick(item)}
              >
                <td className={styles.courseName}>{item.course}</td>
                <td className={styles.professor}>{item.professor}</td>
                <td>{item.schedule}</td>
                <td>
                  <span className={`${styles.status} ${item.status === 'Activo' ? styles.statusActive : styles.statusClosed}`}>
                    {item.status}
                  </span>
                </td>
                <td className={styles.grade}>{item.grade.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      course: PropTypes.string.isRequired,
      professor: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Activo', 'Cerrado']).isRequired,
      grade: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  onRowClick: PropTypes.func.isRequired,
}

const MemoDataTable = memo(DataTable)
MemoDataTable.displayName = 'DataTable'

export default MemoDataTable
