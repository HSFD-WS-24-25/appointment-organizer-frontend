import "../globals.css";
import SidebarUser from "../components/SidebarUser";
import { Box } from "@mui/material";

export const metadata = {
  title: "Veranstaltungsplaner",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex", // Verwende flexibles Layout
        height: "100vh", // Vollständige Höhe des Viewports
        width: "100%",   // Vollständige Breite
      }}
    >
      <Box
        sx={{
          flexShrink: 0, // Sidebar soll sich nicht verkleinern
          flexGrow: 0,   // Sidebar soll ihre Breite basierend auf dem Inhalt anpassen
        }}
      >
        <SidebarUser />
      </Box>
      <Box
        sx={{
          flexGrow: 1,  // Hauptinhalt füllt den restlichen Platz
          p: 2,         // Padding für den Inhalt
          overflow: "auto", // Scrollen erlauben, falls nötig
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
