"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledPaper from "../../../../components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "../../../../components/styledComponents/StyledButton";
import DesignTitel from "../../../../components/styledComponents/DesignTitel";

function EventDetails() {
  const [eventData, setEventData] = useState({
    name: 'Veranstaltungsname',
    image: null,
    date: '2024-12-24',
    schedule: '10:00 - 18:00',
    location: 'Musterstraße 123, 12345 Musterstadt',
    contactInfo: 'info@beispiel.de',
    website: 'www.beispiel.de',
    rating: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setEventData({ ...eventData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleRatingChange = (newRating) => {
    setEventData({ ...eventData, rating: newRating });
  };

  return (
    <StyledPaper>
      <Box>
        <Card sx={{ marginBottom: 4, position: 'relative' }}>
          <Box
            sx={{
              position: 'relative',
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: `url(${eventData.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!eventData.image && <Typography variant="caption">Event Image Placeholder</Typography>}
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#eee' },
              }}
              component="label"
            >
              <CameraAltIcon />
              <input type="file" hidden onChange={handleImageUpload} />
            </IconButton>
          </Box>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                variant="outlined"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                label="Event Name"
              />
              <IconButton>
                <FavoriteBorderIcon color="error" />
              </IconButton>
            </Box>
            <GreenButton>
              Teilnehmen
            </GreenButton>
          </CardContent>
          <CardContent>
            <TextField
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              label="Datum"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>
        </Card>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Beschreibung
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={20}
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <GreenButton>
                    Bearbeitung speichern
                </GreenButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Zeitplan:
                </Typography>
                <TextField
                  name="schedule"
                  value={eventData.schedule}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="h6" gutterBottom>
                  Ort:
                </Typography>
                <TextField
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="h6" gutterBottom>
                  Kontakt-Informationen:
                </Typography>
                <TextField
                  name="contactInfo"
                  value={eventData.contactInfo}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="h6" gutterBottom>
                  Webseite:
                </Typography>
                <TextField
                  name="website"
                  value={eventData.website}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ marginY: 2 }}>
                  <FacebookIcon sx={{ marginRight: 1 }} />
                  <InstagramIcon />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Bewertung:
                </Typography>
                <Rating
                  name="rating"
                  value={eventData.rating}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </StyledPaper>
  );
}

export default EventDetails;