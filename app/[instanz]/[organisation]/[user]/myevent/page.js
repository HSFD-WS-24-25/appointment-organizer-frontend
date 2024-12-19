"use client";

import React, { useState } from "react";
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

function EventCard({ event, view }) {
  const count = event.participants || 0;
  let color = "default";
  if (count > 20) color = "green";
  else if (count > 10) color = "orange";
  else if (count > 0) color = "red";

  if (view === "list") {
    // List View Rendering
    return (
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          marginBottom: 2,
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
          
        />
        <Box>
        <h3>{event.name}</h3>
        </Box>
        <Box>
          <Button size="small" startIcon={<EditIcon />}>
            Bearbeiten
          </Button>
          <Button size="small" color="error" startIcon={<DeleteIcon />}>
            Löschen
          </Button>
        </Box>
      </ListItem>
    );
  }

  // Grid View Rendering
  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ddd",
      }}
      elevation={3}
    >
      <Box sx={{ position: "absolute", top: 8, left: 8 }}>
        <Button>
          <Badge badgeContent={<EditIcon fontSize="small" />} color="primary" />
        </Button>
      </Box>
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <Button>
          <Badge
            badgeContent={<DeleteIcon fontSize="small" />}
            color="error"
          />
        </Button>
      </Box>
      <Box sx={{ position: "absolute", bottom: 8, right: 30 }}>
        <Badge
          badgeContent={count}
          color={color}
          showZero
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
      <Box>
        {event.name}
        {event.description}
      </Box>
    </Paper>
  );
}

function UserDashboard() {
  const [view, setView] = useState("grid");
  const router = useRouter();

  // Fetch events from API
  const { user, error: authError, isLoading } = useUser();
  const path = "/api/events";
  const method = "GET";
  const { data: events, error: fetchError } = useFetchApiData(user, path, method);

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
    router.push("/user/createEvent"); // Navigate to /user/createEvent
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
