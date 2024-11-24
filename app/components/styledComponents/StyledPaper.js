"use client"
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Mehr Padding für einen luftigen Look
  height: 'auto', // Dynamische Höhe
  display: 'flex',
  flexDirection: 'column', // Inhalt in Spalten anordnen
  justifyContent: 'space-between', // Elemente gleichmäßig verteilen
  backgroundColor: theme.palette.background.paper, // Standard Hintergrundfarbe
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Dezenter Schatten für einen modernen Look
  borderRadius: '12px', // Abgerundete Ecken für Eleganz
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Glatter Übergang für Hover-Effekte

  // Responsivität für kleinere Bildschirme
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2), // Weniger Padding
    borderRadius: '10px', // Leicht reduzierte Rundungen
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5), // Noch weniger Padding
    borderRadius: '8px', // Noch geringere Rundungen
  },
}));

export default StyledPaper;
