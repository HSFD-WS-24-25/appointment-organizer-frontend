"use client"
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Checkbox,
} from '@mui/material';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import {useFetchApiData} from "../../lib/useFetchApiData";
import {useUser} from '@auth0/nextjs-auth0/client';

const Page = () => {
  //const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { user, error: authError, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [userActionOpen, setUserActionOpen] = useState(false);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    telephone: '',
    address: '',
    group_id: '',
  });

  // Benutzer abrufen
  const path = "api/users";
  const method = 'GET';
  const {data: users, error: fetchError} = useFetchApiData(user, path, method);

  // Benutzer filtern
  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchFields = [
        user.first_name,
        user.last_name,
        user.id?.toString(),
        user.telephone,
        user.address,
        user.email,
        user.username,
        user.group_id?.toString(),
      ];
      return searchFields.some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Benutzer löschen
  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) return; // Keine Benutzer ausgewählt

    const confirmDelete = window.confirm(
      'Möchten Sie die ausgewählten Benutzer wirklich löschen?'
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedUserIds.map((id) =>
          fetch(`http://localhost:3001/api/users/${id}`, {
            method: 'DELETE',
          })
        )
      );
      setSelectedUserIds([]); // Auswahl zurücksetzen
      await fetchUsers(); // Benutzerliste aktualisieren
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  // Benutzer auswählen
  const handleCheckboxChange = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // Benutzer anzeigen oder bearbeiten öffnen
  const handleUserActionOpen = (user) => {
    setSelectedUser(user);
    setUserActionOpen(true);
  };

  const handleUserActionClose = () => {
    setSelectedUser(null);
    setUserActionOpen(false);
  };

  // Benutzerdetails anzeigen öffnen
  const handleUserDetailsOpen = () => {
    setUserActionOpen(false);
    setUserDetailsOpen(true);
  };

  const handleUserDetailsClose = () => {
    setUserDetailsOpen(false);
    setSelectedUser(null);
  };

  // Benutzer bearbeiten öffnen
  const handleEditUserOpen = () => {
    if (selectedUser) {
      setFormData({ ...selectedUser });
      setUserActionOpen(false);
      setEditUserOpen(true);
    }
  };

  const handleEditUserClose = () => {
    setEditUserOpen(false);
    setSelectedUser(null);
    setFormData({
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      telephone: '',
      address: '',
      group_id: '',
    });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Fehler beim Bearbeiten des Benutzers.');
      await fetchUsers();
      handleEditUserClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Benutzer hinzufügen
  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Fehler beim Hinzufügen des Benutzers.');
      await fetchUsers();
      handleCloseAddUser();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCloseAddUser = () => {
    setOpen(false);
    setFormData({
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      telephone: '',
      address: '',
      group_id: '',
    });
  };

  return (
    <StyledPaper>
      <DesignTitel>Benutzerübersicht</DesignTitel>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          label="Suchen"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flex: 1, marginRight: '20px' }}
        />
        <BlueButton onClick={() => setOpen(true)}>Benutzer hinzufügen</BlueButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {selectedUserIds.length > 0 && (
          <RedButton onClick={handleDeleteUsers}>
            Benutzer löschen
          </RedButton>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Vorname</strong></TableCell>
              <TableCell><strong>Nachname</strong></TableCell>
              <TableCell><strong>Telefon</strong></TableCell>
              <TableCell><strong>Gruppe</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </TableCell>
                <TableCell onClick={() => handleUserActionOpen(user)}>{user.first_name}</TableCell>
                <TableCell onClick={() => handleUserActionOpen(user)}>{user.last_name}</TableCell>
                <TableCell onClick={() => handleUserActionOpen(user)}>{user.telephone || 'N/A'}</TableCell>
                <TableCell onClick={() => handleUserActionOpen(user)}>
                  {user.group_id === 1 ? 'Admin' : 'User'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog für Benutzer hinzufügen */}
      <Dialog open={open} onClose={handleCloseAddUser}>
        <DialogTitle>Neuen Benutzer hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Benutzername"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vorname"
            fullWidth
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Nachname"
            fullWidth
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Telefon"
            fullWidth
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Gruppe"
            fullWidth
            value={formData.group_id}
            onChange={(e) => setFormData({ ...formData, group_id: parseInt(e.target.value, 10) })}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <RedButton onClick={handleCloseAddUser}>Abbrechen</RedButton>
          <BlueButton onClick={handleAddUser}>Hinzufügen</BlueButton>
        </DialogActions>
      </Dialog>

      {/* Dialog für Auswahl */}
      <Dialog open={userActionOpen} onClose={handleUserActionClose}>
        <DialogTitle>Benutzer auswählen</DialogTitle>
        <DialogContent>
          <Typography>Möchten Sie den Benutzer anzeigen oder bearbeiten?</Typography>
        </DialogContent>
        <DialogActions>
          <BlueButton onClick={handleUserDetailsOpen}>Anzeigen</BlueButton>
          <GreenButton onClick={handleEditUserOpen}>Bearbeiten</GreenButton>
        </DialogActions>
      </Dialog>

      {/* Dialog für Benutzer anzeigen */}
      <Dialog open={userDetailsOpen} onClose={handleUserDetailsClose}>
        <DialogTitle>Benutzer anzeigen</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography>ID: {selectedUser.id}</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Benutzername: {selectedUser.username}</Typography>
              <Typography>Vorname: {selectedUser.first_name}</Typography>
              <Typography>Nachname: {selectedUser.last_name}</Typography>
              <Typography>Telefon: {selectedUser.telephone || 'N/A'}</Typography>
              <Typography>Adresse: {selectedUser.address || 'N/A'}</Typography>
              <Typography>Gruppe: {selectedUser.group_id === 1 ? 'Admin' : 'User'}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <RedButton onClick={handleUserDetailsClose}>Schließen</RedButton>
        </DialogActions>
      </Dialog>

      {/* Dialog für Benutzer bearbeiten */}
      <Dialog open={editUserOpen} onClose={handleEditUserClose}>
        <DialogTitle>Benutzer bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Benutzername"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vorname"
            fullWidth
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Nachname"
            fullWidth
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Telefon"
            fullWidth
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Gruppe"
            fullWidth
            value={formData.group_id}
            onChange={(e) => setFormData({ ...formData, group_id: parseInt(e.target.value, 10) })}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <RedButton onClick={handleEditUserClose}>Abbrechen</RedButton>
          <BlueButton onClick={handleEditSubmit}>Speichern</BlueButton>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default Page;
