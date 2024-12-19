"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useFetchApiData } from "@/app/lib/useFetchApiData";


const UserControl = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Aktuell bearbeiteter Benutzer
  const [selectedIds, setSelectedIds] = useState([]); // Ausgewählte Benutzer für Löschung
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog zum Hinzufügen von Benutzern
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Dialog zum Bearbeiten von Benutzern
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    role: "",
    organisation: "",
  }); // Neuer Benutzer
  const [errorMessage, setErrorMessage] = useState(""); // Fehleranzeige



  //Benutzer anzeigen
  const { user, error: authError, isLoading } = useUser();
  const path = "/api/users";
  const method = 'GET';
  const { data: users, error: fetchError } = useFetchApiData(user, path, method);



  if (isLoading) return <div>Loading...</div>;
  if (authError) return <div>Error loading user data: {authError.message}</div>;
  if (!user) return <div>Please log in</div>;
  if (fetchError) return <div>Error fetching user data: {fetchError.message}</div>;


  // Checkbox-Handling
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  // Benutzer hinzufügen
  const handleAddUser = async () => {
    if (
      !newUser.username ||
      !newUser.password ||
      !newUser.email ||
      !newUser.name ||
      !newUser.role ||
      !newUser.organisation
    ) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      const response = await fetch("/aapi/get-organisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

      const addedUser = await response.json();
      setUsers([...users, addedUser]); // Aktualisiere Benutzerliste lokal
      setNewUser({ username: "", password: "", email: "", name: "", role: "", organisation: "" });
      setDialogOpen(false); // Schließe den Dialog
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Benutzers:", error);
      setErrorMessage("Fehler beim Hinzufügen des Benutzers.");
    }
  };

  // Profil bearbeiten
  const handleEditUser = (user) => {
    setSelectedUser({ ...user, password: "" }); // Passwort leer setzen, um es manuell zu ändern
    setEditDialogOpen(true); // Bearbeiten-Dialog öffnen
  };

  // Änderungen speichern
  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch("/aapi/get-organisation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });
      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers); // Aktualisiere Benutzerliste lokal
      setEditDialogOpen(false); // Schließe den Bearbeiten-Dialog
      setSelectedUser(null); // Leere das `selectedUser`-Objekt
    } catch (error) {
      console.error("Fehler beim Speichern der Änderungen:", error);
      setErrorMessage("Fehler beim Speichern der Änderungen.");
    }
  };

  // Mehrere Benutzer löschen
  const handleDeleteSelected = async () => {
    try {
      await fetch("/aapi/get-organisation", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const remainingUsers = users.filter((user) => !selectedIds.includes(user.id));
      setUsers(remainingUsers);
      setSelectedIds([]);
    } catch (error) {
      console.error("Fehler beim Löschen der Benutzer:", error);
      setErrorMessage("Fehler beim Löschen der Benutzer.");
    }
  };


  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1: return "Instanzadmin";
      case 2: return "Organisationsadmin";
      case 3: return "Organisator";
      case 4: return "Gast";
      default: return "Keine Rolle";
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ padding: 4 }}>
        <DesignTitel variant="h4" gutterBottom>
          Benutzerverwaltung
        </DesignTitel>

        {errorMessage && (
          <Typography color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          Benutzer hinzufügen
        </Button>

        <Button
          variant="contained"
          color="secondary"
          disabled={selectedIds.length === 0}
          sx={{ marginLeft: 2, marginBottom: 2 }}
        >
          Ausgewählte löschen
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedIds.length > 0 && selectedIds.length === users.length
                    }
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Benutzername</TableCell>
                <TableCell>E-Mail</TableCell>
                <TableCell>Vorname</TableCell>
                <TableCell>Nachname</TableCell>
                <TableCell>Telefonnummer</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Rolle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{getRoleName(user.role_id)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditUser(user)}
                    >
                      Bearbeiten
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog für Benutzer hinzufügen */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Benutzer hinzufügen</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Benutzername"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Passwort"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="E-Mail"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Rolle"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Bitte wählen</option>
              <option value="organisation-admin">Organisation-Admin</option>
              <option value="organisator">Organisator</option>
              <option value="teilnehmer">Teilnehmer</option>
            </TextField>
            <TextField
              fullWidth
              label="Organisation"
              value={newUser.organisation}
              onChange={(e) => setNewUser({ ...newUser, organisation: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              Abbrechen
            </Button>
            <Button>
              Hinzufügen
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog für Benutzer bearbeiten */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Benutzername"
              value={selectedUser?.username || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, username: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="E-Mail"
              value={selectedUser?.email || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Vorname"
              value={selectedUser?.first_name || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, first_name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nachname"
              value={selectedUser?.last_name || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, last_name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Adresse"
              value={selectedUser?.address || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, address: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              select
              value={selectedUser?.role || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              {/* Dynamische Optionen mit Hilfsfunktion */}
              {[1, 2, 3, 4].map((roleId) => (
                <option key={roleId} value={roleId}>
                  {getRoleName(roleId)}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">
              Abbrechen
            </Button>
            <Button>
              Speichern
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </StyledPaper>
  );
};

export default UserControl;
