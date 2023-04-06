import { create } from 'zustand'
import { Theme } from '../types'

import { themeService } from '../services/themeService'

type ThemeStore = {
  theme: Theme;
  toggle: () => void;
  load: () => void;
}

const theme = themeService().getTheme();

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: theme,
  toggle: () => {
    themeService().toggleTheme();
    set(() => ({
      theme: themeService().getTheme(),
    }));
  },
  load: () => {
    themeService().initTheme();
    set(() => ({
      theme: themeService().getTheme(),
    }));
  }
}))