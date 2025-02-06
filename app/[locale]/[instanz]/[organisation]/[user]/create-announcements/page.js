"use client"
import {
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { GreenButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import {StyledBox} from "@/app/[locale]/components/styledComponents/StyledBox";
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import React, {useEffect,useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function AnnouncementCreationFrom() {
  const t = useTranslations('CreateAnnouncements');
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext
  const router = useRouter();

   // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
   useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);

  const handleSaveClick = () => {
    router.push(`${basePath}/announcements`);
  };

  const handleCancelClick = () => {
    router.push(`${basePath}/announcements`);
  };


  return(
      <StyledPaper>
          <DesignTitel>
            {t('title')}
          </DesignTitel>

          <TextField
            label={t('textfield_announcement_title')}
            variant="outlined"
            size="small"
            fullWidth
          />
    
          <TextField
            label={t('textfield_announcement_description')}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={12}
            sx={{ marginTop: 4 }}
          />

          <Typography variant="h6" fontWeight="bold">
            {t('headline_method')}
          </Typography>

          <FormControlLabel control={<Checkbox />} label={t('checkbox_login')} />
          <FormControlLabel control={<Checkbox />} label={t('checkbox_email')} />

          {/* Buttons */}
          <StyledBox display="flex" justifyContent="end" mt={2} gap={2}>
            <RedButton onClick={handleCancelClick}>
              {t('button_cancel')}
            </RedButton>
            <GreenButton onClick={handleSaveClick}>
              {t('button_save')}
            </GreenButton>
          </StyledBox>
        </StyledPaper>
  );
}

export default AnnouncementCreationFrom;