import { Heading, Text, Box } from '@primer/react'
import { useAirportStore } from '../../stores/airportStore'

export function AirportPageAsideInfo() {
  const airportStore = useAirportStore()

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 3,
      }}>
        <Text sx={{fontWeight: 'bold'}}>Name</Text>
        <Text>{airportStore.airport?.name}</Text>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 3,
      }}>
        <Text sx={{fontWeight: 'bold'}}>Location</Text>
        <Text>{airportStore.airport?.location.city} - {airportStore.airport?.location.state}</Text>
      </Box>
    </>
  )
}