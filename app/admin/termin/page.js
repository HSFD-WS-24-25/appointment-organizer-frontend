"use client";

import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, ToggleButtonGroup, ToggleButton, Typography, Grid, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import StyledPaper from "../../components/styledComponents/StyledPaper";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import {BlueButton,GreenButton ,RedButton} from "../../components/styledComponents/StyledButton";

// Dynamischer Import von react-calendar zur Vermeidung von Hydration-Problemen
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

function AdminTermin() {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month"); // "day" für Wochenansicht, "month" für Monatsansicht

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
  };

  const handleDownloadICS = () => {
    alert("ICS-Datei wird heruntergeladen.");
  };

  const handleDownloadPDF = () => {
    alert("PDF-Datei wird heruntergeladen.");
  };

  const exampleEvents = [
    { day: "Montag", time: "10:00", title: "Projektbesprechung" },
    { day: "Dienstag", time: "14:00", title: "Meeting mit Kunden" },
    { day: "Donnerstag", time: "09:00", title: "Schulung" },
    { day: "Freitag", time: "15:00", title: "Team-Event" },
  ];

  const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

  return (
    <StyledPaper>
      <DesignTitel> Willkommen im Admin-Terminmanagement </DesignTitel>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
        <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
          <ToggleButton value="day">Tagesansicht</ToggleButton>
          <ToggleButton value="month">Monatsansicht</ToggleButton>
          <ToggleButton value="year">Jahresansicht</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {view === "day" ? (
          <Grid container spacing={2} justifyContent="center">
            {daysOfWeek.map((day) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                <StyledPaper>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    {day}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    {exampleEvents
                      .filter((event) => event.day === day)
                      .map((event, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                          <Typography variant="body1">{event.time}</Typography>
                          <Typography variant="body2">{event.title}</Typography>
                        </Box>
                      ))}
                  </Box>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Calendar view={view} onViewChange={setView} onClickDay={handleDateClick} />
        )}
      </Box>

      <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
        <GreenButton onClick={handleDownloadICS}> Liste als .ics herunterladen</GreenButton>
        <BlueButton onClick={handleDownloadPDF}> Liste als PDF herunterladen</BlueButton>
      </Box>

      <Dialog open={openEventDialog} onClose={handleCloseEventDialog}>
        <DialogTitle>Termine am {selectedDate.toLocaleDateString()}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Hier könnten die Informationen zu den Terminen an diesem Tag stehen.</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Beispiel: Meeting um 10:00 Uhr, Projektbesprechung um 14:00 Uhr, etc.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      </StyledPaper>
  );
}

export default AdminTermin;
