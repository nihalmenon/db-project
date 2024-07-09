import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
// import customTheme from "./config/theme";

// const theme = extendTheme({
//   colors: {
//     dark: "#1e2749", // Dark color for text
//     background: "#fafaff",
//     primary: "#273469",
//     secondary: "#30343f",
//     accent: "#1c7293 ",
//     accent2: "#778da9  ",
//     highlight: "#e4d9ff  ",
//     textlight: "#E6F0FA",
//   },
// });

const theme = extendTheme({
  colors: {
    dark: "#01161e", // Dark color for text
    background: "#f6fff8",
    primary: "#124559",
    secondary: "#598392",
    accent: "#aec3b0 ",
    accent2: "#eff6e0  ",
    highlight: "#9290C3  ",
    textlight: "#c4fff9",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
