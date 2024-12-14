"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Checkbox, FormControlLabel, InputAdornment, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren

function UserDashboard() {
  const [checkedOnline, setCheckedOnline] = useState(false);
  const [checkedInPerson, setCheckedInPerson] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog
  const [preview, setPreview] = useState(false);
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const router = useRouter();
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext

  // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
  useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);

  
  const getInvitesList = () => {
    router.push(`${basePath}/invites`);
  };

  const handleCancelClick = () => {
    router.push(`${basePath}/myevent`);
  };

  // Open the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle "Weiter" button click
  const handleProceed = () => {
    // Validate if "Vorschau" and "Veröffentlichen" are both checked
    if (preview && publish) {
      // Redirect to another page (e.g., preview or publish page)
      console.log('Proceeding to the next page...');
      router.push(`${basePath}/preview`); // Replace '/next-page' with the actual page you want to navigate to
    } else {
      // If the conditions are not met, show an alert or message
      alert('Bitte wählen Sie sowohl "Vorschau" als auch "Veröffentlichen" aus.');
    }
  };

  return (
    <StyledPaper >
      {/* Main Content */}
      <Box>
        <DesignTitel>
          Veranstaltungserstellung
        </DesignTitel>

        {/* Event Image Placeholder */}
        <Button sx={{
          border: '1px solid #ccc',
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
          width: '100%'  // Ensure the image placeholder stretches to fill the width
        }}>
          <Typography variant="caption">Veranstaltungsbild hochladen</Typography>
        </Button>

        {/* Event Details Form */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Veranstaltungstitel" 
              fullWidth 
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField label="Anzahl von Teilnehmern" type="number" defaultValue={3} fullWidth />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField label="Anzahl von Begleitern" type="number" defaultValue={3} fullWidth />
          </Grid>

          <Grid item xs={6} sm={3}>
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
          <Grid item xs={6} sm={3}>
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
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox checked={checkedInPerson} onChange={(e) => setCheckedInPerson(e.target.checked)} />}
              label="Vor Ort"
            />
            <TextField label="Adresse" fullWidth disabled={!checkedInPerson} />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              rows={10} // Increased rows to make the field taller
              fullWidth
            />
          </Grid>

          {/* Date Selection */}
          <Grid item xs={6} sm={3}>
            <TextField
              label="Terminauswahl"
              type="date"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
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
            <BlueButton onClick={getInvitesList}>
              Einladungsliste
            </BlueButton>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <RedButton onClick={handleCancelClick}>Abbrechen</RedButton>
            <GreenButton onClick={handleOpenDialog} variant="contained" color="success">Vorschau und Veröffentlichung</GreenButton>
          </Grid>
        </Grid>

      </Box>

      {/* Dialog for preview, publish, or save draft */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Aktionen für Veranstaltung</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={preview} onChange={(e) => setPreview(e.target.checked)} />}
              label="Vorschau"
            />
            <FormControlLabel
              control={<Checkbox checked={publish} onChange={(e) => setPublish(e.target.checked)} />}
              label="Veröffentlichen"
            />
            <FormControlLabel
              control={<Checkbox checked={saveDraft} onChange={(e) => setSaveDraft(e.target.checked)} />}
              label="Entwurf speichern"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <RedButton onClick={handleCloseDialog}>Abbrechen</RedButton>
          <GreenButton onClick={handleProceed}>Weiter</GreenButton>
        </DialogActions>
      </Dialog>

    </StyledPaper>
  );
}

export default UserDashboard;
