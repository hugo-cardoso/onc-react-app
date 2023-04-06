import { HeaderGlobal } from '../../components/HeaderGlobal'
import styles from './styles.module.css'

type LayoutAirportProps = {
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export function LayoutAirport(props: LayoutAirportProps) {
  return (
    (
      <>
        <HeaderGlobal />
        <div className={styles.layout}>
          <div className={styles['layout__aside']}>
            {
              props.aside && props.aside
            }
          </div>
          <div className={styles['layout__main']}>
            { props.children }
          </div>
        </div>
      </>
    )
  )
}