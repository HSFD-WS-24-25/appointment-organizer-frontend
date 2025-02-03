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
import { BlueButton, StyledDeleteButton, StyledEditButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useFetchEvents } from "@/app/hooks/useFetchEvents"
import { useDeleteEvent } from "@/app/hooks/useDeleteEvent"
import { generateBasePath } from "@/app/components/Sidebar";

function EventCard({ event, view }) {
  const { deleteEvent } = useDeleteEvent(); // Importiere den Hook
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen
  const { user, authError, isLoading, events, fetchError } = useFetchEvents(); 
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleOpenTranslateDialog = () => {
    const text = event.description;
    console.log(text+"Übersetzen");
    setIsTranslateOpen(true);
  };

  const handleCloseTranslateDialog = () => {
    setIsTranslateOpen(false);
  };

  const handleEditEvent = () => {
    const basePath = generateBasePath(userInfo, user); // Determine the base path
    router.push(`${basePath}/editEvent/${event.id}`); // Navigate to /user/createEvent
  };

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
<Box sx={{ textAlign: "left", flex: 9, paddingRight: 2 }}>
  <p style={{ margin: 0, fontWeight: "bold" }}>{event.name}</p>
  <div
    dangerouslySetInnerHTML={{ __html: event.description }}
  />
</Box>


        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
          <Button size="small" startIcon={<EditIcon />} onClick={handleEditEvent}>
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
        height: 250,
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
        <StyledEditButton onClick={handleEditEvent} />
      </Box>

      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <StyledDeleteButton onClick={handleOpen} />
      </Box>

      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
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

      <>
      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          width: "90%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",

        }}
      >
        <Typography variant="h6" component="p" sx={{ marginBottom: 1 }}>
          {event.name}
        </Typography>
        <Box>
  <div
    dangerouslySetInnerHTML={{
      __html: event.description.split(".")[0] + ".",
    }}
  />
</Box>

        <Typography variant="body2" color="textSecondary" noWrap>
          {new Date(event.date_start).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}{" "}
          Uhr -{" "}

          {new Date(event.date_end).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          Uhr
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{ marginTop: 1 }}
          onClick={handleOpenDialog}
        >
          Mehr anzeigen
        </Button>
      </Box>

      {/* Dialog for full details */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{event.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Start:{" "}
            {new Date(event.date_start).toLocaleString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ende:{" "}
            {new Date(event.date_end).toLocaleString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ort: {event.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Beschreibung:
            <div
  dangerouslySetInnerHTML={{
    __html: event.description
  }}
/>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenTranslateDialog} variant="outlined">
            Übersetzen
          </Button>
          <Button onClick={handleCloseDialog} variant="outlined">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isTranslateOpen} onClose={handleCloseTranslateDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Übersetzung</DialogTitle>
        <DialogContent>
            <div
  dangerouslySetInnerHTML={{
    __html: "Some translated text"
  }}
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTranslateDialog} variant="outlined">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
    </Paper>
  );
}

function UserDashboard() {
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen

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
    const basePath = generateBasePath(userInfo, user); // Determine the base path
    router.push(`${basePath}/createEvent`); // Navigate to /user/createEvent
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>


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
          <DesignTitel>Veranstaltungen:</DesignTitel>
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
