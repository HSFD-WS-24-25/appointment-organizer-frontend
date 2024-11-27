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
  Modal,
  TextField,
} from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../components/styledComponents/StyledPaper";
import { BlueButton } from "../components/styledComponents/StyledButton";
import DesignTitel from "../components/styledComponents/DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei
import "moment/locale/de";

moment.locale("de");

const Dashboard = () => {
  const localizer = momentLocalizer(moment);
  const router = useRouter();

  const placeholderFormats = {
    start: "YYYY-MM-DDTHH:mm",
    end: "YYYY-MM-DDTHH:mm",
  };

  const formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    agendaTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    dayHeaderFormat: "dddd, D. MMMM YYYY",
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format("D. MMMM YYYY")} – ${moment(end).format("D. MMMM YYYY")}`,
    monthHeaderFormat: "MMMM YYYY",
  };

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

  // State für das Optionen-Menü
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

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
      handleDeleteEvent(selectedEventId);
    }
    handleMenuClose();
  };

  const germanMessages = {
    allDay: "Ganztägig",
    previous: "Zurück",
    next: "Weiter",
    today: "Heute",
    month: "Monat",
    week: "Woche",
    day: "Tag",
    agenda: "Agenda",
    date: "Datum",
    time: "Zeit",
    event: "Ereignis",
    noEventsInRange: "Keine Ereignisse in diesem Zeitraum.",
    showMore: (total) => `+ ${total} mehr`,
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    console.log(`Termin mit ID ${eventId} wurde entfernt.`);
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
            <Button
              variant="outlined"
              onClick={(e) => handleMenuOpen(e, event.id)}
            >
              Optionen
            </Button>
          </Card>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOptionClick("Veranstaltungsdaten")}>Veranstaltungsdaten</MenuItem>
        <MenuItem onClick={() => handleOptionClick("Bearbeiten")}>Bearbeiten</MenuItem>
        <MenuItem onClick={() => handleOptionClick("Termin stornieren")}>Termin stornieren</MenuItem>
      </Menu>

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
  toolbar={true}
  defaultDate={new Date()}
  formats={formats}
  messages={germanMessages} // Hier wird das `messages`-Objekt übergeben
/>


      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          PDF Download
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDownloadICS}>
          .ics Download
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default Dashboard;
