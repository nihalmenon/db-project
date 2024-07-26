import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme, ColorModeScript, ThemeConfig } from "@chakra-ui/react";
import App from "./App";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "#01161e" : "#f6fff8",
        color: props.colorMode === "dark" ? "#f6fff8" : "#01161e",
      },
    }),
  },
  colors: {
    dark: "#01161e",
    background: {
      light: "#f6fff8",
      dark: "#01161e",
    },
    primary: {
      light: "#124559",
      dark: "#aec3b0",
    },
    secondary: {
      light: "#598392",
      dark: "#124559",
    },
    accent: {
      light: "#aec3b0",
      dark: "#01161e"
    },
    accent2: {
      light: "#eff6e0",
      dark: "#598392",
    },
    highlight: {
      light: "#9290C3",
      dark: "#9290C3",
    },
    light: {
      light: "#c4fff9",
      dark: "#f6fff8",
    },
    textlight: {
      light: "#c4fff9",
      dark: "#01161e",
    },
    text: {
      light: "#c4fff9",
      dark: "#c4fff9",
    },
    tabletext: {
      light: "#01161e",
      dark: "#c4fff9",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
