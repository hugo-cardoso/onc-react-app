import { Outlet, useParams } from "react-router-dom";
import { LayoutAirport } from '../../layouts/LayoutAirport'
import { useEffect } from "react";
import { Spinner } from '@primer/react'

import * as Styles from './styles'

import { AirportPageAside } from '../../components/AirportPageAside'

import { useAirportStore } from "../../stores/airportStore";

export const AirportPage = () => {
  const { icao, chartId } = useParams();
  const airportStore = useAirportStore()

  useEffect(() => {
    const fetchAirport = async () => {
      console.log(`Searching for airport ${icao}...`)
      airportStore.fetchAirport(icao!)
    }

    fetchAirport()

    return () => {}
  }, [icao])

  function renderContent() {
    if (airportStore.isLoading) return (
      <Styles.Container>
        <Spinner />
      </Styles.Container>
    )

    if (chartId) return <Outlet />

    return (
      <Styles.Container>
        <div className="blankslate">
          <h3 className="blankslate-heading">No chart selected</h3>
          <p>Please select a chart to view it</p>
        </div>
      </Styles.Container>
    )
  }

  return (
    <LayoutAirport aside={<AirportPageAside isLoading={airportStore.isLoading} airport={airportStore.airport} />}>
      { renderContent() }
    </LayoutAirport>
  )
}