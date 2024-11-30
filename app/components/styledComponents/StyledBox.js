// StyledBox.js
"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Styled-Komponente für die Box
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

// Komponente für die StyledBox
const CustomStyledBox = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default CustomStyledBox;
