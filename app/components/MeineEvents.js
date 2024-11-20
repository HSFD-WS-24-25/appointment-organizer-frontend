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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EventCard({ count }) {
  let color = 'default';
  if (count > 20) color = 'green';
  else if (count > 10) color = 'orange';
  else if (count > 0) color = 'red';

  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%', // Responsive width
        height: 200, // Adjusted height for better responsiveness
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
      }}
      elevation={3}
    >
      <Box sx={{ position: 'absolute', top: 8, left: 30 }}>
        <Badge badgeContent={<EditIcon fontSize="small" />} color="primary" />
      </Box>
      <Box sx={{ position: 'absolute', top: 8, right: 30 }}>
        <Badge badgeContent={<DeleteIcon fontSize="small" />} color="error" />
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

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const eventCounts = [60, 20, 30, 10, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
        height: '100vh',
      }}
    >


      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: { xs: 2, sm: 3 },
          overflowY: 'auto',
        }}
      >
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
          <Button variant="outlined" size="large">
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

        {/* Grid of Events */}
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Stack cards on small screens
          }}
        >
          {eventCounts.map((count, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <EventCard count={count} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default UserDashboard;
