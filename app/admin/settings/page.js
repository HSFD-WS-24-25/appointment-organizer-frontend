"use client";

import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import { GreenButton, RedButton } from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../../components/styledComponents/theme";

function UserSettings() {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Lade gespeichertes Theme aus localStorage
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Speichere Theme in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSaveChangesClick = () => {
    alert("Änderungen erfolgreich gespeichert.");
  };

  const handleGoBackClick = () => {
    router.push("/admin");
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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <StyledPaper>
        <Box>
          <DesignTitel>
            Einstellungen
          </DesignTitel>

          {/* Darkmode-Schalter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="body1">Dark Mode</Typography>
            <Switch checked={isDarkMode} onChange={handleThemeToggle} />
          </Box>

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
            <RedButton onClick={handleGoBackClick}>
              Zurück
            </RedButton>
            <GreenButton onClick={handleSaveChangesClick}>
              Änderungen speichern
            </GreenButton>
          </Stack>
        </Box>
      </StyledPaper>
    </ThemeProvider>
  );
}

export default UserSettings;
