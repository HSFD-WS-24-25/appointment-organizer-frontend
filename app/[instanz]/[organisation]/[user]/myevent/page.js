"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Link,
  Paper,
  Badge,
  Grid,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "next/navigation";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import { BlueButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/lib/useFetchApiData";
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren
import {useFetchEvents} from "@/app/hooks/useFetchEvents"
import {useDeleteEvent} from "@/app/hooks/useDeleteEvent"

function EventCard({ event, view }) {
   const { deleteEvent } = useDeleteEvent(); // Importiere den Hook

  const [open, setOpen] = useState(false);

  // Öffnet den Dialog
  const handleOpen = () => setOpen(true);

  // Schließt den Dialog
  const handleClose = () => setOpen(false);

  // Löscht die Veranstaltung
  const handleDelete = async () => {
    const result = await deleteEvent(event.id); // Rufe die Löschfunktion auf
    if (result.success) {
      console.log(result.message);
      // Optional: UI aktualisieren oder Seite neu laden
      window.location.reload();
    } else {
      console.error(result.message);
    }
    handleClose();
  };

  const count = event.capacity || 0;
  let color = "default";
  if (count > 20) color = "green";
  else if (count > 10) color = "orange";
  else if (count > 0) color = "red";

  if (view === "list") {
    return (
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          marginBottom: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <EventIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={event.title || `Event ${event.id}`}
          secondary={`Teilnehmer: ${event.capacity}`}
          sx={{ flex: 1, marginRight: 2 }}
        />

        <Box sx={{ textAlign: "left", flex: 1, paddingRight: 2 }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>{event.name}</p>
          <p style={{ margin: 0 }}>{event.description}</p>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
          <Button size="small" startIcon={<EditIcon />}>
            Bearbeiten
          </Button>
          <Box>
            <Button onClick={handleOpen} size="small" color="error" startIcon={<DeleteIcon />}>
              Löschen
            </Button>
            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Veranstaltung löschen</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Möchten Sie die Veranstaltung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Abbrechen
                </Button>
                <Button
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                  autoFocus
                >
                  Löschen
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </ListItem>
    );
  }

  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ddd",
        borderRadius: 4,
        padding: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      elevation={3}
    >
      <Box sx={{ position: "absolute", top: 8, left: 8 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          sx={{ borderRadius: 4 }}
        >
          Bearbeiten
        </Button>
      </Box>

      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          color="error"
          sx={{ borderRadius: 4 }}
          onClick={handleOpen}
        >
          Löschen
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Veranstaltung löschen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie die Veranstaltung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Abbrechen
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              autoFocus
            >
              Löschen
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box sx={{ position: "absolute", bottom: 8, right: 30 }}>
        <Badge
          badgeContent={count}
          color="primary"
          showZero
          max={count}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor:
                color === "green"
                  ? "#4caf50"
                  : color === "orange"
                  ? "#ffa726"
                  : "#f44336",
              color: "#fff",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          width: "90%",
        }}
      >
        <Typography variant="h6" component="p" sx={{ marginBottom: 1 }}>
          {event.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.description}
        </Typography>
      </Box>
    </Paper>
  );
}

function UserDashboard() {
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext

  // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
  useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);

// Verwende den neuen Hook
const { user, authError, isLoading, events, fetchError } = useFetchEvents();

// Handle loading and errors
if (isLoading) return <div>Loading...</div>;
if (authError) return <div>Error loading user data: {authError.message}</div>;
if (!user) return <div>Please log in</div>;
if (fetchError) return <div>Error fetching events data: {fetchError.message}</div>;


  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleCreateEvent = () => {
    router.push(`${basePath}/createEvent`); // Navigate to /user/createEvent
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>
        {/* Alert Message */}
        <Alert severity="warning" sx={{ marginBottom: 3 }}>
          Die Veranstaltung XU ist gelöscht
        </Alert>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            marginBottom: 2,
            gap: { xs: 1, sm: 0 },
          }}
        >
          <DesignTitel>Meine Veranstaltungen:</DesignTitel>
          <BlueButton onClick={handleCreateEvent}>Neue Veranstaltung</BlueButton>
        </Box>

        {/* View Toggle & File Creation Link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            marginBottom: 3,
          }}
        >
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="View Toggle"
            size="small"
          >
            <ToggleButton value="grid">Grid</ToggleButton>
            <ToggleButton value="list">List</ToggleButton>
          </ToggleButtonGroup>
          <Link href="#" underline="hover">
            .ics Datei erstellen
          </Link>
        </Box>

        {/* Events Display */}
        {view === "grid" ? (
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {events?.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                <EventCard event={event} view={view} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <List>
            {events?.map((event) => (
              <React.Fragment key={event.id}>
                <EventCard event={event} view={view} />
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </StyledPaper>
  );
}

export default UserDashboard;
