"use client";

import Sidebar from './Sidebar'
import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { ReportProblem } from '@mui/icons-material';

function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar/>
        </Box>
  );
}

export default AdminDashboard;
