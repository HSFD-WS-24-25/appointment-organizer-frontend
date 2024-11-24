import React from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from '@mui/material';

const NewUserForm = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Neuer Nutzer
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Vorname"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="E-Mail"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Telefonnummer"
          variant="outlined"
          margin="normal"
        />
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Rolle:
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Veranstalter"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Teilnehmer"
          />
        </FormGroup>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
        >
          Anlegen
        </Button>
      </Box>
    </Box>
  );
};

export default NewUserForm;
