"use client"
import React, { useState } from "react";
import { Box, Button, Card, CardContent, Menu, MenuItem, Typography, Modal } from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../components/styledComponents/StyledButton";
import DesignTitel from "../components/styledComponents/DesignTitel";

const Dashboard = () => {
  const localizer = momentLocalizer(moment);

  // Beispiel-Daten für den Kalender
  const events = [
    {
      id: 1,
      title: "Belegte Veranstaltung",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 12, 0),
      type: "booked", // grün
      description: "Dies ist eine belegte Veranstaltung.",
    },
    {
      id: 2,
      title: "Zeitnah anstehende Veranstaltung",
      start: new Date(2024, 10, 28, 14, 0),
      end: new Date(2024, 10, 28, 16, 0),
      type: "upcoming", // rot
      description: "Diese Veranstaltung findet bald statt.",
    },
    {
      id: 3,
      title: "Meine Veranstaltung",
      start: new Date(2024, 10, 30, 9, 0),
      end: new Date(2024, 10, 30, 11, 0),
      type: "myEvent", // gelb
      description: "Dies ist eine meiner eigenen Veranstaltungen.",
    },
    {
      id: 4,
      title: "Meine Teilnahme",
      start: new Date(2024, 11, 1, 13, 0),
      end: new Date(2024, 11, 1, 15, 0),
      type: "myParticipation", // orange
      description: "Ich nehme an dieser Veranstaltung teil.",
    },
  ];

  const veranstaltungen = [
    { id: 1, name: "Event A", date: "2024-11-30", description: "Beschreibung A" },
    { id: 2, name: "Event B", date: "2024-12-15", description: "Beschreibung B" },
  ];

  // State-Management
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Optionen-Menü
  const handleMenuOpen = (event, eventId) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleOptionClick = (option) => {
    console.log(`Option "${option}" für Event ID ${selectedEvent} gewählt`);
    handleMenuClose();
  };

  // Modal-Handling für Kalender
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  // Event-Styling basierend auf Typ
  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.type) {
      case "booked":
        backgroundColor = "green";
        break;
      case "upcoming":
        backgroundColor = "red";
        break;
      case "myEvent":
        backgroundColor = "yellow";
        break;
      case "myParticipation":
        backgroundColor = "orange";
        break;
      default:
        backgroundColor = "blue";
    }
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        color: "black",
        border: "none",
        padding: "5px",
      },
    };
  };

  return (
    <StyledPaper>
      <DesignTitel>
        Dashboard
      </DesignTitel>

      {/* Übersicht Veranstaltungen */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Übersicht Veranstaltungen
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}>
        {veranstaltungen.map((event) => (
          <Card key={event.id} sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.name}</Typography>
              <Typography variant="body2">Datum: {event.date}</Typography>
              <Typography variant="body2">{event.description}</Typography>
            </CardContent>
            <Button
              variant="outlined"
              onClick={(e) => handleMenuOpen(e, event.id)}
            >
              Optionen
            </Button>
          </Card>
        ))}
      </Box>

      {/* Menü für Optionen */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOptionClick("Veranstaltungsdaten")}>Veranstaltungsdaten</MenuItem>
        <MenuItem onClick={() => handleOptionClick("Bearbeiten")}>Bearbeiten</MenuItem>
        <MenuItem onClick={() => handleOptionClick("Termin stornieren")}>Termin stornieren</MenuItem>
      </Menu>

      {/* Veranstaltungskalender */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Veranstaltungskalender
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginBottom: 4 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick} // Klick auf Event
        views={[Views.MONTH, Views.WEEK, Views.DAY]} // Erlaube mehrere Ansichten
        defaultView={Views.MONTH} // Standardansicht: Monat
        toolbar={true} // Toolbar aktivieren
        defaultDate={new Date()} // Startdatum setzen
      />

      {/* Modal für Event-Details */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="event-details-title"
        aria-describedby="event-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedEvent ? (
            <>
              <Typography id="event-details-title" variant="h6" component="h2">
                {selectedEvent.title}
              </Typography>
              <Typography id="event-details-description" sx={{ mt: 2 }}>
                {selectedEvent.description}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Start: {new Date(selectedEvent.start).toLocaleString()}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Ende: {new Date(selectedEvent.end).toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleCloseModal}
              >
                Schließen
              </Button>
            </>
          ) : (
            <Typography>Keine Details verfügbar.</Typography>
          )}
        </Box>
      </Modal>

      {/* Button für Veranstaltung anlegen */}
      <BlueButton
      >
        Veranstaltung anlegen
      </BlueButton>
    </StyledPaper>
  );
};

export default Dashboard;
