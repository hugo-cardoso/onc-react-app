import { Airport, ChartTypeEnum } from '../types'

export function airportService() {

  const getAirportsICAO = async (): Promise<string[]> => {
    const airports = await fetch('https://api.opennavcharts.com.br/api/airports')
      .then((response) => response.json())

    return airports;
  }

  const getAirport = async (icao: string): Promise<Airport> => {
    const airport = await fetch(`https://api.opennavcharts.com.br/api/search/airport?icao=${icao}`)
      .then((response) => response.json())

    return {
      id: airport._id,
      icao: airport.icao,
      name: airport.name,
      charts: airport.charts.map((chart: any) => ({
        ...chart,
        id: chart._id,
        type: [ChartTypeEnum.ADC, ChartTypeEnum.PDC].includes(chart.type) ? ChartTypeEnum.TAXI : chart.type,
      })),
      runways: airport.runways,
      location: airport.location,
    }
  };

  return {
    getAirportsICAO,
    getAirport,
  };
}