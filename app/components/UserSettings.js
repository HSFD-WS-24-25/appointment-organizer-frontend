"use client";

import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import SidebarUser from './SidebarUser';

function UserSettings() {
  {/* Einstellungen */ }

  const router = useRouter();

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
      <SidebarUser />

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
    </Box>
  );
}

export default UserSettings;