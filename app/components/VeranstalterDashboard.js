"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Checkbox, FormControlLabel, InputAdornment, Grid } from '@mui/material';
import SidebarUser from './SidebarUser';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';

function UserDashboard() {
  const [checkedOnline, setCheckedOnline] = useState(false);
  const [checkedInPerson, setCheckedInPerson] = useState(false);
  const router = useRouter();
  
  const getInvitesList = () => {
    router.push('/invites');
  };

  const getPreviewPage = () => {
    router.push('/preview');
  };
    
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
      <SidebarUser />

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
              <Button onClick={getPreviewPage} variant="contained" color="info">Vorschau</Button>
              <Button variant="contained" color="success">Speichern</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Box>
  );
}

export default UserDashboard;