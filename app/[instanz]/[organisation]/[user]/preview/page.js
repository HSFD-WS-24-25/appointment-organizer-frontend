"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import { GreenButton, RedButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";

function EventDetails({ event, inviteID, onSignUp }) {
  if (!event) {
    return <Typography variant="h6">Loading...</Typography>;
  }
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
            }}
          >
            <Typography variant="caption">Event Image Placeholder</Typography>
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#eee' },
              }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DesignTitel>
                {event.name}
              </DesignTitel>
              <IconButton>
                <FavoriteBorderIcon color="error" />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <GreenButton onClick={() => onSignUp("confirm")}>
                Teilnehmen
              </GreenButton>
              <RedButton onClick={() => onSignUp("decline")}>
                Ablehnen
              </RedButton>
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Datum: {new Date(event.date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Beschreibung
                </Typography>
                <Typography variant="body1">
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <GreenButton>
                  Bearbeiten
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
                <Typography variant="body2" gutterBottom>
                  <CalendarTodayIcon fontSize="small" /> 10:00 - 18:00
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Ort:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <LocationOnIcon fontSize="small" /> {event.location}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Kontakt-Informationen:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <ContactMailIcon fontSize="small" /> info@beispiel.de
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Webseite:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  www.beispiel.de
                </Typography>
                <Box sx={{ marginY: 2 }}>
                  <FacebookIcon sx={{ marginRight: 1 }} />
                  <InstagramIcon />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Bewertung:
                </Typography>
                <Rating value={4} readOnly />
              </CardContent>
              <Box
                sx={{
                  height: 200,
                  backgroundColor: '#e0e0e0',
                  marginTop: 2,
                  position: 'relative',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#666',
                  }}
                >
                  Map Placeholder
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </StyledPaper>
  );
}

export default EventDetails;