"use client";

import Sidebar from './Sidebar';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Autocomplete, Typography, TextField, FormControlLabel,
  Checkbox, Paper, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, List, ListItemButton,
  ListItemIcon, ListItemText
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReportProblem from '@mui/icons-material/ReportProblem';

export default function AdminCreateAnnouncements() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
      
        </Typography>

        {/* Announcement Creation Form */}
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
      </Box>
    </Box>
  );
}
