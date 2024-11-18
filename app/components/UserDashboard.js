"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarUser from './SidebarUser';

function UserDashboard() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    router.push('/');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };


  const newEvent = () => {
    router.push('/event');
  };
  
  const myEvent = () => {
    router.push('/myevent');
  };
  

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: '#333',
          color: '#ccc',
          paddingTop: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <GroupAddIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Veranstaltung erstellen" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EventAvailableIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Meine Veranstaltungen" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Meine Veranstaltungen als Teilnehmer" />
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Einstellungen" />
          </ListItemButton>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: '#ccc' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        <h1>Willkommen ... (User) !</h1>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={newEvent}
            sx={{ backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Neue Veranstaltung
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={myEvent}
            sx={{ backgroundColor: 'orange', color: '#fff', '&:hover': { backgroundColor: 'darkorange' } }}
            
          >
            Meine Veranstaltungen
          </Button>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Abmelden</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchten Sie sich wirklich abmelden?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Nein
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
      <SidebarUser />
              <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: 3 }}>
          <h1>Willkommen auf der Benutzerseite</h1>
        </Box>
    </Box>
  );
}

export default UserDashboard;