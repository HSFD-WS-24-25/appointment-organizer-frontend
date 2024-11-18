"use client";

import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, ToggleButtonGroup, ToggleButton, Typography, Grid, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { ReportProblem } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';
import Sidebar from './Sidebar';

// Dynamischer Import von react-calendar zur Vermeidung von Hydration-Problemen
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

function AdminTermin() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month"); // "day" für Wochenansicht, "month" für Monatsansicht

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDownloadICS = () => {
    // Logik zum Erstellen und Herunterladen der .ics-Datei hinzufügen
    alert("ICS-Datei wird heruntergeladen.");
  };

  const handleDownloadPDF = () => {
    // Logik zum Erstellen und Herunterladen der PDF-Datei hinzufügen
    alert("PDF-Datei wird heruntergeladen.");
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
  };

  const renderWeekView = () => {
    // Beispiel-Daten für Termine; diese sollten normalerweise aus einer Datenquelle geladen werden
    const exampleEvents = [
      { day: 'Montag', time: '10:00', title: 'Projektbesprechung' },
      { day: 'Dienstag', time: '14:00', title: 'Meeting mit Kunden' },
      { day: 'Donnerstag', time: '09:00', title: 'Schulung' },
      { day: 'Freitag', time: '15:00', title: 'Team-Event' },
    ];

    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    return (
      <Grid container spacing={2} justifyContent="center">
        {daysOfWeek.map((day) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
            <Paper elevation={3} sx={{ padding: 2, height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>{day}</Typography>
              <Box sx={{ flexGrow: 1 }}>
                {exampleEvents
                  .filter(event => event.day === day)
                  .map((event, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                      <Typography variant="body1">{event.time}</Typography>
                      <Typography variant="body2">{event.title}</Typography>
                    </Box>
                  ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5', padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">Willkommen im Admin-Terminmanagement</Typography>
        
        {/* Toggle for View Selection */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
          >
            <ToggleButton value="day">Tagesansicht</ToggleButton>
            <ToggleButton value="month">Monatsansicht</ToggleButton>
            <ToggleButton value="year">Jahresansicht</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Calendar Component oder Wochenansicht */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {view === 'day' ? (
            renderWeekView()
          ) : (
            <Calendar
              view={view}
              onViewChange={setView}
              onClickDay={handleDateClick} // Öffnet den Dialog beim Klicken auf einen Tag
            />
          )}
        </Box>

        {/* Download Buttons */}
        <Box sx={{ display: 'flex', mt: 3 }}>
          <Button onClick={handleDownloadICS} variant="contained" color="primary" sx={{ mr: 2 }}>
            Liste als .ics herunterladen
          </Button>
          <Button onClick={handleDownloadPDF} variant="contained" color="secondary">
            Liste als PDF herunterladen
          </Button>
        </Box>
      </Box>

      {/* Event Information Dialog */}
      <Dialog open={openEventDialog} onClose={handleCloseEventDialog}>
        <DialogTitle>Termine am {selectedDate.toLocaleDateString()}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Hier könnten die Informationen zu den Terminen an diesem Tag stehen.</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Beispiel: Meeting um 10:00 Uhr, Projektbesprechung um 14:00 Uhr, etc.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog} color="primary">Schließen</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminTermin;