"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
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
import "dayjs/locale/de"; // Importiere die deutsche Lokalisierung
import { usePostEvent } from "@/app/hooks/usePostEvent"
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren
import { useRouter } from "next/navigation";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "@/app/components/styledComponents/IconMarker.png";
import UserDashboard from "../invites/page"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';





// Setze die deutsche Lokalisierung global
dayjs.locale("de");

const OpenStreetMap = ({ address, coordinates }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Initialisiere die Karte nur einmal
    if (!mapInstance.current) {
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09], // Standardkoordinaten
        zoom: 18, // Erhöhter Zoom-Level
        dragging: false, // Ziehen deaktivieren
        scrollWheelZoom: false, // Zoomen mit Scrollrad deaktivieren
        doubleClickZoom: false, // Doppelklick-Zoomen deaktivieren
        keyboard: false, // Tastatursteuerung deaktivieren
        zoomControl: false, // Zoom-Steuerung ausblenden
      });

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
        mapInstance.current.setView([lat, lon], 18); // Erhöhter Zoom-Level
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
            mapInstance.current.setView([lat, lon], 18); // Erhöhter Zoom-Level
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


  const { postEvent } = usePostEvent();
  const [errors, setErrors] = useState({});
  const [eventType, setEventType] = useState("Präsenz");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
    address: "",
    capacity: "",
    maxGuests: "",
    description: "",
    reminderDays: "",
  });


  // Geocoding-Funktion global definieren
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP-Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return [lat, lon]; // Koordinaten zurückgeben
      } else {
        console.error("Adresse nicht gefunden.");
        return null;
      }
    } catch (error) {
      console.error("Fehler beim Geocoding:", error);
      return null;
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.length < 10) {
      newErrors.title = "Der Titel muss mindestens 10 Zeichen lang sein.";
    }

    if (!formData.address) {
      newErrors.address = "Die Adresse ist ein Pflichtfeld.";
    }

    if (!formData.startDate || isNaN(new Date(formData.startDate).getTime())) {
      newErrors.startDate = "Das Startdatum ist ein Pflichtfeld und muss gültig sein.";
    }

    if (!formData.endDate || isNaN(new Date(formData.endDate).getTime())) {
      newErrors.endDate = "Das Enddatum ist ein Pflichtfeld und muss gültig sein.";
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

    if (!formData.reminderDays) {
      newErrors.reminderDays = "Die Erinnerung in Tagen ist ein Pflichtfeld.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
const [inviteListDialogOpen, setInviteListDialogOpen] = useState(false);

const handleOpenPublishDialog = () => {
  if (validateForm()) {
    setPublishDialogOpen(true);
  } else {
    alert("Bitte füllen Sie alle Pflichtfelder korrekt aus.");
  }
};

const handleClosePublishDialog = () => {
  setPublishDialogOpen(false);
};

const handleOpenInviteListDialog = () => {
  setDialogContent(<UserDashboard />); // Lade UserDashboard in den Dialog
  setInviteListDialogOpen(true);
};

const handleCloseInviteListDialog = () => {
  setInviteListDialogOpen(false);
};

const [open, setOpen] = useState(false);
const handlePreview = () => {
  setOpen(true); // Öffnet das Dialogfeld
};

const handleClose = () => {
  setOpen(false); // Schließt das Dialogfeld
};


  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const openInvitesDialog = () => {
    console.log("Einladungsliste wird geöffnet...");
    setDialogContent(<UserDashboard />); // Lade UserDashboard in den Dialog
    setDialogOpen(true); // Öffne den Dialog
  };

  const handleDialogAction = async (action) => {
    if (action === "publish") {
      try {
        // Bereite die Daten für die POST-Anfrage vor
        const eventData = {
          name: formData.title,
          description: formData.description,
          date_start: formData.startDate?.toISOString(),
          date_end: formData.endDate?.toISOString(),
          location: formData.address,
          capacity: Number(formData.capacity),
          reminder: Number(formData.reminderDays),
          max_additional_guests: Number(formData.maxGuests),
        };

        // Sende die Daten an die API
        const result = await postEvent(eventData);

        if (result.success) {
          router.push(`${basePath}/myevent`);
          console.log("Erstelltes Event:", result.data);
        } else {
          alert(`Fehler beim Veröffentlichen: ${result.message}`);
        }
      } catch (error) {
        console.error("Fehler beim Veröffentlichen:", error.message);
        alert("Ein unerwarteter Fehler ist aufgetreten.");
      }
    } else {
      console.log("Aktion abgebrochen.");
    }
    handleCloseDialog();
  };

  const [titleStyles, setTitleStyles] = useState({
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    color: "#333",
    fontWeight: "normal",
  });

  const [descriptionStyles, setDescriptionStyles] = useState({
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    color: "#333",
    fontWeight: "normal",
  });


  const Preview = ({ formData = {}, backgroundImage }) => {
    useEffect(() => {
      setTimeout(() => {
        const mapElements = document.querySelectorAll(".leaflet-container");
        mapElements.forEach((element) => {
          const mapInstance = element._leaflet_map;
          if (mapInstance) {
            mapInstance.invalidateSize(); // Aktualisiere die Größe der Karte
          }
        });
      }, 100); // Timeout, um sicherzustellen, dass DOM vollständig geladen ist
    }, []);

    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "#333",
          margin: "0",
          padding: "50px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "2.5em",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Einladung
            </h1>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "0.9em",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Teilnehmen
              </button>
              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "0.9em",
                  borderRadius: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Nicht Teilnehmen
              </button>
            </div>
          </div>

          {/* Titel */}
          <p
            style={{
              fontSize:  "24px",
              fontFamily:  "Arial, sans-serif",
              fontWeight: "normal", 
              fontStyle:  "normal", 
              textDecoration:  "none", 
              color:  "#333",
            }}
          >
            <strong>Titel:</strong> {formData.title || "Titel nicht angegeben"}
          </p>

          {/* Typ */}
          <p>
            <strong>Typ:</strong> {formData.eventType || "N/A"}
          </p>

          {/* Inhalt */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <p>
                <strong>Start:</strong>{" "}
                {formData.startDate?.format("DD.MM.YYYY HH:mm") || "N/A"}
              </p>
              <p>
                <strong>Adresse:</strong> {formData.address || "N/A"}
              </p>
              <div
  style={{
    position: "relative",
    width: "100%",
    height: "200px",
    border: "1px solid #ccc",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  {formData.coordinates || formData.address ? (
    <OpenStreetMap
      address={formData.address}
      coordinates={formData.coordinates}
      mapOptions={{
        dragging: false, // Deaktiviert das Ziehen der Karte
        scrollWheelZoom: false, // Deaktiviert das Zoomen mit dem Scrollrad
        doubleClickZoom: false, // Deaktiviert das Doppelklick-Zoomen
        keyboard: false, // Deaktiviert Tastaturinteraktion
        zoomControl: false, // Entfernt die Zoom-Steuerung
      }}
    />
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      Keine Adresse eingegeben
    </div>
  )}
</div>

            </div>
            <div>
              <p>
                <strong>Ende:</strong>{" "}
                {formData.endDate?.format("DD.MM.YYYY HH:mm") || "N/A"}
              </p>
              <strong>Beschreibung:</strong>{" "}
           <p
  style={{
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    color: "#333",
    wordBreak: "break-word", // Bricht Wörter um, wenn sie zu lang sind
    whiteSpace: "pre-wrap", // Erlaubt Zeilenumbrüche und behält Leerzeichen bei
    overflowWrap: "break-word", // Zusätzliche Absicherung
    maxWidth: "100%", // Passt sich an die Breite des Containers an
    margin: 0, // Entfernt Standardabstände
  }}
>
  {formData.description || "Beschreibung nicht angegeben"}
</p>
            </div>
          </div>
        </div>
      </div>
    );
  };



  let debounceTimer;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && value.length > 50) return;

    if (["capacity", "maxGuests", "reminderDays"].includes(name) && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;

    if (name === "address") {
      const coordinates = await geocodeAddress(value);

      if (coordinates) {
        console.log("Koordinaten erfolgreich geholt:", coordinates);
        // Koordinaten im State speichern
        setFormData((prevData) => ({
          ...prevData,
          coordinates, // Speichere die Koordinaten
        }));
      }
    }
  };


  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    if (e.target.value === "Online") {
      setFormData({ ...formData, address: "" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleClearForm = () => {
    setFormData({
      title: "",
      startDate: null,
      endDate: null,
      address: "",
      capacity: "",
      maxGuests: "",
      description: "",
      reminderDays: "",
    });
    window.location.reload();
    setEventType("Präsenz");
    setBackgroundImage(null);
  };
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


        {/* Titel */}
        <DesignTitel style={{ textAlign: "center", marginBottom: "20px" }}>
          Veranstaltung erstellen
        </DesignTitel>

        <Box
          sx={{
            marginTop: "70px"
          }}
        >
          {/* Datei-Upload und Eventtyp */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <InputLabel id="event-type-label"
                  sx={{
                    fontSize: "1.2rem", // Größere Schriftgröße
                    top: "-10px",        // Beschriftung weiter nach oben
                  }}
                >Veranstaltungstyp:</InputLabel>
                <Select
                  labelId="event-type-label"
                  value={eventType}
                  onChange={handleEventTypeChange}
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
            <Grid item xs={12} sm={4}>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                style={{ marginBottom: "20px" }}
              />
            </Grid>
          </Grid>

          {/* Titel */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={12} >
              <TextField
                label="Titel"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                multiline={false}
                rows={1}
                fullWidth
                style={{
                  height: "56px",
                  backgroundColor: "white",
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
              {/* Startdatum */}
              <Grid container spacing={2}>
                {/* Startdatum */}
                <Grid item xs={6} marginTop={"10px"}>
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

                {/* Enddatum */}
                <Grid item xs={6} marginTop={"10px"}>
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

              {/* Adresse */}
              <TextField
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                disabled={eventType === "Online"}
                style={{
                  backgroundColor: "white",
                  marginTop: "10px", // Optionaler Abstand
                }}
              />

              {/* Karte */}
              <Box
                style={{
                  backgroundColor: "white",
                 // padding: "10px",
                  border: "1px solid #ccc",
                  height: "250px", // Höhe der Karte anpassen
                  marginTop: "10px",
                  width: "100%",
                 // display: "flex",
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

            {/* Beschreibung */}
            <Grid item xs={6} marginTop={"10px"} >
              <TextField
                label="Beschreibung"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline={true}
                rows={15} // Nur Höhe für Multiline
                fullWidth
                style={{
                  height: "375px", // Fixe Höhe unabhängig von Schriftgröße
                  backgroundColor: "white",
                }}

              />

            </Grid>
          </Grid>

          {/* Zusätzliche Angaben */}
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
                onChange={(newValue) => handleInputChange(newValue)}
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

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
              }}
              onClick={handleClearForm}
            >
              Formular leeren
            </Button>
            <Button variant="contained" color="primary" onClick={() => handlePreview()}>
              Vorschau
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenInviteListDialog}
            >
              Einladungsliste
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              onClick={handleOpenPublishDialog }
            >
              Weiter
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      {/* Dialog */}
      <Dialog open={publishDialogOpen} onClose={handleClosePublishDialog}>
  <DialogTitle>Veranstaltung veröffentlichen</DialogTitle>
  <DialogContent>
    <Typography>
      Möchten Sie die Veranstaltung veröffentlichen?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button variant="outlined" onClick={() => handleDialogAction("cancel")}>
      Abbrechen
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleDialogAction("publish")}
    >
      Veröffentlichen
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={inviteListDialogOpen}
  onClose={handleCloseInviteListDialog}
  fullWidth
  maxWidth="lg"
>
  <DialogContent>
    {dialogContent} {/* Dynamischer Inhalt */}
  </DialogContent>
  <DialogActions>
    <Button variant="outlined" onClick={handleCloseInviteListDialog}>
      Schließen
    </Button>
  </DialogActions>
</Dialog>

<Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <Preview formData={formData} backgroundImage={backgroundImage} />
                  <Button variant="outlined" onClick={handleClose}>
      Schließen
    </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvitationForm;