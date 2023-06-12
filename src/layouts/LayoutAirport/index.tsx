import { HeaderGlobal } from '../../components/HeaderGlobal'
import { SearchModal } from '../../components/SearchModal'
import * as Styles from './styles'
import { useAirportLayoutStore } from '../../stores/airportLayoutStore'

type LayoutAirportProps = {
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export function LayoutAirport(props: LayoutAirportProps) {
  const airportLayoutStore = useAirportLayoutStore();

  return (
    (
      <>
        <HeaderGlobal />
        <Styles.Layout isOpenSidebar={airportLayoutStore.isOpenSidebar}>
          <Styles.LayoutAside>
            {
              props.aside && props.aside
            }
          </Styles.LayoutAside>
          <Styles.LayoutMain>
            { props.children }
          </Styles.LayoutMain>
        </Styles.Layout>
        <SearchModal />
      </>
    )
  )
}