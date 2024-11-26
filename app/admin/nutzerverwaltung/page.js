import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import StyledPaper from "../../components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";

function NewUserForm() {
  return (
    <StyledPaper>
      <DesignTitel>Neuer Nutzer</DesignTitel>

      {/* User Information Fields */}
      <TextField
        label="Name"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Vorname"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-Mail"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Telefonnummer"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />

      {/* Role Selection */}
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
        Rolle
      </Typography>
      <FormControlLabel control={<Checkbox />} label="Veranstalter" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Teilnehmer" />

      {/* Buttons */}
      <Box display="flex" justifyContent="end" mt={4} gap={2}>
        <RedButton>Abbrechen</RedButton>
        <GreenButton>Anlegen</GreenButton>
      </Box>
    </StyledPaper>
  );
}

export default NewUserForm;
