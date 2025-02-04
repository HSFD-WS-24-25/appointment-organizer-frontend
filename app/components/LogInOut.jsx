'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";
import { Box, Link, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useFetchApiData } from "@/app/lib/useFetchApiData";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/app/components/Footer';
import { BlueButton, RedButton, GreenButton } from '@/app/components/styledComponents/StyledButton';

// Funktion zur Generierung des Base Path
export const generateBasePath = (userInfo, user) => {
  return userInfo
    ? `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`
    : `/defaultInstanz/defaultOrganisation/${user?.sub}`;
};

const LogInOut = () => {

  const [announcements, setAnnouncements] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // Standardmäßig sichtbar

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/aapi/create-announcments", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Daten");
        }

        const data = await response.json();
        setAnnouncements(data); // Daten in den State setzen
      } catch (error) {
        console.error("Fehler beim Abrufen der Ankündigungen:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const lognAnnouncements = useMemo(() => {
    return announcements.filter(
      (ann) => ann.status === "Active" && ann.target === "Loginseite"
    );
  }, [announcements]);


  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen
  const router = useRouter();

  // Daten über Auth0 und die API laden
  const { user, error: authError, isLoading } = useUser();
  const path = "/api/users"; // Endpoint zum Abrufen der Benutzerdaten
  const method = "GET";
  const { data: users, error: fetchError } = useFetchApiData(user, path, method);

  // Base Path generieren
  const basePath = generateBasePath(userInfo, user);

  // Weiterleitung zu basePath bei Login
  useEffect(() => {
    if (!isLoading && user && window.location.pathname === '/') {
      const basePath = generateBasePath(userInfo, user);
      router.push(basePath);
    }
  }, [user, userInfo, isLoading]);


  const carousel1 = [
    {
      src: '/images/Veranstaltungserstellung.png',
    },
    {
      src: '/images/Veranstaltungserstellung2.png',
    },
  ];

  const carousel2 = [
    {
      src: '/images/Veranstaltungsinformationen.png',
    },
    {
      src: '/images/Einladungsliste.png',
    },
  ];

  const carousel3 = [
    {
      src: '/images/MeineVeranstaltungen.png',
    },
    {
      src: '/images/MeineVeranstaltungen2.png',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        paddingTop: '2rem',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {!isLoading && !user ? (
          <Link href={`/api/auth/login?returnTo=${basePath}`}>
            <GreenButton>Login</GreenButton>
          </Link>
        ) : (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
            </Box>
          </Box>
        )}
      </Box>
      {/* Pop-up */}
      {showPopup && lognAnnouncements.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 20, // Abstand von oben
            left: '50%',
            transform: 'translateX(-50%)', // Zentrierung
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            zIndex: 10, // Sicherstellen, dass es im Vordergrund bleibt
            maxWidth: '90%',
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
            Aktive Ankündigungen
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Titel</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Typ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Startdatum</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Enddatum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lognAnnouncements.map((ann) => (
                  <TableRow key={ann.id}>
                    <TableCell>{ann.title}</TableCell>
                    <TableCell>{ann.type}</TableCell>
                    <TableCell>{new Date(ann.startDate).toLocaleString()}</TableCell>
                    <TableCell>{new Date(ann.endDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: '#f50057',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </Box>
        </Box>
      )}
      {/* Erster Abschnitt */}
      <Box

      >
        <Typography
        >
          Veranstaltungen planen und erstellen!
        </Typography>
        <Box sx={{ paddingBottom: '1rem' }}>
          Erstelle innerhalb von wenigen Sekunden deine eigene Veranstaltung und veröffentliche sie
        </Box>
        <Box
        >
          <Slider {...settings}>
            {carousel1.map((image, index) => (
              <Box
                key={index}
              >
                <img
                  src={image.src}
                  alt={image.caption}

                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Zweiter Abschnitt */}
      <Box
      >
        <Box
          sx={{
            flex: 1,
            paddingRight: { xs: 0, sm: '2rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
          >
            Alle wichtigen Informationen und Teilnehmer an einem Ort!
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            Verliere niemals den Überblick einer Veranstaltung und rufe alle wichtigen Informationen auf.
          </Box>
        </Box>
        <Box
        >
          <Slider {...settings}>
            {carousel2.map((image, index) => (
              <Box key={index}>
                <img
                  src={image.src}
                  alt={image.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Dritter Abschnitt */}
      <Box
      >
        <Box

        >
          <Typography
          >
            Verwalte Deine Veranstaltungen mit Leichtigkeit!
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            Plane, bearbeite und organisiere all deine Events an einem einzigen Ort – effizient und einfach.
          </Box>
        </Box>
        <Box
        >
          <Slider {...settings}>
            {carousel3.map((image, index) => (
              <Box key={index}>
                <img
                  src={image.src}
                  alt={image.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
export default LogInOut;
