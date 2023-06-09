import { Airport, ChartTypeEnum } from '../types'

const LOCAL_STORAGE_FAVORITE_AIRPORTS = 'favoriteAirports';

export function airportService() {

  const getAirportsICAO = async (): Promise<string[]> => {
    const airports = await fetch('https://api.opennavcharts.com.br/api/airports')
      .then((response) => response.json())

    return airports;
  }

  const getAirport = async (icao: string): Promise<Airport> => {
    const airport = await fetch(`https://api.opennavcharts.com.br/api/search/airport/${icao}`)
      .then((response) => response.json())

    return {
      id: airport._id,
      icao: airport.icao,
      name: airport.name,
      charts: airport.charts.map((chart: any) => ({
        ...chart,
        id: chart._id,
        type: [ChartTypeEnum.ADC, ChartTypeEnum.PDC, ChartTypeEnum.GMC].includes(chart.type) ? ChartTypeEnum.TAXI : chart.type,
      })),
      runways: airport.runways,
      location: airport.location,
    }
  };

  const getAirportMetar = async (icao: string): Promise<string> => {
    const metar = await fetch(`https://api.opennavcharts.com.br/api/metar?icao=${icao}`)
      .then((response) => response.text())

    return metar;
  };

  const getAirportsTopSearch = async (): Promise<string[]> => {
    const airports = await fetch(`https://api.opennavcharts.com.br/api/search/airport/topsearch`)
      .then((response) => response.json())

    return airports.map((airport: any) => airport._id);
  };

  const getFavoriteAirports = async (): Promise<string[]> => {
    const favoriteAirports = localStorage.getItem(LOCAL_STORAGE_FAVORITE_AIRPORTS);

    if (favoriteAirports) {
      return JSON.parse(favoriteAirports);
    }

    return [];
  };

  const setFavoriteAirports = async (airports: string[]): Promise<void> => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_AIRPORTS, JSON.stringify(airports));
  }

  return {
    getAirportsICAO,
    getAirport,
    getAirportMetar,
    getAirportsTopSearch,
    getFavoriteAirports,
    setFavoriteAirports,
  };
}