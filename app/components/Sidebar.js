"use client";

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

function Sidebar() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
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
    router.push('/adminAnouncements');
  };

  const handleProfileClick = () => {
    router.push('/adminProfile');
  };

  const handleTerminClick = () => {
    router.push('/adminTermin');
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s ease', // Übergangsanimation für die Breite
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Dashboard" />}
          </ListItemButton>
          <ListItemButton>
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
          <ListItemButton onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Profil" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Einstellungen" />}
          </ListItemButton>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Logout" />}
          </ListItemButton>
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
