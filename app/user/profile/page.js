"use client";

import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Avatar, Typography, Paper } from '@mui/material';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";

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
    <StyledPaper >
      <Box >
        <DesignTitel>
          Profil
        </DesignTitel>

        {/* Profile Image Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Avatar src={profileImage} sx={{ width: 120, height: 120, marginRight: { sm: 2, xs: 0 }, marginBottom: { xs: 2, sm: 0 } }} />
            <GreenButton>
              Profilbild ändern
              <input type="file" hidden onChange={handleImageChange} />
            </GreenButton>
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
            <BlueButton onClick={handleSaveClick}>
              Änderungen speichern
            </BlueButton>
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
    </StyledPaper>
  );
}

export default UserProfile;
