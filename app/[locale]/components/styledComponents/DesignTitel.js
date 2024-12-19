"use client"
import React from 'react';
import { styled, keyframes } from '@mui/material/styles';

// Animation für den Titel
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled-Komponente für den Titel
const StyledTitle = styled('h1')(({ theme }) => ({
  color: theme.palette.primary.main, // Blaue Farbe basierend auf dem Theme
  fontSize: '2.5rem', // Große Schriftgröße
  fontWeight: 'bold', // Fettschrift
  textAlign: 'center', // Zentrierter Text
  margin: theme.spacing(2, 0), // Abstände oben und unten
  animation: `${slideIn} 0.8s ease-out`, // Einblendeanimation
  position: 'relative', // Für Dekorationselemente notwendig
  '&::after': {
    content: '""', // Leerer Inhalt für die Unterstreichung
    display: 'block',
    backgroundColor: theme.palette.primary.main, // Gleiche Farbe wie der Text
    margin: '10px auto 0', // Zentrierte Position
    animation: `${slideIn} 1s ease-out`, // Gleiche Animation wie beim Titel
  },
}));

const DesignTitel = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default DesignTitel;
