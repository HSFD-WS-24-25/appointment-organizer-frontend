"use client";
import Sidebar from './Sidebar';
import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Avatar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { ReportProblem } from '@mui/icons-material';

function AdminProfile() {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveClick = () => {
    setOpenSaveDialog(true);
  };

  const handleSaveConfirm = () => {
    setOpenSaveDialog(false);
    alert("Änderungen wurden gespeichert!");
    // Hier kannst du die eigentliche Speichern-Funktion implementieren
  };

  const handleSaveCancel = () => {
    setOpenSaveDialog(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      
      <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: 3 }}>
        <Typography variant="h4">Profil</Typography>
        
        {/* Profilbild und Ändern-Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Avatar src={profileImage} sx={{ width: 100, height: 100, mr: 2 }} />
          <Button 
            variant="outlined" 
            component="label" 
            sx={{ color: '#333', borderColor: '#333' }}
          >
            Profilbild ändern
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Box>

        {/* Persönliche Informationen */}
        <Box component="form" sx={{ display: 'grid', gap: 2, width: '50%' }}>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Vorname" variant="outlined" fullWidth />
          <TextField label="Personalnummer" variant="outlined" fullWidth />
          <TextField label="E-Mail" variant="outlined" fullWidth />
          <TextField label="Telefonnummer" variant="outlined" fullWidth />
        </Box>

        {/* Änderungen speichern Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#333', color: '#fff' }} 
            onClick={handleSaveClick}
          >
            Änderungen speichern
          </Button>
        </Box>
      </Box>

      {/* Änderungen speichern Bestätigungsdialog */}
      <Dialog open={openSaveDialog} onClose={handleSaveCancel}>
        <DialogTitle>Änderungen speichern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchten Sie die Änderungen übernehmen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveCancel} color="primary">Nein</Button>
          <Button onClick={handleSaveConfirm} color="primary" autoFocus>Ja</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProfile;