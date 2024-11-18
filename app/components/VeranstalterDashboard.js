"use client";

import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, TextField, Checkbox, FormControlLabel, InputAdornment, Grid } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';

function UserDashboard() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [checkedOnline, setCheckedOnline] = useState(false);
  const [checkedInPerson, setCheckedInPerson] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };
  
  const handleLogoutCancel = () => {
      setOpenLogoutDialog(false);
  };

  const getInvitesList = () => {
    router.push('/invites');
  };
    
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
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 3 }}>
        <Box sx={{ width: '100%', maxWidth: 2000, padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Veranstaltungserstellung
          </Typography>

          {/* Event Image Placeholder */}
          <Box sx={{ border: '1px solid #ccc', height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="caption">Veranstaltungsbild hochladen</Typography>
          </Box>

          {/* Event Details Form */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Veranstaltungstitel" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField label="Anzahl von Teilnehmern" type="number" defaultValue={3} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Anzahl von Begleitern" type="number" defaultValue={3} fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Uhrzeit: Von"
                type="time"
                defaultValue="09:00"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Uhrzeit: Bis"
                type="time"
                defaultValue="18:00"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>
                }}
              />
            </Grid>

            {/* Location Options */}
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={checkedInPerson} onChange={(e) => setCheckedInPerson(e.target.checked)} />}
                label="Vor Ort"
              />
              <TextField label="Adresse" fullWidth disabled={!checkedInPerson} />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={checkedOnline} onChange={(e) => setCheckedOnline(e.target.checked)} />}
                label="Online"
              />
              <TextField label="Link Eintragen" fullWidth disabled={!checkedOnline} />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Beschreibung"
                placeholder="Beschreiben Sie die Veranstaltung ..."
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            {/* Date Selection */}
            <Grid item xs={6}>
              <TextField
                label="Terminauswahl"
                type="date"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Anmeldefrist"
                type="date"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>
                }}
              />
            </Grid>

            {/* Invitation List Button */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
              <Button onClick={getInvitesList} variant="contained" color="primary">
                Einladungsliste
              </Button>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button variant="contained" color="error">Abbrechen</Button>
              <Button variant="contained" color="info">Vorschau</Button>
              <Button variant="contained" color="success">Speichern</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Abmelden</DialogTitle>
        <DialogContent>
          <DialogContentText>Möchten Sie sich wirklich abmelden?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">Nein</Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>Ja</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserDashboard;