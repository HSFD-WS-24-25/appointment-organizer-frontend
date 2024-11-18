"use client";

import Sidebar from './Sidebar'
import React, { useState } from 'react';
import { Box } from '@mui/material';

function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar/>
        </Box>
  );
}

export default AdminDashboard;
