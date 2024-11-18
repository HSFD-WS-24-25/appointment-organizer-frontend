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
import { ReportProblem } from '@mui/icons-material';
import ChatboxAdmin from './ChatBoxAdmin';

function Sidebar() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die Sidebar-Erweiterung
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die Sidebar bei Mouseover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die Sidebar bei Mouseleave
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const mainMenuItems = [
    { icon: <DashboardIcon style={{ color: '#ccc' }} />, text: "Dashboard", action: () => {} },
    { icon: <GroupIcon style={{ color: '#ccc' }} />, text: "Benutzerverwaltung", action: () => {} },
    { icon: <EventIcon style={{ color: '#ccc' }} />, text: "Terminmanagement", action: handleTerminClick },
    { icon: <NotificationsIcon style={{ color: '#ccc' }} />, text: "Benachrichtigungen", action: notificationClick },
    { icon: <ReportProblem style={{ color: '#ccc' }} />, text: "Ankündigungen", action: handleAnouncements },
  ];

  const bottomMenuItems = [
    { icon: <AccountCircleIcon style={{ color: '#ccc' }} />, text: "Profil", action: handleProfileClick },
    { icon: <SettingsIcon style={{ color: '#ccc' }} />, text: "Einstellungen", action: () => {} },
    { icon: <ExitToAppIcon style={{ color: '#ccc' }} />, text: "Logout", action: handleLogoutClick },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatboxAdmin />
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: isExpanded ? 250 : 80,
          backgroundColor: '#333',
          color: '#ccc',
          paddingTop: 2,
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Main Menu */}
        <List>
          {mainMenuItems.map((item, index) => (
            <ListItemButton key={index} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isExpanded && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>

        {/* Bottom Menu */}
        <List>
          {bottomMenuItems.map((item, index) => (
            <ListItemButton key={index} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isExpanded && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Mobile Hamburger Menu */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, padding: 1 }}>
        <IconButton onClick={toggleDrawer} sx={{ color: '#black' }}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: 250, backgroundColor: '#333', color: '#ccc' },
          }}
        >
          <List>
            {mainMenuItems.map((item, index) => (
              <ListItemButton key={index} onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <List>
            {bottomMenuItems.map((item, index) => (
              <ListItemButton key={index} onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
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
