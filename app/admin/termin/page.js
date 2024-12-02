"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "../../components/styledComponents/StyledPaper";
import { RedButton, BlueButton, GreenButton } from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei
import {CustomToolbar, formats, germanMessages} from "../../components/styledComponents/StyledCalender"

moment.locale("de");

function AdminTermin() {
  const localizer = momentLocalizer(moment);

<formats/>
  //Farbbestimmung für aktuelle Woche / Kommende Wocher / Über eine Woche 
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
  
  //Beispieldaten
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Belegte Veranstaltung",
      start: new Date(2024, 10, 29, 10, 0),
      end: new Date(2024, 10, 29, 12, 0),
      description: "Dies ist eine belegte Veranstaltung.",
    },
    {
      id: 2,
      title: "Zeitnah anstehende Veranstaltung",
      start: new Date(2024, 10, 28, 14, 0),
      end: new Date(2024, 10, 28, 16, 0),
      description: "Diese Veranstaltung findet bald statt.",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventActionModalOpen, setEventActionModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);


  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

  const [newEventModalOpen, setNewEventModalOpen] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      title: "",
      description: "",
      start: slotInfo.start,
      end: moment(slotInfo.start).add(1, "hours").toDate(),
    });
    setNewEventModalOpen(true);
  };

  const handleAddNewEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: prevEvents.length + 1, ...newEvent },
      ]);
      setNewEventModalOpen(false);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventActionModalOpen(true);
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== selectedEvent.id));
    setEventActionModalOpen(false);
  };

  const handleRescheduleEvent = (newStart, newEnd) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, start: newStart, end: newEnd }
          : event
      )
    );
    setEventActionModalOpen(false);
    setRescheduleModalOpen(false);
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
        onSelectEvent={handleSelectEvent} // Handler für bestehende Events
        onSelectSlot={handleSelectSlot} // Handler für neue Events
      />

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <BlueButton variant="contained" onClick={handleDownloadPDF}>
          PDF Download
        </BlueButton>
        <GreenButton variant="contained" onClick={handleDownloadICS}>
          .ics Download
        </GreenButton>
      </Box>

      {/* Modal für neues Event */}
      <Modal
        open={newEventModalOpen}
        onClose={() => setNewEventModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300, // Kleinere Breite
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3, // Innenabstand
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Neuen Termin anlegen
          </Typography>
          <TextField
            label="Titel"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Beschreibung"
            fullWidth
            multiline
            rows={2}
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Beginn (Uhrzeit)"
            type="time"
            fullWidth
            value={newEvent.start ? moment(newEvent.start).format("HH:mm") : ""}
            onChange={(e) => {
              const newStart = moment(newEvent.start)
                .set("hour", e.target.value.split(":")[0])
                .set("minute", e.target.value.split(":")[1])
                .toDate();
              setNewEvent({ ...newEvent, start: newStart });
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ende (Uhrzeit)"
            type="time"
            fullWidth
            value={newEvent.end ? moment(newEvent.end).format("HH:mm") : ""}
            onChange={(e) => {
              const newEnd = moment(newEvent.end)
                .set("hour", e.target.value.split(":")[0])
                .set("minute", e.target.value.split(":")[1])
                .toDate();
              setNewEvent({ ...newEvent, end: newEnd });
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddNewEvent}>
            Speichern
          </Button>
        </Box>
      </Modal>

      {/* Modal für bestehende Events */}
      <Modal
        open={eventActionModalOpen}
        onClose={() => setEventActionModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300, // Kleinere Breite
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {selectedEvent?.title}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {selectedEvent?.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <RedButton variant="contained" onClick={handleDeleteEvent}>
              Stornieren
            </RedButton>
            <BlueButton
              variant="contained"
              onClick={() => setRescheduleModalOpen(true)}
            >
              Verschieben
            </BlueButton>
          </Box>
        </Box>
      </Modal>

      {/* Modal für Verschieben */}
      <Modal
        open={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Termin verschieben
          </Typography>
          <TextField
            label="Neues Datum (Start)"
            type="date"
            fullWidth
            value={selectedEvent?.start ? moment(selectedEvent.start).format("YYYY-MM-DD") : ""}
            onChange={(e) => {
              const newStart = moment(selectedEvent.start)
                .set("year", e.target.value.split("-")[0])
                .set("month", e.target.value.split("-")[1] - 1)
                .set("date", e.target.value.split("-")[2])
                .toDate();
              setSelectedEvent({ ...selectedEvent, start: newStart });
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Neue Uhrzeit (Start)"
            type="time"
            fullWidth
            value={selectedEvent?.start ? moment(selectedEvent.start).format("HH:mm") : ""}
            onChange={(e) => {
              const newStart = moment(selectedEvent.start)
                .set("hour", e.target.value.split(":")[0])
                .set("minute", e.target.value.split(":")[1])
                .toDate();
              setSelectedEvent({ ...selectedEvent, start: newStart });
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Neues Datum (Ende)"
            type="date"
            fullWidth
            value={selectedEvent?.end ? moment(selectedEvent.end).format("YYYY-MM-DD") : ""}
            onChange={(e) => {
              const newEnd = moment(selectedEvent.end)
                .set("year", e.target.value.split("-")[0])
                .set("month", e.target.value.split("-")[1] - 1)
                .set("date", e.target.value.split("-")[2])
                .toDate();
              setSelectedEvent({ ...selectedEvent, end: newEnd });
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Neue Uhrzeit (Ende)"
            type="time"
            fullWidth
            value={selectedEvent?.end ? moment(selectedEvent.end).format("HH:mm") : ""}
            onChange={(e) => {
              const newEnd = moment(selectedEvent.end)
                .set("hour", e.target.value.split(":")[0])
                .set("minute", e.target.value.split(":")[1])
                .toDate();
              setSelectedEvent({ ...selectedEvent, end: newEnd });
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleRescheduleEvent(selectedEvent.start, selectedEvent.end);
            }}
          >
            Speichern
          </Button>
        </Box>
      </Modal>
    </StyledPaper>
  );
}

export default AdminTermin;
