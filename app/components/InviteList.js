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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';

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
          justifyContent: 'flex-start',
          padding: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>Einladungsliste</Typography>

        {/* Section for guests who have participated before */}
        <Typography variant="h6" gutterBottom>Gäste die schon an anderen Veranstaltungen teilgenommen haben:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <TextField variant="outlined" placeholder="Search" size="small" sx={{ marginRight: 2 }} />
        </Box>
        <TableContainer component={Paper} sx={{ width: '80%', marginBottom: 4 }}>
          <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Gast-Informationen</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Teilgenommen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {["Max Mustermann", "Alice Müller", "Tom Gast"].map((name, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{name.toLowerCase().replace(" ", ".")}@beispiel.de</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}><input type="checkbox" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Section for new guest email input */}
        <Typography variant="h6" gutterBottom>Für Neue Gäste tragen Sie bitte die Emails ein:</Typography>
        <TableContainer component={Paper} sx={{ width: '80%', marginBottom: 3 }}>
          <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Gast-Informationen</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {["Julia Schmidt", "Peter Neumann", "Franz Gast"].map((name, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{name.toLowerCase().replace(" ", ".")}@beispiel.de</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Zurück zu Veranstaltungs
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'red', color: '#fff', '&:hover': { backgroundColor: 'darkred' } }}
          >
            Abbrechen
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
    </Box>
  );
}

export default UserDashboard;
