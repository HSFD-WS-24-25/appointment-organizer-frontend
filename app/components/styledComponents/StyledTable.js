"use client";

import { styled } from "@mui/material/styles";
import { TableContainer, Table, TableRow, TableBody, TableCell, TableHead } from "@mui/material";

/**
 * StyledTableContainer
 * - Ein gestylter Container für die Tabelle mit flexibler Breite und vertikalem Scrollen.
 */
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: 1, // Flexibel, um sich dem verfügbaren Platz anzupassen
  overflowY: "auto", // Aktiviert vertikales Scrollen
  borderRadius: theme.shape.borderRadius, // Abgerundete Ecken basierend auf dem Theme
  backgroundColor: theme.palette.background.paper, // Hintergrundfarbe des Containers
}));

/**
 * StyledTable
 * - Eine gestylte Tabelle mit einer Mindestbreite und ohne Zellabstände.
 */
export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650, // Mindestbreite der Tabelle
  borderSpacing: 0, // Kein Abstand zwischen den Zellen
}));

/**
 * StyledTableRow
 * - Eine gestylte Tabellenzeile, die je nach Status unterschiedliche Hintergrundfarben hat.
 */
export const StyledTableRow = styled(TableRow)(({ theme, rowStatus }) => ({
  backgroundColor: rowStatus === "Closed" ? "#f8d7da" : "#d4edda", // Hintergrundfarbe je nach Status
  "&:hover": {
    backgroundColor: rowStatus === "Closed" ? "#f5c6cb" : "#c3e6cb", // Hover-Farbe bei Zeilen
  },
}));

/**
 * StyledTableHead
 * - Der Kopfbereich der Tabelle, mit einem dunklen Hintergrund.
 */
export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#444", // Dunkler Hintergrund für den Kopfbereich
}));

/**
 * StyledTableBody
 * - Der Körper der Tabelle, mit einer Hintergrundfarbe basierend auf dem Theme.
 */
export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // Hintergrundfarbe basierend auf dem Theme
}));

/**
 * StyledTableHeadCell
 * - Eine gestylte Tabellenzelle im Kopfbereich mit weißer Schrift und fettem Text.
 */
export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white, // Weiße Schriftfarbe
  backgroundColor: "#444", // Dunkler Hintergrund
  fontWeight: "bold", // Fettgedruckter Text
}));

/**
 * StyledTableCell
 * - Eine gestylte Tabellenzelle im Körperbereich mit anpassbarem Innenabstand und Textfarbe.
 */
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary, // Textfarbe basierend auf dem Theme
  padding: theme.spacing(2), // Innenabstand für Zellen
}));
