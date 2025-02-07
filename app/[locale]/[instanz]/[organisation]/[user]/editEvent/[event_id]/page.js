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
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { useFetchEventById } from "@/app/hooks/useFetchEventById";
import { usePutEvent } from "@/app/hooks/usePutEvent";
import { useParams } from "next/navigation";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "@/app/[locale]/components/styledComponents/IconMarker.png";
import { useUserContext } from "@/app/[locale]/context/UserContext";
import { generateBasePath } from "@/app/[locale]/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from '@/i18n/routing';
import UserDashboard from "../../invites/page"
import QuillEditor from "@/app/[locale]/components/styledComponents/QuillEditor";
import { useTranslations } from 'next-intl';
import { BlueButton, RedButton, GreenButton, OrangeButton } from "@/app/[locale]/components/styledComponents/StyledButton";


dayjs.locale("de");
const OpenStreetMap = ({ address, coordinates }) => {
  const t = useTranslations('EditEvent');
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
          .bindPopup(t('text_selected_adress'))
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
              .bindPopup(`${t('text_adress')} ${address}`)
              .openPopup();
          }
        } catch (error) {
          console.error(t('text_geocoding_error'), error);
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
  const t = useTranslations('EditEvent');
  const { event_id } = useParams(); // Extrahiere die event_id aus den Parametern
  const { event, isLoading, fetchError } = useFetchEventById(event_id);
  const { userInfo } = useUserContext();
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
  const [errors, setErrors] = useState({});
  const [eventType, setEventType] = useState("Präsenz");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const { putEvent } = usePutEvent(); // Hole die PUT-Logik aus dem Hook
  const basePath = generateBasePath(userInfo, user); // Determine the base path


  const handleCancelButon = () => {
    router.push(`${basePath}/myevent`); // Navigate to the appropriate settings page
  };


  useEffect(() => {
    if (event) {
      setFormData({
        title: event.name || "",
        startDate: dayjs(event.date_start) || null,
        endDate: dayjs(event.date_end) || null,
        address: event.location || "",
        capacity: event.capacity?.toString() || "",
        maxGuests: event.max_additional_guests?.toString() || "",
        reminderDays: event.reminder?.toString() || "",
        description: event.description || "", // Beschreibung laden
      });
    }
  }, [event]);

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
      newErrors.title = t('text_title_error');
    }

    // Adresse nur prüfen, wenn Typ nicht "Online" ist
    if (eventType !== "Online" && !formData.address) {
      newErrors.address = t('text_adress_error');
    }

    if (!formData.startDate || isNaN(new Date(formData.startDate).getTime())) {
      newErrors.startDate = t('text_start_date_error');
    }

    if (!formData.endDate || isNaN(new Date(formData.endDate).getTime())) {
      newErrors.endDate = t('text_end_date_error');
    }

    if (!formData.description || formData.description.length < 50) {
      newErrors.description = t('text_description_error');
    }

    if (!formData.capacity) {
      newErrors.capacity = t('text_capacity_error');
    }

    if (!formData.maxGuests) {
      newErrors.maxGuests = t('text_max_guests_error');
    }

    if (!formData.reminderDays) {
      newErrors.reminderDays = t('text_reminder_days_error');
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [dialogContent, setDialogContent] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [inviteListDialogOpen, setInviteListDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setPublishDialogOpen(false);
  };

  const handleOpenPublishDialog = () => {
    if (validateForm()) {
      setPublishDialogOpen(true);
    } else {
      alert(t('text_fill_all_mandatory_fields_alert'));
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
        const result = await putEvent(event_id, eventData);

        if (result.success) {
          router.push(`${basePath}/myevent`);
          console.log(t('text_created_event'), result.data);
        } else {
          alert(`${t('text_publishing_error')} ${result.message}`);
        }
      } catch (error) {
        console.error(t('text_publishing_error'), error.message);
        alert(t('text_unexpected_error'));
      }
    } else {
      console.log(t('text_action_cancelled'));
    }
    handleCloseDialog();
  };

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
          padding: "20px",
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
          <style>
            {`
            @media (max-width: 768px) {
              .mobile-flex {
                display: flex;
                flex-direction: column; /* Vertikale Anordnung für mobile Ansicht */
              }
              .mobile-map {
                order: 1; /* Karte zuerst */
              }
              .mobile-description {
                order: 2; /* Beschreibung danach */
                margin-top: 20px; /* Abstand oberhalb der Beschreibung */
              }
            }
          `}
          </style>

          <div
            className="mobile-flex"
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
              {t('preview_title')}
            </h1>
            <div style={{ display: "flex", gap: "10px" }}>
              <GreenButton
                className="mobile-full-width"
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
                {t('preview_button_participate')}
              </GreenButton>
              <RedButton
                className="mobile-full-width"
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
                {t('preview_button_do_not_participate')}
              </RedButton>
            </div>
          </div>

          {/* Titel */}
          <p
            style={{
              fontSize: "24px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontStyle: "normal",
              textDecoration: "underline",
              color: "#333",
            }}
          >
            {formData.title || t('preview_text_title_not_specified')}
          </p>

          {/* Typ */}
          <p>
            <strong>{t('preview_text_type')}</strong> {formData.eventType || t('preview_text_not_available')}
          </p>

          {/* Inhalt */}
          <div
            className="mobile-flex"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div className="mobile-map">
              <p>
                <strong>{t('preview_text_start')}</strong>{" "}
                {formData.startDate?.format("DD.MM.YYYY HH:mm") || t('preview_text_not_available')}
              </p>
              <p>
                {formData.startDate?.format("DD.MM.YYYY HH:mm") || t('preview_text_not_available')}
              </p>
              <p>
                <strong>{t('preview_text_adress')}</strong>
              </p>
              <div
                style={{
                  border: "1px solid #ccc", // Optional: Rahmen für bessere Sichtbarkeit
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
                    {t('preview_text_no_adress_entered')}
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-description">
              <p>
                <strong>{t('preview_text_end')}</strong>{" "}
                {formData.endDate?.format("DD.MM.YYYY HH:mm") || t('preview_text_not_available')}
              </p>

              <div>
                <strong>{t('preview_text_description')}</strong>
                <div
                  style={{
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textDecoration: "none",
                    color: "#333",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    maxWidth: "100%",
                    margin: "0 auto",
                    maxHeight: "300px", // Höhe festlegen
                    overflowY: "auto", // Vertikales Scrollen aktivieren
                    border: "1px solid #ccc", // Optional: Rahmen für bessere Sichtbarkeit
                    padding: "10px", // Optional: Innenabstand
                    backgroundColor: "white", // Optional: Hintergrundfarbe
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formData.description || "<p>Keine Beschreibung angegeben</p>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


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
        console.log(t('text_coordinates_successfully_retrieved'), coordinates);
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
    const selectedType = e.target.value;
    setEventType(selectedType);

    if (selectedType === "Online") {
      setFormData({ ...formData, address: "Onlineveranstaltung" }); // Adresse entfernen
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


  const [open, setOpen] = useState(false);
  const handlePreview = () => {
    setOpen(true); // Öffnet das Dialogfeld
  };

  const handleClose = () => {
    setOpen(false); // Schließt das Dialogfeld
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
      >


        {/* Titel */}
        <DesignTitel style={{ textAlign: "center", marginBottom: "20px" }}>
          {t('title_first_part')}{formData.title}{t('title_second_part')}
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
                >{t('dropdown_event_type')}</InputLabel>
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
                  <MenuItem value="Präsenz">{t('dropdown_option_presence')}</MenuItem>
                  <MenuItem value="Online">{t('dropdown_option_online')}</MenuItem>
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
                label={t('textfield_event_title')}
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
                      label={t('textfield_start_date_and_time')}
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
                      label={t('textfield_end_date_and_time')}
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
                label={t('textfield_adress')}
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
                  border: "1px solid #ccc",
                  height: "250px", // Höhe der Karte anpassen
                  marginTop: "10px",
                  width: "100%",
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
                    {t('text_no_adress_entered')}
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Beschreibung */}
            <Grid item xs={6} marginTop={"10px"}>
              <Typography variant="h6" gutterBottom>
                {t('textfield_description')}
              </Typography>
              <div

              >
                <QuillEditor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, description: value }))
                  }
                />
              </div>
              {errors.description && (
                <Typography color="error" variant="caption">
                  {errors.description}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Zusätzliche Angaben */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t('textfield_capacity')}
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
                label={t('textfield_maximum_guests')}
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
                label={t('textfield_remember_in_days')}
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
          <Box display="flex"
            justifyContent="space-between"
            marginTop="20px"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2} >

            <RedButton
              onClick={handleCancelButon}
            >
              {t('button_cancel')}
            </RedButton>
            <Button variant="contained" color="primary" onClick={() => handlePreview()}>
              {t('button_preview')}
            </Button>
            <OrangeButton
              onClick={handleOpenInviteListDialog}
            >
              {t('button_invitation_list')}
            </OrangeButton>

            <GreenButton
              onClick={handleOpenPublishDialog}
            >
              {t('button_save')}
            </GreenButton>
          </Box>
        </Box>
      </StyledPaper>

      {/* Dialog */}
      <Dialog open={publishDialogOpen} onClose={handleClosePublishDialog}>
        <DialogContent>
          <Typography>
            {t('dialog_title')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <RedButton variant="outlined" onClick={() => handleDialogAction("cancel")}>
            {t('button_cancel')}
          </RedButton>
          <BlueButton
            onClick={() => handleDialogAction("publish")}
          >
            {t('button_yes')}
          </BlueButton>
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
          <RedButton onClick={handleCloseInviteListDialog}>
            {t('button_close')}
          </RedButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <Preview formData={formData} backgroundImage={backgroundImage} />
          <RedButton variant="outlined" onClick={handleClose}>
            {t('button_close')}
          </RedButton>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default InvitationForm;
