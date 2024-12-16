"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ListIcon from "@mui/icons-material/ViewList";
import GridIcon from "@mui/icons-material/ViewModule";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";

function MeinEntwurf() {
  const [view, setView] = useState("list");
  const [date, setDate] = useState("");

  // Setze das heutige Datum automatisch
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const events = [
    { id: 1, title: "Veranstaltung 1" },
    { id: 2, title: "Veranstaltung 2" },
    { id: 3, title: "Veranstaltung 3" },
  ];

  const handleIcsFileCreation = () => {
    const content = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Mein Kalender//DE\n" +
      events
        .map(
          (event) =>
            `BEGIN:VEVENT\nUID:${event.id}@mein-kalender\nSUMMARY:${event.title}\nDTSTART:${date.replace(/-/g, "")}\nDTEND:${date.replace(/-/g, "")}\nEND:VEVENT\n`
        )
        .join("") +
      "END:VCALENDAR";

    const blob = new Blob([content], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "events.ics";
    link.click();
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3, display: "flex", flexDirection: "column" }}>
        <DesignTitel >
          Meine Veranstaltungen
        </DesignTitel>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Datum auswählen"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="View toggle"
            >
              <ToggleButton value="list" aria-label="List view">
                <ListIcon />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="Grid view">
                <GridIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <BlueButton>
              .ics Datei erstellen
            </BlueButton>
          </Box>
        </Box>

        {/* Content */}
        {view === "list" ? (
          <Box sx={{borderRadius: "8px", padding: 2 }}>
            {events.map((event) => (
              <Box
                key={event.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 1,
                  marginBottom: 1,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body1">{event.title}</Typography>
                <Box>
                  <IconButton color="primary" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card sx={{ borderRadius: "8px" }}>
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </StyledPaper>
  );
}

export default MeinEntwurf;
