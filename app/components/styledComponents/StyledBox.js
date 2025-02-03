// StyledBox.js
"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * **StyledBox**
 * Eine angepasste Version der MUI Box-Komponente.
 * - Fügt der Box einen stilisierten Hintergrund, abgerundete Ecken, Schatten und Übergänge hinzu.
 * - Der Hover-Effekt verstärkt den Schatten für visuelle Interaktivität.
 * - Responsivität wurde hinzugefügt, um die Padding-Größe basierend auf der Bildschirmgröße zu ändern.
 * 
 */
export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2), // Standard Padding (16px)
  backgroundColor: theme.palette.background.paper, // Hintergrundfarbe der Box
  borderRadius: '8px', // Abgerundete Ecken
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Leichter Schatten für die Box
  transition: 'all 0.3s ease', // Übergangseffekt für Animationen

  // Hover-Effekt
  '&:hover': {
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Dunklerer Schatten beim Hover
  },

  // Responsivität für mittlere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5), // Weniger Padding für mittlere Bildschirme
  },

  // Responsivität für kleine Bildschirme
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1), // Noch weniger Padding für kleine Bildschirme
  },
}));

/**
 * **CustomStyledBox**
 * Eine benutzerdefinierte Box-Komponente, die die StyledBox umschließt.
 * - Erlaubt die Einfügung von beliebigen Kindern (children) in die Box.
 *
 * @param {object} children - Die Kinder, die innerhalb der Box angezeigt werden.
 * @returns {JSX.Element} - Eine Box-Komponente mit den angepassten Stilen.
 */
const CustomStyledBox = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default CustomStyledBox;
