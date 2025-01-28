'use client';

import React, { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from '@/i18n/routing';
import { Box, Link, Typography } from '@mui/material';
import { useFetchApiData } from "@/app/[locale]/lib/useFetchApiData";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/app/[locale]/components/Footer';
import { BlueButton, RedButton, GreenButton } from '@/app/[locale]/components/styledComponents/StyledButton';
import { useTranslations } from 'next-intl';

// Funktion zur Generierung des Base Path
export const generateBasePath = (userInfo, user) => {
  return userInfo
    ? `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`
    : `/defaultInstanz/defaultOrganisation/${user?.sub}`;
};

const LogInOut = () => {
  const t = useTranslations('HomePage');
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
  <GreenButton>{t('button_login')}</GreenButton>
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
          {t('title')}
        </Typography>
        <Box sx={{ paddingBottom: '1rem' }}>
          {t('subtitle')}
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
            {t('second_title')}
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            {t('second_subtitle')}
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
            {t('third_title')}
          </Typography>
          <Box sx={{ paddingBottom: '1rem' }}>
            {t('third_subtitle')}
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
