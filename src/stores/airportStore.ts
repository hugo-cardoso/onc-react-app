import { create } from 'zustand'
import { Airport } from '../types';
import { airportService } from '../services/airportService'

type AirportStore = {
  airport?: Airport;
  icaos: string[];
  isLoading: boolean;
  isLoadingICAOS: boolean;
  fetchAirport: (icao: string) => Promise<void>;
  fetchAirportICAOS: () => Promise<void>;
}

export const useAirportStore = create<AirportStore>((set) => ({
  airport: undefined,
  icaos: [],
  isLoading: true,
  isLoadingICAOS: true,
  fetchAirport: async (icao: string) => {
    set({ isLoading: true })

    const airport = await airportService().getAirport(icao)

    set(() => ({
      airport,
      isLoading: false,
    }))
  },
  fetchAirportICAOS: async () => {
    set({ isLoadingICAOS: true })

    const icaos = await airportService().getAirportsICAO();

    set(() => ({
      icaos,
      isLoadingICAOS: false,
    }))
  }
}))