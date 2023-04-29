import { create } from 'zustand'
import { Airport } from '../types';
import { airportService } from '../services/airportService'

type AirportStore = {
  airport?: Airport;
  icaos: string[];
  metar: string;
  isLoading: boolean;
  isLoadingICAOS: boolean;
  isLoadingMetar: boolean;
  fetchAirport: (icao: string) => Promise<void>;
  fetchAirportICAOS: () => Promise<void>;
  fetchAirportMetar: (icao: string) => Promise<void>;
}

export const useAirportStore = create<AirportStore>((set) => ({
  airport: undefined,
  icaos: [],
  metar: '',
  isLoading: true,
  isLoadingICAOS: true,
  isLoadingMetar: true,
  fetchAirport: async (icao: string) => {
    set({
      isLoading: true,
      isLoadingMetar: true,
    })

    const [airport, metar] = await Promise.all([
      airportService().getAirport(icao),
      airportService().getAirportMetar(icao),
    ])

    set(() => ({
      airport,
      metar,
      isLoading: false,
      isLoadingMetar: false,
    }))
  },
  fetchAirportICAOS: async () => {
    set({ isLoadingICAOS: true })

    const icaos = await airportService().getAirportsICAO();

    set(() => ({
      icaos,
      isLoadingICAOS: false,
    }))
  },
  fetchAirportMetar: async (icao: string) => {
    set(() => ({
      metar: '',
      isLoadingMetar: true,
    }))

    const metar = await airportService().getAirportMetar(icao);

    set(() => ({
      metar,
      isLoadingMetar: false,
    }))
  }
}))