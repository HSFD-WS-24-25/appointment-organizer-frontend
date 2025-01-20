"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchEventById } from "@/app/hooks/useFetchEventById";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import DynamicTextStyler from "@/app/components/DynamicTextStyler";


// Setze die deutsche Lokalisierung global
dayjs.locale("de");

const OpenStreetMap = ({ address, coordinates }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
  
    useEffect(() => {
      // Initialisiere die Karte nur einmal
      if (!mapInstance.current) {
        const map = L.map(mapRef.current).setView([51.505, -0.09], 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 22,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        mapInstance.current = map; // Speichere die Karteninstanz
      }
  
      const customIcon = L.icon({
        iconUrl: customMarkerIcon, // Benutzerdefiniertes Icon
        iconSize: [64, 64],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
  
      const updateMap = async () => {
        if (coordinates) {
          const [lat, lon] = coordinates;
          mapInstance.current.setView([lat, lon], 15);
          L.marker([lat, lon], { icon: customIcon })
            .addTo(mapInstance.current)
            .bindPopup("Gewählte Adresse")
            .openPopup();
        } else if (address) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address
              )}`
            );
            const data = await response.json();
            if (data.length > 0) {
              const { lat, lon } = data[0];
              mapInstance.current.setView([lat, lon], 15);
              L.marker([lat, lon], { icon: customIcon })
                .addTo(mapInstance.current)
                .bindPopup(`Adresse: ${address}`)
                .openPopup();
            }
          } catch (error) {
            console.error("Fehler beim Geocoding:", error);
          }
        }
  
        // Kartenlayout aktualisieren
        mapInstance.current.whenReady(() => {
          mapInstance.current.invalidateSize();
        });
      };
  
      updateMap();
  
      return () => {
        if (mapInstance.current) {
          mapInstance.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              mapInstance.current.removeLayer(layer); // Entferne alte Marker
            }
          });
        }
      };
    }, [address, coordinates]);
  
    return <div ref={mapRef} style={{ height: "250px", width: "100%" }} />;
  };
  
  

const InvitationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event_id"); // Event-ID aus der URL
  const { eventData, isLoading, error } = useFetchEventById(eventId);

  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
    address: "",
    capacity: "",
    maxGuests: "",
    description: "",
    reminderDays: "",
    coordinates: null
  });
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventType, setEventType] = useState("Präsenz");
  const [backgroundImage, setBackgroundImage] = useState(null);
  

  // Fülle die Formulardaten, wenn die Event-Daten geladen werden
  useEffect(() => {
    if (eventData) {
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        address: eventData.address || "",
        capacity: eventData.capacity || "",
        maxGuests: eventData.maxGuests || "",
        startDate: eventData.date_start ? new Date(eventData.date_start) : null,
        endDate: eventData.date_end ? new Date(eventData.date_end) : null,
      });
    }
  }, [eventData]);

  
  if (isLoading) {
    return <Typography>Lade Event-Daten...</Typography>;
  }

  if (error) {
    return <Typography>Fehler: {error}</Typography>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 10) {
      newErrors.title = "Der Titel muss mindestens 10 Zeichen lang sein.";
    }
    if (!formData.address) {
      newErrors.address = "Die Adresse ist ein Pflichtfeld.";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Das Startdatum ist ein Pflichtfeld.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "Das Enddatum ist ein Pflichtfeld.";
    }
    if (!formData.description || formData.description.length < 50) {
      newErrors.description = "Die Beschreibung muss mindestens 50 Zeichen lang sein.";
    }
    if (!formData.capacity) {
      newErrors.capacity = "Die Kapazität ist ein Pflichtfeld.";
    }
    if (!formData.maxGuests) {
      newErrors.maxGuests = "Die maximalen Gäste sind ein Pflichtfeld.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = () => {
    if (validateForm()) {
      setDialogOpen(true);
    } else {
      alert("Bitte füllen Sie alle Pflichtfelder korrekt aus.");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    console.log("Formulardaten speichern:", formData);
    handleCloseDialog();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Fehler beim Laden der Event-Daten: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <StyledPaper
        elevation={3}
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <DesignTitel style={{ textAlign: "center", marginBottom: "20px" }}>
          Veranstaltung bearbeiten
        </DesignTitel>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="event-type-label">Veranstaltungstyp:</InputLabel>
              <Select
                labelId="event-type-label"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                fullWidth
                style={{
                  backgroundColor: "white",
                  height: "56px",
                }}
              >
                <MenuItem value="Präsenz">Präsenz</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) =>
                setBackgroundImage(URL.createObjectURL(e.target.files[0]))
              }
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <DynamicTextStyler
              label="Titel"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <DateTimePicker
                    label="Startdatum & Uhrzeit"
                    value={formData.startDate}
                    onChange={(newValue) => handleDateChange("startDate", newValue)}
                    inputFormat="DD.MM.YYYY HH:mm"
                    ampm={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        style={{
                          backgroundColor: "white",
                          height: "56px",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                  <DateTimePicker
                    label="Enddatum & Uhrzeit"
                    value={formData.endDate}
                    onChange={(newValue) => handleDateChange("endDate", newValue)}
                    inputFormat="DD.MM.YYYY HH:mm"
                    ampm={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        style={{
                          backgroundColor: "white",
                          height: "56px",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <TextField
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              disabled={eventType === "Online"}
              style={{
                backgroundColor: "white",
                marginTop: "10px",
              }}
            />

            <Box
              style={{
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid #ccc",
                height: "250px",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {formData.coordinates ? (
                <OpenStreetMap
                  coordinates={formData.coordinates}
                  address={formData.address}
                />
              ) : (
                <Typography variant="body2" align="center">
                  Keine Adresse eingegeben
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <DynamicTextStyler
              label="Beschreibung"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline={true}
              rows={13}
              style={{
                marginTop: "-50px",
                height: "340px",
                backgroundColor: "white",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Kapazität"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              error={!!errors.capacity}
              helperText={errors.capacity}
              fullWidth
              style={{ backgroundColor: "white" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Maximale Gäste"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
              error={!!errors.maxGuests}
              helperText={errors.maxGuests}
              fullWidth
              style={{ backgroundColor: "white" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Erinnerung in Tagen"
              name="reminderDays"
              value={formData.reminderDays}
              onChange={handleInputChange}
              error={!!errors.reminderDays}
              helperText={errors.reminderDays}
              fullWidth
              style={{ backgroundColor: "white" }}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
            }}
            onClick={() => setFormData({
              title: "",
              startDate: null,
              endDate: null,
              address: "",
              capacity: "",
              maxGuests: "",
              description: "",
              reminderDays: "",
            })}
          >
            Formular leeren
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={handleOpenDialog}
          >
            Weiter
          </Button>
        </Box>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Veranstaltung speichern</DialogTitle>
          <DialogContent>
            <Typography>Möchten Sie die Änderungen speichern?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Abbrechen</Button>
            <Button onClick={handleSaveChanges} variant="contained" color="primary">
              Speichern
            </Button>
          </DialogActions>
        </Dialog>
      </StyledPaper>
    </div>
  );
};

export default InvitationForm;
