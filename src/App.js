import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { ContextProvider } from "./contexts/ContextProvider";
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { createTheme } from "@mui/material";
// ----------------------------------------------------------------------
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </ContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}
