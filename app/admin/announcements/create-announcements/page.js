import {
  Box,
  Autocomplete,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Button,
  Grid2,
} from "@mui/material";

export default function Page() {
  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        //Using sx Prop for the Design of MUI components
        maxWidth: 800, //not defining heigth makes it adaptive to the elements
        margin: "Auto", //Auto = centered (equal gap) and resposive
        marginTop: 6, //For responsiveness you coild also use padding of the elements (adapts to screen size)
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
        color="blue"
        gutterBottom
      >
        Ankündigung Erstellen
      </Typography>

      <TextField
        label="Ankündigung Title"
        variant="outlined"
        size="small"
        fullWidth
      ></TextField>

      <TextField
        label="Ankündigung Body"
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={12}
        sx={{
          marginTop: 4,
        }}
      ></TextField>

      <Typography variant="h6" fontWeight="bold">
        Methode
      </Typography>

      <FormControlLabel control={<Checkbox />} label="Bei Anmeldung" />
      <FormControlLabel control={<Checkbox />} label="E-Mail" />
      {/* Container für die Buttons */}
      <Box display="flex" justifyContent="end" mt={2}>
        <Button
          variant="contained"
          color="error"
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
