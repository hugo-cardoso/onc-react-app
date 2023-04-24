import { create } from 'zustand'

type AirportLayoutStore = {
  isOpenSidebar: boolean;
  changeSidebar: (state: boolean) => void;
}

export const useAirportLayoutStore = create<AirportLayoutStore>((set) => ({
  isOpenSidebar: true,
  changeSidebar: (state: boolean) => {
    set(() => ({
      isOpenSidebar: state,
    }))
  }
}))