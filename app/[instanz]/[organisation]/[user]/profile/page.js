"use client";

import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Avatar } from '@mui/material';
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";

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
            <GreenButton component="label">
              Profilbild ändern
              <input type="file" hidden onChange={handleImageChange} />
            </GreenButton>
          </Box>

          {/* Personal Information Section */}
          <Box component="form" sx={{ display: 'grid', gap: 3, width: '100%' }}>
            <TextField label="Name" variant="outlined" fullWidth/>
            <TextField label="Vorname" variant="outlined" fullWidth  />
            <TextField label="Personalnummer" variant="outlined" fullWidth />
            <TextField label="E-Mail" variant="outlined" fullWidth />
            <TextField label="Telefonnummer" variant="outlined" fullWidth />
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
