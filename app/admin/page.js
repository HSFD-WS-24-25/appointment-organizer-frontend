"use client";

import Sidebar from '../components/Sidebar'
import React, { useState } from 'react';
import { Box } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar/>
        </Box>
  );
}
