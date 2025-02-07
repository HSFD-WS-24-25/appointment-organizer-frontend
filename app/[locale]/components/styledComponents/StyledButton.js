"use client"
import { styled } from '@mui/material/styles';
import { Button, Switch, FormControlLabel } from '@mui/material';
import { useDarkMode } from './DarkMode'
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Blauer Button
export const BlueButton = styled(Button)(({ theme }) => ({
  // Basis-Styles
  padding: theme.spacing(0.7, 1.5), // Vertikales und horizontales Padding für den Button
  textTransform: 'uppercase', // Text in Großbuchstaben
  borderRadius: '5px', // Abgerundete Ecken für Eleganz
  fontWeight: 'bold', // Fettschrift für den Text
  fontSize: '1rem', // Schriftgröße des Textes
  color: theme.palette.primary.contrastText, // Textfarbe (meist Weiß) basierend auf dem Primärfarbenschema
  backgroundColor: theme.palette.primary.main, // Hintergrundfarbe des Buttons (Standard Blau)
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Leichter Schatten für einen 3D-Effekt
  transition: 'all 0.3s ease', // Übergangseffekte für Hover und andere Interaktionen
  cursor: 'pointer',

  // Hover-Effekt
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Dunklere Hintergrundfarbe beim Hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Größerer Schatten für mehr Tiefe
    transform: 'scale(1.05)', // Leichte Vergrößerung beim Hover
  },

  // Active-Zustand (bei Klick)
  '&:active': {
    backgroundColor: theme.palette.primary.dark, // Gleiche dunklere Farbe wie beim Hover
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)', // Weniger Schatten für gedrückten Zustand
  },

  // Deaktivierter Zustand
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground, // Graue Hintergrundfarbe
    color: theme.palette.action.disabled, // Textfarbe für deaktivierte Buttons
    boxShadow: 'none', // Kein Schatten für deaktivierte Buttons
  },

  // Responsivität für mittlere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 2), // Weniger Padding
    fontSize: '0.9rem', // Kleinere Schriftgröße
  },

  // Responsivität für kleine Bildschirme
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.5), // Noch weniger Padding
    fontSize: '0.8rem', // Noch kleinere Schriftgröße
  },
}));

// Orange Button
export const  OrangeButton = styled(Button)(({ theme }) => ({
  // Basis-Styles
  padding: theme.spacing(0.7, 1.5), // Vertikales und horizontales Padding für den Button
  textTransform: 'uppercase', // Text in Großbuchstaben
  borderRadius: '5px', // Abgerundete Ecken für Eleganz
  fontWeight: 'bold', // Fettschrift für den Text
  fontSize: '1rem', // Schriftgröße des Textes
  color: theme.palette.primary.contrastText, // Textfarbe (meist Weiß) basierend auf dem Primärfarbenschema
  backgroundColor: '#ffa500', // Standard Rot als Hintergrundfarbe // Hintergrundfarbe des Buttons (Standard Blau)
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Leichter Schatten für einen 3D-Effekt
  transition: 'all 0.3s ease', // Übergangseffekte für Hover und andere Interaktionen
  cursor: 'pointer',

  // Hover-Effekt
  '&:hover': {
    backgroundColor: '#FF8C00', // Dunklere Hintergrundfarbe beim Hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Größerer Schatten für mehr Tiefe
    transform: 'scale(1.05)', // Leichte Vergrößerung beim Hover
  },

  // Active-Zustand (bei Klick)
  '&:active': {
    backgroundColor: '#FF8C00', // Gleiche dunklere Farbe wie beim Hover
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)', // Weniger Schatten für gedrückten Zustand
  },

  // Deaktivierter Zustand
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground, // Graue Hintergrundfarbe
    color: theme.palette.action.disabled, // Textfarbe für deaktivierte Buttons
    boxShadow: 'none', // Kein Schatten für deaktivierte Buttons
  },

  // Responsivität für mittlere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 2), // Weniger Padding
    fontSize: '0.9rem', // Kleinere Schriftgröße
  },

  // Responsivität für kleine Bildschirme
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.5), // Noch weniger Padding
    fontSize: '0.8rem', // Noch kleinere Schriftgröße
  },
}));

// Roter Button
export const RedButton = styled(Button)(({ theme }) => ({
  // Basis-Styles
  padding: theme.spacing(0.7, 1.5), // Vertikales und horizontales Padding
  textTransform: 'uppercase', // Text in Großbuchstaben
  borderRadius: '5px', // Abgerundete Ecken
  fontWeight: 'bold', // Fettschrift
  fontSize: '1rem', // Schriftgröße
  color: theme.palette.getContrastText('#f44336'), // Textfarbe, passend zur roten Hintergrundfarbe
  backgroundColor: '#f44336', // Standard Rot als Hintergrundfarbe
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Leichter Schatten
  transition: 'all 0.3s ease', // Glatter Übergang
  cursor: 'pointer',

  // Hover-Effekt
  '&:hover': {
    backgroundColor: '#d32f2f', // Dunkleres Rot beim Hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Größerer Schatten
    transform: 'scale(1.05)', // Leichte Vergrößerung
  },

  // Active-Zustand (bei Klick)
  '&:active': {
    backgroundColor: '#d32f2f', // Dunkleres Rot
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)', // Weniger Schatten
  },

  // Deaktivierter Zustand
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground, // Grauer Hintergrund
    color: theme.palette.action.disabled, // Textfarbe für deaktivierte Buttons
    boxShadow: 'none', // Kein Schatten
  },

  // Responsivität für mittlere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 2), // Weniger Padding
    fontSize: '0.9rem', // Kleinere Schriftgröße
  },

  // Responsivität für kleine Bildschirme
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.5), // Noch weniger Padding
    fontSize: '0.8rem', // Noch kleinere Schriftgröße
  },
}));

//Green Button
export const GreenButton = styled(Button)(({ theme }) => ({
  // Basis-Styles
  padding: theme.spacing(0.7, 1.5), // Vertikales und horizontales Padding für den Button
  textTransform: 'uppercase', // Text in Großbuchstaben
  borderRadius: '5px', // Abgerundete Ecken für Eleganz
  fontWeight: 'bold', // Fettschrift für den Text
  fontSize: '1rem', // Schriftgröße des Textes
  color: theme.palette.primary.contrastText, // Textfarbe (meist Weiß) basierend auf dem Primärfarbenschema
  backgroundColor: "green", // Hintergrundfarbe des Buttons (Standard Blau)
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Leichter Schatten für einen 3D-Effekt
  transition: 'all 0.3s ease', // Übergangseffekte für Hover und andere Interaktionen
  cursor: 'pointer',
  
  // Hover-Effekt
  '&:hover': {
    backgroundColor: "#006400", // Dunklere Hintergrundfarbe beim Hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Größerer Schatten für mehr Tiefe
    transform: 'scale(1.05)', // Leichte Vergrößerung beim Hover
  },

  // Active-Zustand (bei Klick)
  '&:active': {
    backgroundColor: theme.palette.primary.dark, // Gleiche dunklere Farbe wie beim Hover
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)', // Weniger Schatten für gedrückten Zustand
  },

  // Deaktivierter Zustand
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground, // Graue Hintergrundfarbe
    color: theme.palette.action.disabled, // Textfarbe für deaktivierte Buttons
    boxShadow: 'none', // Kein Schatten für deaktivierte Buttons
  },

  // Responsivität für mittlere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 2), // Weniger Padding
    fontSize: '0.9rem', // Kleinere Schriftgröße
  },

  // Responsivität für kleine Bildschirme
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.5), // Noch weniger Padding
    fontSize: '0.8rem', // Noch kleinere Schriftgröße
  },
}));

export const ToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          color="primary"
        />
      }
      label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
    />
  );
};



//Start StyledButton
  const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  padding: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: 40,
  overflow: "hidden",
  transition: "width 0.3s ease",
  cursor: 'pointer',
  "&:hover": {
    width: 130, // Button wird breiter
  },
  "&:hover .hover-text": {
    opacity: 1, // Text wird sichtbar
  },
}));

const HoverText = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  opacity: 0,
  transition: "opacity 0.3s ease",
}));

//End StyledButton
export const StyledEditButton = ({onClick}) => (
  <StyledButton
    variant="outlined"
    size="small"
    color="primary"
    onClick={onClick}
  >
    <EditIcon sx={{ flexShrink: 0, marginLeft: "8px" }} />
    <HoverText className="hover-text">Bearbeiten</HoverText>
  </StyledButton>
);

export const StyledDeleteButton = ({onClick}) => (
  <StyledButton
    variant="outlined"
    size="small"
    color="error"
    onClick={onClick}
  >
    <DeleteIcon sx={{ flexShrink: 0, marginLeft: "8px" }} />
    <HoverText className="hover-text">Löschen</HoverText>
  </StyledButton>
);