"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/navigation';

function EventCard({ count, view }) {
  let color = 'default';
  if (count > 20) color = 'green';
  else if (count > 10) color = 'orange';
  else if (count > 0) color = 'red';

  if (view === 'list') {
    // List View Rendering
    return (
      <ListItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: 2,
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <EventIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Event ${count}`} secondary={`Teilnehmer: ${count}`} />
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
        position: 'relative',
        width: '100%',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
      }}
      elevation={3}
    >
      <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
        <Button><Badge badgeContent={<EditIcon fontSize="small" />} color="primary" /></Button>
      </Box>
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
      <Button> <Badge badgeContent={<DeleteIcon fontSize="small" />} color="error" /> </Button>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 8, right: 30 }}>
        <Badge
          badgeContent={count}
          color={color}
          showZero
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor:
                color === 'green' ? '#4caf50' : color === 'orange' ? '#ffa726' : '#f44336',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Paper>
  );
}

function UserDashboard() {
  const [view, setView] = useState('grid');
  const router = useRouter();

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleCreateEvent = () => {
    router.push('/user/createEvent'); // Navigate to /user/createEvent
  };

  const eventCounts = [60, 20, 30, 10, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Box>
      {/* Main Content */}
      <Box>
        {/* Alert Message */}
        <Alert severity="warning" sx={{ marginBottom: 3 }}>
          Die Veranstaltung XU ist gelöscht
        </Alert>

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            marginBottom: 2,
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="h5">Meine Veranstaltungen:</Typography>
          <Button variant="outlined" size="large" onClick={handleCreateEvent}>
            Neue Veranstaltung
          </Button>
        </Box>

        {/* View Toggle & File Creation Link */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
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
        {view === 'grid' ? (
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            {eventCounts.map((count, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <EventCard count={count} view={view} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <List>
            {eventCounts.map((count, index) => (
              <React.Fragment key={index}>
                <EventCard count={count} view={view} />
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default UserDashboard;
