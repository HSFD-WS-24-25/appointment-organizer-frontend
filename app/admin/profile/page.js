"use client";

import React, { useState } from 'react';
import { Box,   Button,  Avatar, Typography, Paper } from '@mui/material';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import {StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions} from "../../components/styledComponents/StyledDialog";
import {StyledTextField} from "../../components/styledComponents/StyledTextField";


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
    <StyledPaper >
      <Box>
        <DesignTitel> Profil </DesignTitel>
        {/* Profile Image Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Avatar src={profileImage} sx={{ width: 120, height: 120, marginRight: { sm: 2, xs: 0 }, marginBottom: { xs: 2, sm: 0 } }} />
            <GreenButton   variant="outlined" component="label">
              Profilbild ändern
              <input type="file" hidden onChange={handleImageChange} />
            </GreenButton>
          </Box>

          {/* Personal Information Section */}
          <Box component="form" sx={{ display: 'grid', gap: 3, width: '100%' }}>


            <StyledTextField label="Name" variant="outlined" fullWidth  />
            <StyledTextField label="Vorname" variant="outlined" fullWidth />
            <StyledTextField label="Personalnummer" variant="outlined" fullWidth  />
            <StyledTextField label="E-Mail" variant="outlined" fullWidth  />
            <StyledTextField label="Telefonnummer" variant="outlined" fullWidth />

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

      {/* Save Confirmation StyledDialog */}

      <StyledDialog open={openSaveDialog} onClose={handleSaveCancel}>
        <StyledDialogTitle>Änderungen speichern</StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContent>
            Möchten Sie die Änderungen übernehmen?
          </StyledDialogContent>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleSaveCancel} color="primary">Nein</Button>
          <Button onClick={handleSaveConfirm} color="primary" autoFocus>Ja</Button>
        </StyledDialogActions>
      </StyledDialog>
    </StyledPaper>
  );
}

export default AdminProfile;
