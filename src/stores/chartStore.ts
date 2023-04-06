import { create } from 'zustand'
import { Chart } from '../types';

type ChartStore = {
  chart?: Chart;
  isLoading: boolean;
  selectChart: (chart: Chart) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chart: undefined,
  isLoading: true,
  selectChart: (chart: Chart) => {
    set(() => ({
      chart,
    }))
  }
}))