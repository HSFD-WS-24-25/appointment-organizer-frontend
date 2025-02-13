"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  useMediaQuery
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper"
import { BlueButton, RedButton, GreenButton, OrangeButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const initialData = [
  { title: "Wartungsarbeiten", type: "Maintenance", startDate: "12.11.2024 10:00", endDate: "12.11.2024 14:00", status: "Active", target: "Loginseite" },
  { title: "Hotfix: Fehlerbehebung", type: "Hotfix", startDate: "20.04.2024 08:00", endDate: "20.04.2024 09:00", status: "Active", target: "E-Mail" },
  { title: "Update: Neue Funktionen", type: "Update", startDate: "08.04.2024 12:00", endDate: "08.04.2024 15:00", status: "Active", target: "Dashboard" },
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
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
  const isMobile = useMediaQuery("(max-width: 600px)"); // Erkennt mobile Ansicht
  const t = useTranslations('Announcements');
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

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/[locale]/aapi/create-announcments", {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Daten");
        }
    
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Fehler:", error);
      }
    };
  
    fetchAnnouncements();
  }, []);
  
  const handleDeactivateClick = () => {
    setConfirmationOpen(true); // Öffnet den Bestätigungsdialog
  };

  const handleConfirmDeactivate = async () => {
    try {
      // Für jede ausgewählte Ankündigung eine PUT-Anfrage senden
      await Promise.all(
        selectedAnnouncements.map(async (index) => {
          const announcement = announcements[index];
          const response = await fetch(`/[locale]/aapi/create-announcments?id=${announcement.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Inactive" }), // Neuer Status
          });
  
          if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren der Ankündigung mit ID ${announcement.id}`);
          }
  
          const data = await response.json();
          console.log(`Status aktualisiert:`, data);
        })
      );
  
      // Lokalen Zustand aktualisieren
      setAnnouncements((prev) =>
        prev.map((ann, index) =>
          selectedAnnouncements.includes(index) ? { ...ann, status: "Inactive" } : ann
        )
      );
  
      setSelectedAnnouncements([]); // Auswahl zurücksetzen
      setConfirmationOpen(false); // Dialog schließen
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error);
    }
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

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.type || !newAnnouncement.startDate || !newAnnouncement.endDate) {
      alert(t('alert_please_fill_out_all_fields'));
      return;
    }
    try {
      const response = await fetch("/[locale]/aapi/create-announcments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAnnouncement,
          startDate: newAnnouncement.startDate.toISOString(),
          endDate: newAnnouncement.endDate.toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Fehler beim Hinzufügen der Ankündigung");
      }
  
      const data = await response.json();
      console.log("Ankündigung hinzugefügt:", data);
  
      // Dialog schließen und Zustand zurücksetzen
      setNewAnnouncement({
        title: "",
        type: "",
        startDate: dayjs(),
        endDate: dayjs().add(1, "hour"),
        target: "",
      });
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Fehler:", error);
    }
  };
  
  return (
    <StyledPaper>
      <Box sx={{ padding: 4, color: "black" }}>
        <DesignTitel>{t('title')}</DesignTitel>

        <Box sx={{ mb: 3 }}>
          <Stack spacing={2} sx={{ maxWidth: "60%", margin: "auto" }}>
            <TextField
              label="Suche nach Ankündigungen"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{backgroundColor: "white"}}
            />
          </Stack>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}> {/* Leicht graue Schrift für Titel */}
                </TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_title')}</TableCell>
                {!isMobile && (
          <>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_type')}</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_start_date')}</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_end_date')}</TableCell>

                </>
        )}                
        <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_status')}</TableCell>
                <TableCell sx={{ backgroundColor: "lightgrey", fontWeight: "bold" }}>{t('table_column_target')}</TableCell>
        
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
          {!isMobile && (
            <>
              <TableCell>{row.type}</TableCell>
              <TableCell>{dayjs(row.startDate).format("DD.MM.YYYY HH:mm")}</TableCell>
              <TableCell>{dayjs(row.endDate).format("DD.MM.YYYY HH:mm")}</TableCell>
            </>
          )}
          <TableCell
            sx={{
              color: row.status === "Inactive" ? "gray" : "green",
              fontWeight: "bold",
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
          <RedButton onClick={handleDeactivateClick}>{t('button_disable_announcements')}</RedButton>
          <BlueButton onClick={() => setOpenDialog(true)}>{t('button_new_announcement')}</BlueButton>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
            {t('dialog_new_announcement_title')}
          </DialogTitle>
          <DialogContent sx={{ padding: "20px" }}>
            <Stack spacing={3}>
              {/* Titel */}
              <TextField
                label={t('dialog_new_announcement_textfield_title')}
                fullWidth
                variant="outlined"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
              />

              {/* Typ */}
              <FormControl fullWidth>
                <InputLabel>{t('dialog_new_announcement_textfield_type')}</InputLabel>
                <Select
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                  sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
                >
                  <MenuItem value="Hotfix">{t('dialog_new_announcement_textfield_type_option_hotfix')}</MenuItem>
                  <MenuItem value="Maintenance">{t('dialog_new_announcement_textfield_type_option_maintenance')}</MenuItem>
                  <MenuItem value="Update">{t('dialog_new_announcement_textfield_type_option_update')}</MenuItem>
                </Select>
              </FormControl>

              {/* Startdatum & Enddatum */}
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <Stack direction="row" spacing={2}>
                  <DateTimePicker
                    label={t('dialog_new_announcement_textfield_start_date_and_time')}
                    value={newAnnouncement.startDate}
                    onChange={(newValue) => setNewAnnouncement({ ...newAnnouncement, startDate: newValue })}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }} />
                    )}
                  />
                  <DateTimePicker
                    label={t('dialog_new_announcement_textfield_end_date_and_time')}
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
                <InputLabel>{t('dialog_new_announcement_textfield_target')}</InputLabel>
                <Select
                  value={newAnnouncement.target}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                  sx={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
                >
                  <MenuItem value="E-Mail">{t('dialog_new_announcement_textfield_target_option_email')}</MenuItem>
                  <MenuItem value="Loginseite">{t('dialog_new_announcement_textfield_target_option_login_page')}</MenuItem>
                  <MenuItem value="Dashboard">{t('dialog_new_announcement_textfield_target_option_dashboard')}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>

          {/* Buttons */}
          <DialogActions sx={{ padding: "20px", justifyContent: "center" }}>
            <RedButton onClick={() => setOpenDialog(false)} variant="outlined" color="secondary" sx={{ borderRadius: "8px" }}>
              {t('dialog_new_announcement_button_cancel')}
            </RedButton>
            <GreenButton onClick={handleCreateAnnouncement} variant="contained" color="primary" sx={{ borderRadius: "8px" }}>
              {t('dialog_new_announcement_button_create')}
            </GreenButton>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmationOpen} onClose={handleCancelDeactivate}>
          <DialogTitle>{t('dialog_button_disable_announcements_title')}</DialogTitle>
          <DialogContent>
            {t('dialog_button_disable_announcements_description')}
          </DialogContent>
          <DialogActions>
            <RedButton onClick={handleCancelDeactivate} color="secondary">
              {t('dialog_button_disable_announcements_button_cancel')}
            </RedButton>
            <GreenButton onClick={handleConfirmDeactivate} color="primary">
              {t('dialog_button_disable_announcements_button_deactivate')}
            </GreenButton>
          </DialogActions>
        </Dialog>
      </Box>
    </StyledPaper>
  );
}
