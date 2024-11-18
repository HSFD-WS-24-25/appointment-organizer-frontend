import {
  Box, Typography, TextField, FormControlLabel,
  Checkbox, Paper, Button

} from "@mui/material";

function AnnouncementCreationFrom() {
  return(
      <Box
          component={Paper}
          elevation={4}
          sx={{
            maxWidth: 800,
            margin: "auto",
            marginTop: 6,
            padding: 2,
            border: 3,
            borderColor: "gray",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="black"
            gutterBottom
          >
            Ankündigung Erstellen
          </Typography>

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
          <Box display="flex" justifyContent="end" mt={2} gap={2}>
            <Button
              variant="contained"
              color="error"
              href="/admin/announcements"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Abbrechen
            </Button>
            <Button
              variant="contained"
              color="success"
              href="/admin/announcements"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Speichern
            </Button>
          </Box>
        </Box>

  );
}

export default AnnouncementCreationFrom;