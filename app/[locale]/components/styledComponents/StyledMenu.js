"use client";

import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";

/**
 * **StyledMenu**
 * Eine angepasste Version der MUI-Menu-Komponente.
 * - Fügt einen stilisierten Hintergrund, abgerundete Ecken und Schatten hinzu.
 * - Kann für Dropdown-Menüs oder Kontextmenüs verwendet werden.
 */
export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper, // Hintergrundfarbe des Menüs
    borderRadius: theme.shape.borderRadius, // Abgerundete Ecken
    boxShadow: theme.shadows[3], // Schatten für das Menü
    minWidth: 200, // Mindestbreite des Menüs
  },
}));

/**
 * **StyledMenuItem**
 * Eine angepasste Version der MUI-MenuItem-Komponente.
 * - Optimiert für Menüpunkte mit Hover- und Auswahl-Styling.
 * - Passt sich automatisch an das aktuelle Theme an.
 *
 * @param {object} theme - Das aktuelle Theme-Objekt, das von MUI bereitgestellt wird.
 */
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiMenuItem-root": {
    color: theme.palette.text.primary, // Standardfarbe für den Text
    padding: theme.spacing(1.5), // Innenabstand für die Menüpunkte
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // Hintergrundfarbe beim Hover
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.light, // Hintergrundfarbe für ausgewählte Menüpunkte
      color: theme.palette.primary.contrastText, // Textfarbe für ausgewählte Menüpunkte
    },
    "&.Mui-selected:hover": {
      backgroundColor: theme.palette.primary.main, // Hintergrundfarbe beim Hover über ausgewählten Menüpunkten
    },
  },
}));
