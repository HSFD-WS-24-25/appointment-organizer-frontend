"use client";

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar, 
  ListItemAvatar,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { CenterFocusStrong, ReportProblem } from '@mui/icons-material';

// For authentication
import { useUser } from '@auth0/nextjs-auth0/client';
import {SidebarLogInOut, LogoutDialog} from './SidebarLogInOut'
import * as PropTypes from "prop-types";



function SidebarAdmin() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die SidebarAdmin-Erweiterung
  const router = useRouter();

  // For auth
  const {user, isLoading} = useUser();


  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die SidebarAdmin bei Mouseover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die SidebarAdmin bei Mouseleave
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleUsers = () => {
    router.push('/users');
  }

  const handleAnouncements = () => {
    router.push('/admin/announcements');
  };

  const handleProfileClick = () => {
    router.push('/admin/profile');
  };

  const handleTerminClick = () => {
    router.push('/admin/termin');
  };

  const notificationClick = () => {
    router.push('/admin/notification');
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogin = () => {
    console.log(user);
  }

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: isExpanded ? 250 : 80, // Erweiterung der SidebarAdmin bei Mouseover
            backgroundColor: '#333',
            color: '#ccc',
            paddingTop: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'width 0.3s ease',
            '& .MuiListItemIcon-root': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 40,
            },
          }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Dashboard"/>}
          </ListItemButton>
          <ListItemButton onClick={handleUsers}>
            <ListItemIcon>
              <GroupIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benutzerverwaltung"/>}
          </ListItemButton>
          <ListItemButton onClick={handleTerminClick}>
            <ListItemIcon>
              <EventIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Terminmanagement"/>}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benachrichtigungen"/>}
          </ListItemButton>
          <ListItemButton onClick={handleAnouncements}>
            <ListItemIcon>
              <ReportProblem style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Ankündigungen"/>}
          </ListItemButton>
        </List>
        <SidebarLogInOut user={user} onClick={handleProfileClick} expanded={isExpanded} onClick1={handleLogoutClick}/>
      </Box>

      <LogoutDialog open={openLogoutDialog} onClose={handleLogoutCancel}/>
    </Box>
  );
}

export default SidebarAdmin;
