"use client";

import AnnouncementCreationFrom from '../../components/AnnouncementCreationForm'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography
} from "@mui/material";

export default function AdminCreateAnnouncements() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, backgroundColor: '#white', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
      
        </Typography>

        {/* Announcement Creation Form */}
        <AnnouncementCreationFrom />
      </Box>
    </Box>
  );
}
