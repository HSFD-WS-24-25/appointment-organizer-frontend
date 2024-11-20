"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';

function UserDashboard() {

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: 3 }}>
          <h1>Willkommen auf der Benutzerseite</h1>
        </Box>
    </Box>
  );
}

export default UserDashboard;