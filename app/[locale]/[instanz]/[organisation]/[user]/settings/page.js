"use client";

import React, { useState, useEffect } from 'react';
import { Box, Paper, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useRouter } from '@/i18n/routing';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { GreenButton, RedButton, ToggleButton} from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import LocaleSwitcher from "@/app/[locale]/components/LocaleSwitcher";
import { useTranslations } from 'next-intl';

function UserSettings() {
  const t = useTranslations('Settings');
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


  const handleSaveChangesClick = () => {
    alert(t('alert_changes_saved_successfully'));
  };

  const handleGoBackClick = () => {
    router.push(`${basePath}`);
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
          {t('title')}
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
          {/* Sprache ändern Select*/}
          <LocaleSwitcher />

          <FormControl fullWidth>
            <InputLabel id="timezone-label">{t('select_timezone_name')}</InputLabel>
            <Select
              labelId="timezone-label"
              id="timezone"
              value={timezone}
              label="Zeitzone"
              onChange={handleChangeTimezone}
            >
              <MenuItem value="CET">{t('select_timezone_option_cet')}</MenuItem>
              <MenuItem value="UTC">{t('select_timezone_option_utc')}</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <RedButton
              onClick={handleGoBackClick}
            >
              {t('button_go_back')}
            </RedButton>
            <GreenButton
              onClick={handleSaveChangesClick}
            >
              {t('button_save_changes')}
            </GreenButton>
          </Stack>
        </Paper>
      </Box>
    </StyledPaper>
  );
}

export default UserSettings;
