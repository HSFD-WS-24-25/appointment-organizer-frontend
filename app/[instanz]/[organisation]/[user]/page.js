"use client";


import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function AdminDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // Standardmäßig sichtbar

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/aapi/create-announcments", {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Daten");
        }
  
        const data = await response.json();
        setAnnouncements(data); // Daten in den State setzen
      } catch (error) {
        console.error("Fehler beim Abrufen der Ankündigungen:", error);
      }
    };
  
    fetchAnnouncements();
  }, []);

  const dashboardAnnouncements = useMemo(() => {
    return announcements.filter(
      (ann) => ann.status === "Active" && ann.target === "Dashboard"
    );
  }, [announcements]);
  
  

  return (
    <Box sx={{display: 'flex', height: '100vh', position: 'relative' }}>
    {/* Pop-up */}
    {showPopup && dashboardAnnouncements.length > 0 && (
      <Box
        sx={{
          position: 'absolute',
          top: 20, // Abstand von oben
          left: '50%',
          transform: 'translateX(-50%)', // Zentrierung
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
          zIndex: 10, // Sicherstellen, dass es im Vordergrund bleibt
          maxWidth: '90%',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          Aktive Ankündigungen
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Titel</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Typ</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Startdatum</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Enddatum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardAnnouncements.map((ann) => (
                <TableRow key={ann.id}>
                  <TableCell>{ann.title}</TableCell>
                  <TableCell>{ann.type}</TableCell>
                  <TableCell>{new Date(ann.startDate).toLocaleString()}</TableCell>
                  <TableCell>{new Date(ann.endDate).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              backgroundColor: '#f50057',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            X
          </button>
        </Box>
      </Box>
    )}
  
    {/* Seite darunter */}
    <Box sx={{ flex: 1, textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">Hallo, das ist eine Testseite!</Typography>
    </Box>
  </Box>
  );
}
