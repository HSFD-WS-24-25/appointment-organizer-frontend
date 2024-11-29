"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "../components/styledComponents/StyledButton";
import DesignTitel from "../components/styledComponents/DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei
import "moment/locale/de";
import {CustomToolbar, formats, germanMessages} from "../components/styledComponents/StyledCalender"

moment.locale("de");

const Dashboard = () => {
  const localizer = momentLocalizer(moment);
  const router = useRouter();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Belegte Veranstaltung",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 12, 0),
      type: "booked",
      description: "Dies ist eine belegte Veranstaltung.",
      location: "Berlin",
    },
    {
      id: 2,
      title: "Zeitnah anstehende Veranstaltung",
      start: new Date(2024, 10, 28, 14, 0),
      end: new Date(2024, 10, 28, 16, 0),
      type: "upcoming",
      description: "Diese Veranstaltung findet bald statt.",
      location: "München",
    },

    {
      id: 3,
      title: "Über eine Woche zeit",
      start: new Date(2024, 11, 12, 14, 0),
      end: new Date(2024, 11, 12, 16, 0),
      type: "upcoming",
      description: "Diese Veranstaltung findet bald statt.",
      location: "München",
    },
    {
      id: 4,
      title: "Innerhalb einer Woche",
      start: new Date(2024, 11, 3, 14, 0),
      end: new Date(2024, 11, 3, 16, 0),
      type: "upcoming",
      description: "Diese Veranstaltung findet bald statt.",
      location: "München",
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMouseLeave = () => {
    setHoveredEvent(null);
    setDialogOpen(false);
  };

  const calculateColor = (event) => {
    const now = moment();
    const eventStart = moment(event.start);
    const diffDays = eventStart.diff(now, "days");

    if (diffDays <= 0) return "red";
    if (diffDays <= 7) return "orange";
    return "green";
  };

  const eventPropGetter = (event) => {
    const color = calculateColor(event);
    return {
      style: {
        backgroundColor: color,
        color: "white",
      },
    };
  };

  const handleMenuOpen = (event, eventId) => {
    setAnchorEl(event.currentTarget);
    setSelectedEventId(eventId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEventId(null);
  };

  const handleOptionClick = (option) => {
    if (option === "Termin stornieren") {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEventId));
    }
    handleMenuClose();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Veranstaltungskalender", 10, 10);

    events.forEach((event, index) => {
      const start = moment(event.start).format("DD.MM.YYYY HH:mm");
      const end = moment(event.end).format("DD.MM.YYYY HH:mm");
      doc.text(
        `${index + 1}. ${event.title} (${start} - ${end}): ${event.description}`,
        10,
        20 + index * 10
      );
    });

    doc.save("kalender.pdf");
  };

  const handleDownloadICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\n";
    events.forEach((event) => {
      const start = moment(event.start).utc().format("YYYYMMDDTHHmmss") + "Z";
      const end = moment(event.end).utc().format("YYYYMMDDTHHmmss") + "Z";
      icsContent += `BEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nDTSTART:${start}\nDTEND:${end}\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar" });
    saveAs(blob, "kalender.ics");
  };


  return (
    <StyledPaper>
      <DesignTitel>Dashboard</DesignTitel>

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
            <Button variant="outlined" onClick={(e) => handleMenuOpen(e, event.id)}>
              Optionen
            </Button>
          </Card>
        ))}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleOptionClick("Veranstaltungsdaten")}>
          Veranstaltungsdaten
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("Bearbeiten")}>Bearbeiten</MenuItem>
        <MenuItem onClick={() => handleOptionClick("Termin stornieren")}>
          Termin stornieren
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleMouseLeave}>
        <DialogTitle>Termin Details</DialogTitle>
        <DialogContent>
          {hoveredEvent && (
            <>
              <Typography variant="h6">{hoveredEvent.title}</Typography>
              <Typography>Ort: {hoveredEvent.location}</Typography>
              <Typography>
                Datum: {moment(hoveredEvent.start).format("DD.MM.YYYY HH:mm")} -{" "}
                {moment(hoveredEvent.end).format("HH:mm")}
              </Typography>
              <Typography>Beschreibung: {hoveredEvent.description}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>

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
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        toolbar
        components={{
          toolbar: CustomToolbar, // Benutzerdefinierte Toolbar verwenden
        }}
        defaultDate={new Date()}
        formats={formats}
        messages={germanMessages}
        eventPropGetter={eventPropGetter}
      />

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <GreenButton variant="contained" color="primary" onClick={handleDownloadPDF}>
          PDF Download
        </GreenButton>
        <RedButton variant="contained" color="secondary" onClick={handleDownloadICS}>
          .ics Download
        </RedButton>
        <BlueButton onClick={() => router.push("/user/createEvent")}>
          Veranstaltung erstellen
        </BlueButton>
      </Box>
    </StyledPaper>
  );
};

export default Dashboard;
