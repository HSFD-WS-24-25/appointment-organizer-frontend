'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Link } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography } from '@mui/material';
import Footer from '../components/Footer';
import { BlueButton, RedButton, GreenButton } from '../components/styledComponents/StyledButton'; 

const LogInOut = () => {
  const { user, isLoading } = useUser();

  // Bilder befinden sich unter public/images
  // Testbild namens image1.jpg
  const images = [
    {
      src: '/images/image1.jpg',
      caption: 'Feature 1',
    },
    {
      src: '/images/image1.jpg',
      caption: 'Feature 2',
    },
    {
      src: '/images/image1.jpg',
      caption: 'Feature 3',
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
        padding: '2rem',
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 150px)',
        }}
      >
        
        <Box // Image-Karussell
          sx={{
            width: '90%',
            maxWidth: '800px',
            height: '60vh',
            maxHeight: '500px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          <Slider {...settings}>
            {images.map((image, index) => (
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
                    height: 'calc(100% - 50px)',
                    objectFit: 'cover',
                    borderRadius: '0',
                    marginBottom: '0.5rem',
                    outline: 'none',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                  }}
                />
                <Typography variant="body1" sx={{ color: '#333' }}>
                  {image.caption}
                </Typography>
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

