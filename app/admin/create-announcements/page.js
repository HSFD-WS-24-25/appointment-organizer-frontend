import {
   Typography, TextField, FormControlLabel,
  Checkbox, Paper, Button

} from "@mui/material";
import StyledPaper from "../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import {StyledBox} from "../../components/styledComponents/StyledBox";

function AnnouncementCreationFrom() {
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
            <RedButton href="/admin/announcements">
              Abbrechen
            </RedButton>
            <GreenButton href="/admin/announcements">
              Speichern
            </GreenButton>
          </StyledBox>
        </StyledPaper>
  );
}

export default AnnouncementCreationFrom;