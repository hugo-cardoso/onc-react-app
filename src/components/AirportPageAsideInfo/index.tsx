import { Text, IconButton, Tooltip } from '@primer/react'
import { useAirportStore } from '../../stores/airportStore'

import * as Styles from './styles'
import { SyncIcon } from '@primer/octicons-react'

export function AirportPageAsideInfo() {
  const airportStore = useAirportStore()

  return (
    <>
      <Styles.InfoBox>
        <Text fontWeight="bold">Name</Text>
        <Text>{airportStore.airport?.name}</Text>
      </Styles.InfoBox>
      <Styles.InfoBox>
        <Text fontWeight="bold">Location</Text>
        <Text>{airportStore.airport?.location.city} - {airportStore.airport?.location.state}</Text>
      </Styles.InfoBox>
      <Styles.InfoBox>
        <Text fontWeight="bold">METAR</Text>
        <Styles.InfoBoxActionContent>
          <Text>{airportStore.isLoadingMetar ? 'Loading...' : airportStore.metar}</Text>
          <Tooltip aria-label="Refresh" direction="n">
            <IconButton
              aria-label="Theme"
              icon={SyncIcon}
              onClick={() => airportStore.fetchAirportMetar(airportStore.airport?.icao!)}
              disabled={airportStore.isLoadingMetar}
            />
          </Tooltip>
        </Styles.InfoBoxActionContent>
      </Styles.InfoBox>
    </>
  )
}