"use client";

import React, { useState,useEffect, useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Modal,
  Typography,
  TextField,
  useMediaQuery
} from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import { RedButton, BlueButton, GreenButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei
import {CustomToolbar, formats, germanMessages} from "@/app/components/styledComponents/StyledCalender"
import { useFetchEvents } from "@/app/hooks/useFetchEvents"



moment.locale("de");

function AdminDashboard() {
  const localizer = momentLocalizer(moment);
  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen
  const { user, authError, isLoading, events, fetchError } = useFetchEvents();
  const [announcements, setAnnouncements] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // Standardmäßig sichtbar
  

  const formattedEvents = events?.map((event) => ({
    id: event.id,
    title: event.name, // Name der Veranstaltung
    start: new Date(event.date_start), // Startzeit als Date-Objekt
    end: new Date(event.date_end), // Endzeit als Date-Objekt
    description: event.description, // Beschreibung der Veranstaltung
    location: event.location, // Veranstaltungsort
  })) || [];

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
  


  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventActionModalOpen, setEventActionModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);



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
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Veranstaltungskalender", 10, 20);
  
    let yPosition = 40;
    const lineHeight = 10;
  
    events?.forEach((event) => {
      // Check if event has passed
      const isPastEvent = new Date(event.date_end) < new Date();
      
      // Set background color based on event status
      if (isPastEvent) {
        // Light red background for past events (#ffcdd2)
        doc.setFillColor(255, 205, 210);
      } else {
        // Light green background for upcoming events (#c8e6c9)
        doc.setFillColor(200, 230, 201);
      }
  
      // Add colored rectangle background
      doc.rect(10, yPosition - 5, 190, lineHeight * 3, 'F');
      
      // Add event details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text(event.name, 10, yPosition);
      yPosition += lineHeight;
  
      doc.setFontSize(12);
      const startDate = new Date(event.date_start).toLocaleDateString();
      const endDate = new Date(event.date_end).toLocaleDateString();
      doc.text(`${startDate} - ${endDate}`, 10, yPosition);
      yPosition += lineHeight * 2;
    });
  
    doc.save("veranstaltungen.pdf");
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

      <Box>
      <List>
  {events?.filter(event => new Date(event.date_end) > new Date()).map((event) => (
    <ListItem 
      key={event.id}
      sx={{
        backgroundColor: '#c8e6c9', // Green background for upcoming events
        borderRadius: '4px',
        marginBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <ListItemText
        primary={event.name}
        secondary={`${new Date(event.date_start).toLocaleDateString()} - ${new Date(event.date_end).toLocaleDateString()}`}
      />
    </ListItem>
  ))}
</List>
      </Box>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
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
      width: "80%",
      maxWidth: "1080px",
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
      p: 3,
    }}
  >
    <Typography variant="h6" sx={{ marginBottom: 2 }}>
      {selectedEvent?.name}
    </Typography>
    
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography><strong>Start:</strong></Typography>
        <Box sx={{
          padding: 1,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: 2
        }}>
          {new Date(selectedEvent?.start).toLocaleString()}
        </Box>

        <Typography><strong>Ort:</strong></Typography>
        <Box sx={{
          padding: 1,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}>
          {selectedEvent?.location}
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Typography><strong>Ende:</strong></Typography>
        <Box sx={{
          padding: 1,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: 2
        }}>
          {new Date(selectedEvent?.end).toLocaleString()}
        </Box>

        <Typography><strong>Beschreibung:</strong></Typography>
        <Box sx={{
          padding: 1,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "4px",
          maxHeight: "200px",
          overflowY: "auto"
        }}
        dangerouslySetInnerHTML={{ __html: selectedEvent?.description }}
        />
      </Grid>
    </Grid>

    <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}>
      <Button variant="outlined" onClick={() => setEventActionModalOpen(false)}>
        Schließen
      </Button>
    </Box>
  </Box>
</Modal>

    </StyledPaper>
  );
}

export default AdminDashboard;
