import { BaseStyles, ThemeProvider } from "@primer/react";
import { useThemeStore } from "./stores/themeStore";
import { useEffect } from "react";

type AppProps = {
  children: React.ReactNode;
};

export function App(props: AppProps) {
  const themeStore = useThemeStore();

  useEffect(() => {
    themeStore.load();
  }, [])

  return (
    <ThemeProvider colorMode={themeStore.theme}>
      <BaseStyles>
        { props.children }
      </BaseStyles>
    </ThemeProvider>
  )
}
