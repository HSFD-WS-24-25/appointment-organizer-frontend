"use client";

import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useThemeMode } from "../components/styledComponents/theme";

export default function RootLayout({ children }) {
  const { theme } = useThemeMode(); // Verwende den Custom Hook

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <Sidebar role="admin" />
        </Box>

        {/* Hauptinhalt */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
