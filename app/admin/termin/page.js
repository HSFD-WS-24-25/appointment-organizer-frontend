"use client";

import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../../components/styledComponents/StyledPaper";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import { BlueButton, GreenButton, RedButton } from "../../components/styledComponents/StyledButton";

const localizer = momentLocalizer(moment);

function AdminTermin() {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Beispiel-Events
  const events = [
    {
      id: 1,
      title: "Projektbesprechung",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 12, 0),
      description: "Projektbesprechung im Konferenzraum.",
    },
    {
      id: 2,
      title: "Meeting mit Kunden",
      start: new Date(2024, 10, 28, 14, 0),
      end: new Date(2024, 10, 28, 15, 0),
      description: "Kundenmeeting über Zoom.",
    },
    {
      id: 3,
      title: "Team-Event",
      start: new Date(2024, 11, 1, 15, 0),
      end: new Date(2024, 11, 1, 17, 0),
      description: "Teambuilding-Aktivität.",
    },
  ];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
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

  const eventStyleGetter = (event) => {
    let backgroundColor = "blue";
    if (event.title.includes("Projekt")) backgroundColor = "green";
    else if (event.title.includes("Meeting")) backgroundColor = "red";
    else if (event.title.includes("Team")) backgroundColor = "orange";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        color: "white",
        padding: "5px",
        border: "none",
      },
    };
  };

  return (
    <StyledPaper>
      <DesignTitel> Willkommen im Admin-Terminmanagement </DesignTitel>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">Kalenderübersicht</Typography>
      </Box>

      {/* React-Big-Calendar */}
      <Box sx={{ height: 600, marginBottom: 3 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
        />
      </Box>

      <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
        <GreenButton onClick={handleDownloadICS}> Liste als .ics herunterladen</GreenButton>
        <BlueButton onClick={handleDownloadPDF}> Liste als PDF herunterladen</BlueButton>
      </Box>

      {/* Event-Dialog */}
      <Dialog open={openEventDialog} onClose={handleCloseEventDialog}>
        <DialogTitle>
          Termin: {selectedEvent ? selectedEvent.title : "Kein Termin ausgewählt"}
        </DialogTitle>
        <DialogContent>
          {selectedEvent ? (
            <>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Beschreibung: {selectedEvent.description}
              </Typography>
              <Typography variant="body2">
                Start: {selectedEvent.start.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Ende: {selectedEvent.end.toLocaleString()}
              </Typography>
            </>
          ) : (
            <Typography>Keine Details verfügbar.</Typography>
          )}
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
