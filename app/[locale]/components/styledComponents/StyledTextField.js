"use client";

import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

/**
 * StyledTextField
 * - Eine angepasste Version des MUI TextField.
 * - Passt sich dem Theme an und verändert das Aussehen der Eingabefelder und Labels.
 * 
 */
export const StyledTextField = styled(TextField)(({ theme }) => ({
  // Stil für die Eingabebasis (InputBase)
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.background.paper, // Hintergrundfarbe des Eingabefeldes
    borderRadius: theme.shape.borderRadius, // Abgerundete Ecken basierend auf dem Theme
    color: theme.palette.text.primary, // Textfarbe im Eingabefeld
  },
  
  // Stil für das umschließende Feldset (Outlines)
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400], // Standard Rahmenfarbe
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light, // Rahmenfarbe bei Hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Rahmenfarbe im fokussierten Zustand
    },
  },

  // Stil für das Label
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary, // Standardfarbe des Labels
  },
  
  // Stil für das fokussierte Label
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main, // Farbe des Labels im fokussierten Zustand
  },
}));
