"use client";

import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import SidebarUser from './SidebarUser';
import { useRouter } from 'next/navigation';

function UserDashboard() {
  
  const router = useRouter();

  const newEvent = () => {
    router.push('/event');
  };
  
  const myEvent = () => {
    router.push('/myevent');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SidebarUser />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        <h1>Willkommen ... (User) !</h1>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={newEvent}
            sx={{ backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Neue Veranstaltung
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={myEvent}
            sx={{ backgroundColor: 'orange', color: '#fff', '&:hover': { backgroundColor: 'darkorange' } }}
            
          >
            Meine Veranstaltungen
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard;