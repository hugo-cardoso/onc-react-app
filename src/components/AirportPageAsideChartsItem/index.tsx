import { Chart } from "../../types";
import * as Styles from "./styles";
import { ChevronRightIcon } from '@primer/octicons-react'
import { useNavigate, useParams } from "react-router-dom";
import { useAirportStore } from "../../stores/airportStore";
import { MouseEvent } from "react";

type AirportPageAsideChartsItemProps = {
  chart: Chart;
}

export function AirportPageAsideChartsItem(props: AirportPageAsideChartsItemProps) {
  const { chart } = props
  const { chartId } = useParams()
  const navigate = useNavigate()
  const airportStore = useAirportStore()

  function handleClickChartItem(event: MouseEvent) {
    event.preventDefault();

    openChart()
  }

  function openChart() {
    const { airport } = airportStore

    navigate(`/app/airport/${airport?.icao.toLowerCase()}/chart/${chart.id}`)
  }

  return (
    <Styles.ChartItem
      key={chart.id}
      onClick={handleClickChartItem}
      active={chart.id === chartId}
      href={`/app/airport/${airportStore.airport?.icao.toLowerCase()}/chart/${chart.id}`}
    >
      <span style={{
        flex: 1,
      }}>{chart.name}</span>
      <ChevronRightIcon />
    </Styles.ChartItem>
  );
}