'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useUserContext } from '@/app/[locale]/context/UserContext'; // Benutzerkontext
import { useTranslations } from 'next-intl';

const SimpleLogin = () => {
  const t = useTranslations('SimpleLogin');
  const [loginState, setLoginState] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { setUserInfo } = useUserContext(); // Benutzerinformationen setzen

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/data/users.json'); // JSON-Datei
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
      const data = await response.json();

      const user = data.organisation
        .flatMap((department) =>
          department.users.map((user) => ({
            ...user,
            organisation: department.name, // Organisation (Abteilung) hinzufügen
            instanz: data.instanz, // Instanz (Firma) hinzufügen
          }))
        )
        .find(
          (entry) =>
            entry.username === loginState.username &&
            entry.password === loginState.password
        );

      if (user) {
        alert(`${t('alert_login_successful_welcome')} ${user.name}`);
        setLoginError(false);

        // Benutzerinformationen im Kontext speichern
        setUserInfo({
          instanz: user.instanz,
          organisation: user.organisation,
          username: user.username,
          email: user.email,
          role: user.role,
        });

        // Weiterleitung zur Benutzerbasis-URL
        router.push(`/${user.instanz}/${user.organisation}/${user.username}`);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Fehler beim Laden der JSON-Daten:', error);
      setLoginError(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        padding: '2rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '300px',
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
          {t('text_login')}
        </Typography>
        <TextField
          label={t('textfield_username')}
          fullWidth
          margin="normal"
          value={loginState.username}
          onChange={(e) =>
            setLoginState({ ...loginState, username: e.target.value })
          }
        />
        <TextField
          label={t('textfield_password')}
          type="password"
          fullWidth
          margin="normal"
          value={loginState.password}
          onChange={(e) =>
            setLoginState({ ...loginState, password: e.target.value })
          }
        />
        {loginError && (
          <Typography variant="body2" color="error" sx={{ marginBottom: '1rem' }}>
            {t('text_invalid_login_data')}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t('button_login')}
        </Button>
      </Box>
    </Box>
  );
};

export default SimpleLogin;
