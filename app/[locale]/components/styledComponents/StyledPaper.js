"use client";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Mehr Padding für einen luftigen Look
  height: "auto", // Dynamische Höhe
  display: "flex",
  flexDirection: "column", // Inhalt in Spalten anordnen
  justifyContent: "space-between", // Elemente gleichmäßig verteilen

  // **Leicht transparenter Hintergrund**
  backgroundColor: theme.palette.mode === "dark" 
    ? "rgba(0, 0, 0, 0.4)"  // 40% transparente dunkle Farbe im Dark Mode
    : "rgba(255, 255, 255, 0.87)", // 30% transparente helle Farbe im Light Mode

  color: theme.palette.mode === "dark" 
    ? theme.palette.text.primary // Textfarbe für Dark Mode
    : theme.palette.text.secondary, // Textfarbe für Light Mode

  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)", // Dezenter Schatten
  borderRadius: "12px", // Abgerundete Ecken
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease", // Glatter Übergang

  // Responsivität für kleinere Bildschirme
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2), // Weniger Padding
    borderRadius: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5), // Noch weniger Padding
    borderRadius: "8px",
  },
}));

export default StyledPaper;
