import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "./routes/Routes";
import "./Index.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

// * App Theme

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#474747",
      main: "#1a1a1a",
      dark: "#121212",
    },
    secondary: {
      light: "#fce737",
      main: "#fce205",
      dark: "#b09e03",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
