"use client";
import React, { useState, useEffect } from "react";
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
  DialogActions
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactDOM from "react-dom/client";
import { usePostEvent } from "@/app/hooks/usePostEvent"
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren
import { useRouter } from "next/navigation";

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
    } else if (action === "invitationList") {
      console.log("Wechseln zur Einladungsliste...");
      // Logik für Einladungsliste
    } else {
      console.log("Aktion abgebrochen.");
    }
    handleCloseDialog();
  };

  const Preview = ({ formData, backgroundImage }) => (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "20px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
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
          <h1 style={{ fontSize: "2.5em", fontWeight: "bold" }}>Einladung</h1>
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
        <p>
          <strong>Titel:</strong> {formData.title}
        </p>
        <p>
          <strong>Typ:</strong> {eventType}
        </p>
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
              <strong>Start:</strong> {formData.startDate?.format("DD.MM.YYYY HH:mm") || "N/A"}
            </p>
            <p>
              <strong>Adresse:</strong> {formData.address || "N/A"}
            </p>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid #ccc",
                height: "200px",
                marginTop: "10px",
              }}
            >
              Platzhalter für Maps
            </div>
          </div>
          <div>
            <p>
              <strong>Ende:</strong> {formData.endDate?.format("DD.MM.YYYY HH:mm") || "N/A"}
            </p>
            <p>
              <strong>Beschreibung:</strong> 
            </p>
            <p>              {formData.description || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && value.length > 50) return;

    if (["capacity", "maxGuests", "reminderDays"].includes(name) && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
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

  const handlePreview = () => {
    const previewWindow = window.open("", "Vorschau", "width=800,height=600");
    if (previewWindow) {
      const rootElement = previewWindow.document.createElement("div");
      previewWindow.document.body.appendChild(rootElement);

      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <Preview formData={formData} />
      );

      const styleElement = previewWindow.document.createElement("style");
      styleElement.textContent = `
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: center;
          color: #333;
        }
      `;
      previewWindow.document.head.appendChild(styleElement);
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
      <Container maxWidth="md">
<Paper
  elevation={3}
  style={{
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  }}
>
  <Typography variant="h4" gutterBottom>
    Einladungsseite erstellen
  </Typography>

  <input
    accept="image/*"
    type="file"
    onChange={handleImageUpload}
    style={{ marginBottom: "20px" }}
  />

<TextField
            label="Titel"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            style={{ marginBottom: "20px" }}
          />


  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <Select
        value={eventType}
        onChange={handleEventTypeChange}
        fullWidth
      >
        <MenuItem value="Präsenz">Präsenz</MenuItem>
        <MenuItem value="Online">Online</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                disabled={eventType === "Online"}
              />
    </Grid>
    <Grid item xs={12} sm={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
                  label="Startdatum & Uhrzeit"
                  value={formData.startDate}
                  onChange={(newValue) => handleDateChange("startDate", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.startDate}
                      helperText={errors.startDate}
                      fullWidth
                    />
                  )}
                />
      </LocalizationProvider>
    </Grid>
    <Grid item xs={12} sm={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
                  label="Enddatum & Uhrzeit"
                  value={formData.endDate}
                  onChange={(newValue) => handleDateChange("endDate", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.endDate}
                      helperText={errors.endDate}
                      fullWidth
                    />
                  )}
                />
      </LocalizationProvider>
    </Grid>
  </Grid>

  <Grid container spacing={3} style={{ marginTop: "20px" }}>
    <Grid item xs={12} sm={6}>
      <Box
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          height: "200px",
        }}
      >
        Platzhalter für Maps
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
            label="Beschreibung"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={4}
            fullWidth
          />
    </Grid>
  </Grid>

  <Grid container spacing={3} style={{ marginTop: "20px" }}>
    <Grid item xs={12} sm={4}>
    <TextField
                label="Kapazität"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                error={!!errors.capacity}
                helperText={errors.capacity}
                fullWidth
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
              />
    </Grid>
  </Grid>

  <Box display="flex" justifyContent="space-between" marginTop="20px">
    <Button
      variant="contained"
      sx={{
        backgroundColor: "red", // Grüne Hintergrundfarbe
        "&:hover": {
          backgroundColor: "darkred", // Beim Hover-Effekt dunkler
        },
      }}
      onClick={handleClearForm}
    >
      Formular leeren
    </Button>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "green", // Grüne Hintergrundfarbe
        "&:hover": {
          backgroundColor: "darkgreen", // Beim Hover-Effekt dunkler
        },
      }}
      onClick={handleOpenDialog}
    >
      Veröffentlichen
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handlePreview}
    >
      Vorschau
    </Button>
  </Box>
</Paper>

{/* Dialog */}
<Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Veranstaltung veröffentlichen</DialogTitle>
        <DialogContent>
          <Typography>
            Möchten Sie die Veranstaltung veröffentlichen?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDialogAction("publish")}
          >
            Veröffentlichen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDialogAction("invitationList")}
          >
            Einladungsliste
          </Button>
          <Button variant="outlined" onClick={() => handleDialogAction("cancel")}>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>

</Container>
    </div>
  );
};

export default InvitationForm;