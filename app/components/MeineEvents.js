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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EventIcon from '@mui/icons-material/Event';
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
        width: 350, // Increased width
        height: 350, // Increased height
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
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State for logout dialog

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    // Navigate to the homepage or perform logout actions here
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const eventCounts = [60, 20, 30, 10, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: '#333',
          color: '#ccc',
          paddingTop: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <GroupAddIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Veranstaltung erstellen" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EventAvailableIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Meine Veranstaltungen" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Meine Veranstaltungen als Teilnehmer" />
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Einstellungen" />
          </ListItemButton>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: 3,
          overflowY: 'auto',
        }}
      >
        {/* Alert Message */}
        <Alert severity="warning" sx={{ marginBottom: 3 }}>
          Die Veranstaltung XU ist gelöscht
        </Alert>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h5">Meine Veranstaltungen:</Typography>
          <Button variant="outlined" size="large">Neue Veranstaltung</Button>
        </Box>

        {/* View Toggle & File Creation Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
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
        <Grid container spacing={2}>
          {eventCounts.map((count, index) => (
            <Grid item key={index} xs={3}> {/* Adjusted grid size */}
              <EventCard count={count} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Abmelden</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchten Sie sich wirklich abmelden?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Nein
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserDashboard;