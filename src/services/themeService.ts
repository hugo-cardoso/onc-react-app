import { Theme } from '../types'

const THEME_KEY = 'theme';
const DEFAULT_THEME = Theme.DARK;

export function themeService() {
  const getTheme = () => {
    const theme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    return theme as Theme;
  };

  const setTheme = (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
    window.document.querySelector('html')?.setAttribute('data-color-mode', theme);
  }

  const toggleTheme = () => {
    const theme = getTheme();
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  };

  const initTheme = () => {
    const theme = getTheme();
    window.document.querySelector('html')?.setAttribute('data-dark-theme', 'dark');
    setTheme(theme);
  }

  return {
    getTheme,
    setTheme,
    toggleTheme,
    initTheme,
  };
}