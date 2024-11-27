"use client"
import React, { useState } from "react";
import { Box, Button, Card, CardContent, Menu, MenuItem, Typography, Modal, TextField } from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useRouter } from 'next/navigation';
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../components/styledComponents/StyledPaper";
import { BlueButton } from "../components/styledComponents/StyledButton";
import DesignTitel from "../components/styledComponents/DesignTitel";

const Dashboard = () => {
  const localizer = momentLocalizer(moment);
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push('/user/createEvent'); // Navigate to /user/createEvent
  };

  // Initiale Events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Belegte Veranstaltung",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 12, 0),
      type: "booked",
      description: "Dies ist eine belegte Veranstaltung.",
    },
    {
      id: 2,
      title: "Zeitnah anstehende Veranstaltung",
      start: new Date(2024, 10, 28, 14, 0),
      end: new Date(2024, 10, 28, 16, 0),
      type: "upcoming",
      description: "Diese Veranstaltung findet bald statt.",
    },
  ]);

  // State-Management
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

  // Optionen-Menü
  const handleMenuOpen = (event, eventId) => {
    setAnchorEl(event.currentTarget);
    setSelectedEventId(eventId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEventId(null);
  };

  const handleOptionClick = (option) => {
    console.log(`Option "${option}" für Event ID ${selectedEventId} gewählt`);
    handleMenuClose();
  };

  // Hinzufügen eines neuen Termins
  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: moment(slotInfo.start).add(1, "hours").toDate(),
    });
    setNewEventModalOpen(true);
  };

  const handleNewEventChange = (field, value) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: prevEvents.length + 1, ...newEvent, type: "myEvent" },
      ]);
      setNewEventModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        start: null,
        end: null,
      });
    }
  };

  // Event-Styling
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
      <DesignTitel>Dashboard</DesignTitel>

      {/* Übersicht Veranstaltungen */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Übersicht Veranstaltungen
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}>
        {events.map((event) => (
          <Card key={event.id} sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2">Start: {new Date(event.start).toLocaleString()}</Typography>
              <Typography variant="body2">Ende: {new Date(event.end).toLocaleString()}</Typography>
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
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        toolbar={true}
        defaultDate={new Date()}
      />

      {/* Modal für neuen Termin */}
      <Modal
        open={newEventModalOpen}
        onClose={() => setNewEventModalOpen(false)}
        aria-labelledby="new-event-title"
        aria-describedby="new-event-description"
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
          <Typography id="new-event-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Neuen Termin anlegen
          </Typography>
          <TextField
            label="Titel"
            fullWidth
            value={newEvent.title}
            onChange={(e) => handleNewEventChange("title", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Beschreibung"
            fullWidth
            multiline
            rows={2}
            value={newEvent.description}
            onChange={(e) => handleNewEventChange("description", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Startzeit"
            type="datetime-local"
            fullWidth
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              handleNewEventChange("start", moment(e.target.value).toDate())
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Endzeit"
            type="datetime-local"
            fullWidth
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              handleNewEventChange("end", moment(e.target.value).toDate())
            }
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddNewEvent}
          >
            Speichern
          </Button>
        </Box>
      </Modal>
      {/* Button für Veranstaltung anlegen */}
      <BlueButton onClick={handleCreateEvent}
      >
        Veranstaltung anlegen
      </BlueButton>
    </StyledPaper>
  );
};

export default Dashboard;
