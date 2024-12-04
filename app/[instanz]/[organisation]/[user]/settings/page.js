"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import StyledPaper from "../../../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton, ToggleButton} from "../../../../components/styledComponents/StyledButton";
import DesignTitel from "../../../../components/styledComponents/DesignTitel";


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
    <StyledPaper>

      <Box>
        <DesignTitel>
          Einstellungen
        </DesignTitel>

        <Paper
          elevation={4}
          sx={{
            width: '100%',
            padding: 3,
            borderRadius: 3,
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
          <ToggleButton/>
          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <RedButton
              onClick={handleGoBackClick}
            >
              Zurück
            </RedButton>
            <GreenButton
              onClick={handleSaveChangesClick}
            >
              Änderungen speichern
            </GreenButton>
          </Stack>
        </Paper>
      </Box>
    </StyledPaper>
  );
}

export default UserSettings;
