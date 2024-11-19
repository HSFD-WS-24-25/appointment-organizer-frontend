"use client";

import SidebarUser from '../../components/SidebarUser';
import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Avatar, Typography, Paper } from '@mui/material';

function UserProfile() {
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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100vh', backgroundColor: '#white', color: '#fff' }}>
      <SidebarUser />
      <Box sx={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column', color: 'black'}}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: { xs: 'center', sm: 'left' }, marginBottom: 4 }}>
          Profil
        </Typography>

        {/* Profile Image Section */}
        <Box
          component={Paper}
          elevation={4}
          sx={{
            maxWidth: { xs: '100%', sm: '1000px' },
            width: '100%',
            margin: "auto",
            marginTop: 6,
            padding: 4,
            borderRadius: 3,
            bgcolor: '#ffffff',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Avatar src={profileImage} sx={{ width: 120, height: 120, marginRight: { sm: 2, xs: 0 }, marginBottom: { xs: 2, sm: 0 } }} />
            <Button
              variant="outlined"
              component="label"
              sx={{ color: '#333', borderColor: '#333' }}
            >
              Profilbild ändern
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Box>

          {/* Personal Information Section */}
          <Box component="form" sx={{ display: 'grid', gap: 3, width: '100%' }}>
            <TextField label="Name" variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }} />
            <TextField label="Vorname" variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }} />
            <TextField label="Personalnummer" variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }} />
            <TextField label="E-Mail" variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }} />
            <TextField label="Telefonnummer" variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }} />
          </Box>

          {/* Save Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              gap: 2,
              marginTop: 4,
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: 150, fontWeight: 'bold', textTransform: 'none', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
              onClick={handleSaveClick}
            >
              Änderungen speichern
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Save Confirmation Dialog */}
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

export default UserProfile;
