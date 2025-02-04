"use client";
import React from "react";
import { styled, keyframes } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

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
const StyledTitle = styled("h1")(({ theme }) => {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Erkennt mobile Ansicht

  return {
    color: theme.palette.primary.main, // Farbe basierend auf Theme
    fontSize: isMobile ? "1.8rem" : "2.5rem", // Kleinere Schrift für Mobilgeräte
    fontWeight: "bold", // Fettschrift
    textAlign: "center", // Zentrierter Text
    margin: theme.spacing(isMobile ? 1 : 2, 0), // Weniger Abstand für Mobilgeräte
    animation: `${slideIn} 0.8s ease-out`, // Einblendeanimation
    position: "relative", // Für Dekorationselemente notwendig
    "&::after": {
      content: '""', // Leerer Inhalt für die Unterstreichung
      display: "block",
      width: isMobile ? "50px" : "80px", // Kleinere Unterstreichung für Mobilgeräte
      height: "4px",
      backgroundColor: theme.palette.primary.main, // Gleiche Farbe wie der Text
      margin: "10px auto 0", // Zentrierte Position
      animation: `${slideIn} 1s ease-out`, // Gleiche Animation wie beim Titel
    },
  };
});

const DesignTitel = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default DesignTitel;
