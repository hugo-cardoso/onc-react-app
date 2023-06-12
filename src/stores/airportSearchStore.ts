import { create } from 'zustand'
import { airportService } from '../services/airportService';

type AirportSearchStore = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  topSearchs: string[];
  isLoadingTopSearchs: boolean;
  fetchTopSearchs: () => Promise<void>;
  icaos: string[];
  isLoadingICAOS: boolean;
  fetchICAOS: () => Promise<void>;
}

export const useAirportSearchStore = create<AirportSearchStore>((set) => ({
  isOpen: false,
  topSearchs: [],
  isLoadingTopSearchs: true,
  icaos: [],
  isLoadingICAOS: true,
  setIsOpen: (state: boolean) => {
    set(() => ({
      isOpen: state,
    }));
  },
  async fetchTopSearchs() {
    set({ isLoadingTopSearchs: true })

    const topSearchs = await airportService().getAirportsTopSearch();

    set(() => ({
      topSearchs,
      isLoadingTopSearchs: false,
    }));
  },
  async fetchICAOS() {
    set({ isLoadingICAOS: true })

    const icaos = await airportService().getAirportsICAO();

    set(() => ({
      icaos,
      isLoadingICAOS: false,
    }))
  },
}));