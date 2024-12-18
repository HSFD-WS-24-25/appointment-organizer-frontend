'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Link, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/app/components/Footer';
import { BlueButton, RedButton, GreenButton } from '@/app/components/styledComponents/StyledButton';

const LogInOut = () => {
  const { user, isLoading } = useUser();

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
          <Link href="/api/auth/login">
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
              <Link href="/user">
                <BlueButton>User</BlueButton>
              </Link>
              <Link href="/admin">
                <BlueButton>Admin</BlueButton>
              </Link>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Link href="/api/auth/logout">
                <RedButton>Logout</RedButton>
              </Link>
            </Box>
          </Box>
        )}
      </Box>

      {/* Erster Abschnitt */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 150px)',
          padding: '1rem',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            paddingBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Veranstaltungen planen und erstellen!
        </Typography>
        <Box sx={{ paddingBottom: '1rem' }}>
          Erstelle innerhalb von wenigen Sekunden deine eigene Veranstaltung und veröffentliche sie
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            height: { xs: '50vh', sm: '60vh' },
            maxHeight: '500px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          <Slider {...settings}>
            {carousel1.map((image, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0',
                    marginBottom: '0.5rem',
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Zweiter Abschnitt */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 150px)',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingRight: { xs: 0, sm: '2rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              paddingBottom: '1rem',
            }}
          >
            Alle wichtigen Informationen und Teilnehmer an einem Ort!
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            Verliere niemals den Überblick einer Veranstaltung und rufe alle wichtigen Informationen auf.
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            height: { xs: '50vh', sm: '60vh' },
            maxHeight: '500px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}
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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 150px)',
          flexDirection: { xs: 'column', sm: 'row-reverse' },
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingLeft: { xs: 0, sm: '2rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              paddingBottom: '1rem',
            }}
          >
            Verwalte Deine Veranstaltungen mit Leichtigkeit!
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            Plane, bearbeite und organisiere all deine Events an einem einzigen Ort – effizient und einfach.
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            height: { xs: '50vh', sm: '60vh' },
            maxHeight: '500px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}
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
