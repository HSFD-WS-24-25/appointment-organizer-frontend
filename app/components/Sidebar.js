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

function Sidebar() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die Sidebar-Erweiterung
  const router = useRouter();

  // For auth
  const {user, isLoading} = useUser();


  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die Sidebar bei Mouseover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die Sidebar bei Mouseleave
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleUsers = () => {
    router.push('/users');
  }

  const handleAnouncements = () => {
    router.push('/adminAnouncements');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleTerminClick = () => {
    router.push('/adminTermin');
  };

  const notificationClick = () => {
    router.push('/adminNotification');
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: isExpanded ? 250 : 80, // Erweiterung der Sidebar bei Mouseover
          backgroundColor: '#333',
          color: '#ccc',
          paddingTop: 2,
          paddingLeft: 0,
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
              <DashboardIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Dashboard" />}
          </ListItemButton>
          <ListItemButton onClick={handleUsers}>
            <ListItemIcon>
              <GroupIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benutzerverwaltung" />}
          </ListItemButton>
          <ListItemButton onClick={handleTerminClick}>
            <ListItemIcon>
              <EventIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Terminmanagement" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benachrichtigungen" />}
          </ListItemButton>
          <ListItemButton onClick={handleAnouncements}>
            <ListItemIcon>
              <ReportProblem style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Ankündigungen" />}
          </ListItemButton>
        </List>
        <List>
          {user ? (
              <>
          <ListItemButton onClick={handleProfileClick}>
            <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 40 }}>
              <Avatar src = {user.picture} alt={user.name} sx={{ width: 30, height: 30 }}/>
            </ListItemAvatar>
            {isExpanded && <ListItemText primary={user.name} />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Einstellungen" />}
          </ListItemButton>
          <ListItemButton href="/api/auth/logout">
            <ListItemIcon>
              <ExitToAppIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Logout" />}
          </ListItemButton>
          </>
              ) : (
          <ListItemButton href="/api/auth/login">
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Login" />}
          </ListItemButton>
              )}
        </List>
      </Box>

      {/* Logout-Bestätigungsdialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Abmelden</DialogTitle>
        <DialogContent>
          <DialogContentText>Möchten Sie sich wirklich abmelden?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">Nein</Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>Ja</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Sidebar;
