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
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatBoxUser from './ChatBoxUser';
import { useRouter } from 'next/navigation';

function SidebarUser() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die Sidebar-Erweiterung
  const router = useRouter();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die Sidebar bei Mouseleave
  };

  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die Sidebar bei Mouseover
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };

  const handleUserProfilClick = () => {
    router.push('/userProfile');
  };

  const handleUserSettingsClick = () => {
    router.push('/userSettings');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const mainMenuItems = [
    { icon: <GroupIcon style={{ color: '#ccc' }} />, text: "Veranstaltung erstellen", action: () => {} },
    { icon: <EventIcon style={{ color: '#ccc' }} />, text: "Meine Veranstaltungen", action: () => {} },
    { icon: <EventIcon style={{ color: '#ccc' }} />, text: "Meine Teilnahmen", action: () => {} },
  ];

  const bottomMenuItems = [
    { icon: <AccountCircleIcon style={{ color: '#ccc' }} />, text: "Profil", action: handleUserProfilClick },
    { icon: <SettingsIcon style={{ color: '#ccc' }} />, text: "Einstellungen", action: handleUserSettingsClick },
    { icon: <ExitToAppIcon style={{ color: '#ccc' }} />, text: "Logout", action: handleLogoutClick },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatBoxUser />
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
            <ListItemButton key={index} onClick={item.action} sx={{ justifyContent: isExpanded ? 'initial' : 'center' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  transition: 'opacity 0.3s ease, max-width 0.3s ease',
                  maxWidth: isExpanded ? '200px' : '0px',
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Bottom Menu */}
        <List>
          {bottomMenuItems.map((item, index) => (
            <ListItemButton key={index} onClick={item.action} sx={{ justifyContent: isExpanded ? 'initial' : 'center' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  transition: 'opacity 0.3s ease, max-width 0.3s ease',
                  maxWidth: isExpanded ? '200px' : '0px',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Mobile Hamburger Menu */}
      <Box 
        sx={{ 
          display: { xs: 'flex', sm: 'none' }, 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 1300, 
          width: '100%', 
          padding: 1 
        }}
      >
        {!drawerOpen && ( // Icon nur anzeigen, wenn Drawer nicht geöffnet ist
          <IconButton onClick={toggleDrawer} sx={{ color: '#black', marginLeft: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
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

      {/* Logout Confirmation Dialog */}
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

export default SidebarUser;
