"use client";

import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

/**
 * **StyledDialog**
 * Eine angepasste Version der MUI-Dialog-Komponente, die zusätzliche Stile verwendet.
 * - Verwendet das `theme`-Objekt, um Theme-spezifische Anpassungen wie `borderRadius`, 
 *   Hintergrundfarbe und Schatten anzuwenden.
 * - Ideal für die Darstellung von modalen Dialogen mit einem konsistenten Design.
 */
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 2, // Abrundung der Dialogecken
    backgroundColor: theme.palette.background.paper, // Hintergrundfarbe des Dialogs
    boxShadow: theme.shadows[5], // Schatten des Dialogs
    padding: theme.spacing(2), // Innenabstand
  },
}));

/**
 * **StyledDialogTitle**
 * Eine angepasste Version der MUI-DialogTitle-Komponente für modale Überschriften.
 * - Zeigt eine zentrale Überschrift mit einem hervorgehobenen Hintergrund an.
 * - Geeignet für Dialoge, bei denen der Titel besonders auffallen soll.
 *
 * @param {object} theme - Das aktuelle Theme-Objekt, das von MUI bereitgestellt wird.
 */
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: "bold", // Fettschrift für den Titel
  fontSize: "1.5rem", // Größere Schriftgröße
  backgroundColor: theme.palette.primary.main, // Primärfarbe für den Hintergrund
  color: theme.palette.common.white, // Weißer Text
  textAlign: "center", // Zentrierter Text
  padding: theme.spacing(2), // Innenabstand
}));

/**
 * **StyledDialogContent**
 * Eine angepasste Version der MUI-DialogContent-Komponente.
 * - Optimiert für die Darstellung von Texten oder Formularen im Dialog.
 * - Nutzt Theme-abhängige Farben und Abstände.
 *
 * @param {object} theme - Das aktuelle Theme-Objekt, das von MUI bereitgestellt wird.
 */
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  color: theme.palette.text.primary, // Standardfarbe für Texte
  fontSize: "1rem", // Standard-Schriftgröße
  padding: theme.spacing(2), // Innenabstand
}));

/**
 * **StyledDialogActions**
 * Eine angepasste Version der MUI-DialogActions-Komponente.
 * - Dient zur Platzierung von Aktions-Buttons im Dialog (z. B. "Abbrechen", "Bestätigen").
 * - Fügt eine Hintergrundfarbe und Abstände hinzu.
 *
 * @param {object} theme - Das aktuelle Theme-Objekt, das von MUI bereitgestellt wird.
 */
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: "flex-end", // Buttons rechtsbündig ausrichten
  padding: theme.spacing(1, 2), // Innenabstand (oben/unten: 1, links/rechts: 2)
  backgroundColor: theme.palette.background.default, // Standard-Hintergrundfarbe
}));
