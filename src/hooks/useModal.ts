import { useAirportSearchStore } from "../stores/airportSearchStore";
import { useAirportFavoritesStore } from "../stores/airportFavoritesModal";

export enum ModalTypeEnum {
  AIRPORT_SEARCH = "AIRPORT_SEARCH",
  AIRPORT_FAVORITES = "AIRPORT_FAVORITES",
}

type ModalFunctions = {
  [key in ModalTypeEnum]: (state: boolean) => void;
}

export const useModal = () => {
  const airportSearchStore = useAirportSearchStore();
  const airportFavoritesStore = useAirportFavoritesStore();

  const modalFunctions: ModalFunctions = {
    [ModalTypeEnum.AIRPORT_SEARCH]: airportSearchStore.setIsOpen,
    [ModalTypeEnum.AIRPORT_FAVORITES]: airportFavoritesStore.setIsOpen,
  }

  return {
    open: (type: ModalTypeEnum) => {
      for (const key in modalFunctions) {
        modalFunctions[key as ModalTypeEnum](key === type);
      }
    },
    close: () => {
      for (const key in modalFunctions) {
        modalFunctions[key as ModalTypeEnum](false);
      } 
    }
  }
};