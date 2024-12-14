"use client"
import {
   Typography, TextField, FormControlLabel,
  Checkbox, Paper, Button
} from "@mui/material";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import {StyledBox} from "@/app/components/styledComponents/StyledBox";
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren
import React, {useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

function AnnouncementCreationFrom() {
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
            Ankündigung Erstellen
          </DesignTitel>

          <TextField
            label="Ankündigung Title"
            variant="outlined"
            size="small"
            fullWidth
          />
    
          <TextField
            label="Ankündigung Body"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={12}
            sx={{ marginTop: 4 }}
          />

          <Typography variant="h6" fontWeight="bold">
            Methode
          </Typography>

          <FormControlLabel control={<Checkbox />} label="Bei Anmeldung" />
          <FormControlLabel control={<Checkbox />} label="E-Mail" />

          {/* Buttons */}
          <StyledBox display="flex" justifyContent="end" mt={2} gap={2}>
            <RedButton onClick={handleCancelClick}>
              Abbrechen
            </RedButton>
            <GreenButton onClick={handleSaveClick}>
              Speichern
            </GreenButton>
          </StyledBox>
        </StyledPaper>
  );
}

export default AnnouncementCreationFrom;