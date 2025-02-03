"use client";

import React, { useState, useMemo } from "react";
import {
  Paper,
  TextField,
  Box,
  Stack,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import StyledPaper from "@/app/components/styledComponents/StyledPaper"
import { BlueButton, RedButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";

const initialData = [
  { title: "Wartungsarbeiten", type: "Maintenance", startDate: "12.11.2024 10:00", endDate: "12.11.2024 14:00", status: "Active", target: "Loginseite" },
  { title: "Hotfix: Fehlerbehebung", type: "Hotfix", startDate: "20.04.2024 08:00", endDate: "20.04.2024 09:00", status: "Active", target: "E-Mail" },
  { title: "Update: Neue Funktionen", type: "Update", startDate: "08.04.2024 12:00", endDate: "08.04.2024 15:00", status: "Active", target: "Dashboard" },
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    type: "",
    startDate: dayjs(),
    endDate: dayjs(),
    target: "Loginseite",
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State für den Dialog

  const handleDeactivateClick = () => {
    setConfirmationOpen(true); // Öffnet den Bestätigungsdialog
  };

  const handleConfirmDeactivate = () => {
    setAnnouncements((prev) =>
      prev.map((ann, index) =>
        selectedAnnouncements.includes(index) ? { ...ann, status: "Inactive" } : ann
      )
    );
    setSelectedAnnouncements([]); // Auswahl zurücksetzen
    setConfirmationOpen(false); // Schließt den Dialog
  };

  const handleCancelDeactivate = () => {
    setConfirmationOpen(false); // Schließt den Dialog ohne Aktion
  };

  const filteredData = useMemo(
    () => announcements.filter((row) => row.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm, announcements]
  );

  const handleCheckboxChange = (index) => {
    setSelectedAnnouncements((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDeactivate = () => {
    setAnnouncements((prev) =>
      prev.map((ann, index) =>
        selectedAnnouncements.includes(index) ? { ...ann, status: "Inactive" } : ann
      )
    );
    setSelectedAnnouncements([]);
  };

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.type || !newAnnouncement.startDate || !newAnnouncement.endDate) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    setAnnouncements([...announcements, { ...newAnnouncement, status: "Active" }]);
    setOpenDialog(false);
    setNewAnnouncement({ title: "", type: "", startDate: dayjs(), endDate: dayjs(), target: "Loginseite" });
  };

  return (
    <StyledPaper>
      <Box sx={{ padding: 4, color: "black" }}>
        <DesignTitel>Ankündigungen</DesignTitel>

        <Box sx={{ mb: 3 }}>
          <Stack spacing={2} sx={{ maxWidth: "60%", margin: "auto" }}>
            <TextField
              label="Suche nach Ankündigungen"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}> {/* Leicht graue Schrift für Titel */}
                </TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Titel</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Typ</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Startdatum</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Enddatum</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>Ziel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedAnnouncements.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{dayjs(row.startDate).format("DD.MM.YYYY HH:mm")}</TableCell>
                  <TableCell>{dayjs(row.endDate).format("DD.MM.YYYY HH:mm")}</TableCell>
                  <TableCell
                    sx={{
                      color: row.status === "Inactive" ? "gray" : "green", // Grau für Inactive, Grün für Active
                      fontWeight: "bold", // Status fett hervorheben
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell>{row.target}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3 }}>
          <RedButton onClick={handleDeactivateClick}>Ankündigung Deaktivieren</RedButton>
          <BlueButton onClick={() => setOpenDialog(true)}>Neue Ankündigung</BlueButton>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
            Neue Ankündigung erstellen
          </DialogTitle>
          <DialogContent sx={{ padding: "20px" }}>
            <Stack spacing={3}>
              {/* Titel */}
              <TextField
                label="Titel"
                fullWidth
                variant="outlined"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
              />

              {/* Typ */}
              <FormControl fullWidth>
                <InputLabel>Typ</InputLabel>
                <Select
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                  sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
                >
                  <MenuItem value="Hotfix">Hotfix</MenuItem>
                  <MenuItem value="Maintenance">Wartungsarbeiten</MenuItem>
                  <MenuItem value="Update">Update</MenuItem>
                </Select>
              </FormControl>

              {/* Startdatum & Enddatum */}
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <Stack direction="row" spacing={2}>
                  <DateTimePicker
                    label="Startdatum & Uhrzeit"
                    value={newAnnouncement.startDate}
                    onChange={(newValue) => setNewAnnouncement({ ...newAnnouncement, startDate: newValue })}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }} />
                    )}
                  />
                  <DateTimePicker
                    label="Enddatum & Uhrzeit"
                    value={newAnnouncement.endDate}
                    onChange={(newValue) => setNewAnnouncement({ ...newAnnouncement, endDate: newValue })}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }} />
                    )}
                  />
                </Stack>
              </LocalizationProvider>

              {/* Ziel */}
              <FormControl fullWidth>
                <InputLabel>Ziel</InputLabel>
                <Select
                  value={newAnnouncement.target}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                  sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
                >
                  <MenuItem value="E-Mail">E-Mail</MenuItem>
                  <MenuItem value="Loginseite">Loginseite</MenuItem>
                  <MenuItem value="Dashboard">Dashboard</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>

          {/* Buttons */}
          <DialogActions sx={{ padding: "20px", justifyContent: "center" }}>
            <Button onClick={() => setOpenDialog(false)} variant="outlined" color="secondary" sx={{ borderRadius: "8px" }}>
              Abbrechen
            </Button>
            <Button onClick={handleCreateAnnouncement} variant="contained" color="primary" sx={{ borderRadius: "8px" }}>
              Erstellen
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmationOpen} onClose={handleCancelDeactivate}>
          <DialogTitle>Bestätigung</DialogTitle>
          <DialogContent>
            Möchten Sie die ausgewählten Ankündigungen wirklich deaktivieren?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDeactivate} color="secondary">
              Abbrechen
            </Button>
            <Button onClick={handleConfirmDeactivate} color="primary">
              Ja, deaktivieren
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </StyledPaper>
  );
}
