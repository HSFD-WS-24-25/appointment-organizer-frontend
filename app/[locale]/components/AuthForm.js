// src/components/AuthForm.js
"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

function AuthForm() {
  const t = useTranslations('AuthForm');
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      router.push('/admin');
    } else if (username === 'user' && password === 'user') {
      router.push('/user');
    } else {
      alert(t('alert_invalid_login_data'));
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e0e0e0',
      }}
    >
      <Card
        sx={{
          width: 300,
          padding: 2,
          backgroundColor: isRegister ? '#333' : '#ddd',
          color: isRegister ? '#fff' : '#333',
          borderRadius: 3,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
          transition: '0.5s ease',
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isRegister ? t('text_register') : t('text_login')}
          </Typography>

          {isRegister ? (
            <>
              <TextField
                label={t('textfield_username')}
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <TextField
                label={t('textfield_email')}
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <TextField
                label={t('textfield_phone_number')}
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <TextField
                label={t('textfield_password')}
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  color: '#333',
                  fontWeight: 'bold',
                  ':hover': {
                    backgroundColor: '#ddd',
                  },
                }}
              >
                {t('button_register')}
              </Button>
            </>
          ) : (
            <>
              <TextField
                label={t('textfield_username')}
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <TextField
                label={t('textfield_password')}
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2, backgroundColor: '#ddd' }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: 'bold',
                  ':hover': {
                    backgroundColor: '#555',
                  },
                }}
              >
                {t('button_login')}
              </Button>
            </>
          )}
        </CardContent>
        <Box
          sx={{
            textAlign: 'center',
            padding: 1,
            backgroundColor: isRegister ? '#ddd' : '#333',
            color: isRegister ? '#333' : '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginTop: 2,
            cursor: 'pointer',
          }}
          onClick={toggleForm}
        >
          <Typography variant="body1">
            {isRegister ? t('text_login') : t('text_register')}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default AuthForm;
