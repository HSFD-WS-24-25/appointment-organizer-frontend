"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
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
import StyledPaper from "../../components/styledComponents/StyledPaper";
import {RedButton, BlueButton, GreenButton} from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei


moment.locale("de"); // Setze die Lokalisierung auf Deutsch

function AdminTermin() {
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

  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

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
      <DesignTitel>Terminmanagement</DesignTitel>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginBottom: 4 }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        toolbar={true}
        defaultDate={new Date()}
        formats={formats}
      />

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <BlueButton
          variant="contained"
          onClick={handleDownloadPDF}
        >
          PDF Download
        </BlueButton>
        <GreenButton
          variant="contained"
          onClick={handleDownloadICS}
        >
          .ics Download
        </GreenButton>
      </Box>

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
            value={newEvent.start ? moment(newEvent.start).format(placeholderFormats.start) : ""}
            onChange={(e) =>
              handleNewEventChange("start", moment(e.target.value).toDate())
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Endzeit"
            type="datetime-local"
            fullWidth
            value={newEvent.end ? moment(newEvent.end).format(placeholderFormats.end) : ""}
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
    </StyledPaper>
  );
}

export default AdminTermin;
