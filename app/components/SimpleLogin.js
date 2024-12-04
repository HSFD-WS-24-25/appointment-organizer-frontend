'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useUserContext } from '../context/UserContext'; // Benutzerkontext

const SimpleLogin = () => {
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
        alert(`Login erfolgreich! Willkommen, ${user.name}`);
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
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={loginState.username}
          onChange={(e) =>
            setLoginState({ ...loginState, username: e.target.value })
          }
        />
        <TextField
          label="Password"
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
            Ungültige Zugangsdaten
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default SimpleLogin;
