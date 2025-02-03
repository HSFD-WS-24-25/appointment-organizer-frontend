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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { GreenButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function EventDetails() {
    const t = useTranslations('Preview');

    return (
      <StyledPaper>
  
        {/* Main Content */}
        <Box>
          {/* Event Header Section */}
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
              <Typography variant="caption">{t('text_event_image_placeholder')}</Typography>
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
                  {t('title')}
                </DesignTitel>
                <IconButton>
                  <FavoriteBorderIcon color="error" />
                </IconButton>
              </Box>
              <GreenButton>
                {t('button_praticipate')}
              </GreenButton>
            </CardContent>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Datum: 24. Dezember 2024
              </Typography>
            </CardContent>
          </Card>
  
          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Description Section */}
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('description')}
                  </Typography>
                  <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula dui vitae justo
                    elementum, nec vehicula velit fermentum.
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <GreenButton>
                    {t('button_edit')}
                  </GreenButton>
                </CardActions>
              </Card>
            </Grid>
  
            {/* Event Info Section */}
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('text_time')}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <CalendarTodayIcon fontSize="small" /> 10:00 - 18:00
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {t('text_location')}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <LocationOnIcon fontSize="small" /> Musterstraße 123, 12345 Musterstadt
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {t('text_contact_information')}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <ContactMailIcon fontSize="small" /> info@beispiel.de
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {t('text_website')}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    www.beispiel.de
                  </Typography>
                  <Box sx={{ marginY: 2 }}>
                    <FacebookIcon sx={{ marginRight: 1 }} />
                    <InstagramIcon />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {t('text_rating')}
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
                    {t('text_map_placeholder')}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    );
}
