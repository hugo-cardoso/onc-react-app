import { create } from 'zustand'
import { airportService } from '../services/airportService'

type AirportFavoritesStore = {
  isOpen: boolean;
  airports: string[];
  setIsOpen: (state: boolean) => void;
  fetchAirports: () => void;
  addAirport: (airport: string) => void;
  removeAirport: (airport: string) => void;
}

export const useAirportFavoritesStore = create<AirportFavoritesStore>((set) => ({
  isOpen: false,
  airports: [],
  setIsOpen: (state: boolean) => {
    set(() => ({
      isOpen: state,
    }));
  },
  fetchAirports: async () => {
    const favoriteAirports = await airportService().getFavoriteAirports();

    set(() => ({
      airports: favoriteAirports,
    }));
  },
  addAirport: (airport: string) => {
    
    set((state) => {
      const airports = [...state.airports, airport];
      airportService().setFavoriteAirports(airports);
      
      return {
        airports
      }
    });
  },
  removeAirport: (airport: string) => {
    set((state) => {
      const airports = state.airports.filter((item) => item !== airport);
      airportService().setFavoriteAirports(airports);

      return {
        airports,
      }
    });
  }
}));