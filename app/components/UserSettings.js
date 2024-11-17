"use client";

import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

function UserSettings() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };

  const handleUserProfilClick = () => {
    router.push('/userProfile');
  };

  const handleUserSettingsClick = () => {
    router.push('/userSettings');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  {/* Einstellungen */ }
  const handleSaveChangesClick = (event) => {
    alert("Änderungen erfolgreich gespeichert.");
  }

  const handleGoBackClick = (event) => {
    router.push("/user");
  }

  const [language, setLanguage] = React.useState('');

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const [timezone, setTimezone] = React.useState('');

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
            <ListItemText primary="Meine Teilnahmen" />
          </ListItemButton>
        </List>
        <List>
          <ListItemButton onClick={handleUserProfilClick}>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
          <ListItemButton onClick={handleUserSettingsClick}>
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

      {/* Einstellungen */}
      <Box sx={{ flex: 1, justifyContent: "center", backgroundColor: '#f5f5f5' }}>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", padding: 3, fontSize: 30 }}>
          <h1>Einstellungen</h1>
        </Box>
        <div>
          <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
            <FormControl fullWidth>
              <InputLabel id="language-label">Sprache</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={language}
                label="Language"
                onChange={handleChangeLanguage}
              >
                <MenuItem value="German">Deutsch</MenuItem>
                <MenuItem value="English">Englisch</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
            <FormControl fullWidth>
              <InputLabel id="timezone-label">Zeitzone</InputLabel>
              <Select
                labelId="timezone-label"
                id="timezone"
                value={timezone}
                label="Timezone"
                onChange={handleChangeTimezone}
              >
                <MenuItem value="CET">CET</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        {/* Buttons */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", padding: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleGoBackClick} variant="outlined" color="error">
              Zurück
            </Button>
            <Button onClick={handleSaveChangesClick} variant="contained" color="success">
              Änderungen speichern
            </Button>
          </Stack>
        </Box>

      </Box>

      {/* Logout-Bestätigungsdialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
      >
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

export default UserSettings;