"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import SidebarUser from './SidebarUser';

function UserSettings() {
  const router = useRouter();

  const handleSaveChangesClick = () => {
    alert("Änderungen erfolgreich gespeichert.");
  };

  const handleGoBackClick = () => {
    router.push("/user");
  };

  const [language, setLanguage] = useState('');
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const [timezone, setTimezone] = useState('');
  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SidebarUser />

      <Box sx={{ flex: 1, padding: 3, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: 4, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
          Einstellungen
        </Typography>

        <Paper
          elevation={4}
          sx={{
            maxWidth: 600,
            width: '100%',
            padding: 3,
            borderRadius: 3,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="language-label">Sprache</InputLabel>
            <Select
              labelId="language-label"
              id="language"
              value={language}
              label="Sprache"
              onChange={handleChangeLanguage}
            >
              <MenuItem value="German">Deutsch</MenuItem>
              <MenuItem value="English">Englisch</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="timezone-label">Zeitzone</InputLabel>
            <Select
              labelId="timezone-label"
              id="timezone"
              value={timezone}
              label="Zeitzone"
              onChange={handleChangeTimezone}
            >
              <MenuItem value="CET">CET</MenuItem>
              <MenuItem value="UTC">UTC</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <Button
              onClick={handleGoBackClick}
              variant="outlined"
              color="error"
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Zurück
            </Button>
            <Button
              onClick={handleSaveChangesClick}
              variant="contained"
              color="success"
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Änderungen speichern
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default UserSettings;
