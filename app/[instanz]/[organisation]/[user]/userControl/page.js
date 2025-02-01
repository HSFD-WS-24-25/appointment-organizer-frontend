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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/lib/useFetchApiData";
import { usePutUser } from "@/app/hooks/usePutUser";
import { useDeleteUser } from "@/app/hooks/useDeleteUser"

const UserControl = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { putUser } = usePutUser();
  const [confirmSaveDialogOpen, setConfirmSaveDialogOpen] = useState(false);
  const { user, error: authError, isLoading } = useUser();
  const { deleteUser } = useDeleteUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: users, error: fetchError } = useFetchApiData(user, "/api/users", "GET");
  const [error, setError] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (authError) return <div>Error loading user data: {authError.message}</div>;
  if (!user) return <div>Please log in</div>;
  if (fetchError) return <div>Error fetching user data: {fetchError.message}</div>;

  const handleEditUser = (user) => {
    setSelectedUser({ ...user }); // Sicherstellen, dass die richtige ID gesetzt wird
    setEditDialogOpen(true);
  };

  const handleConfirmSave = () => {
    setConfirmSaveDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    const payload = {
      id: selectedUser.id,
      firstName: selectedUser.first_name,
      lastName: selectedUser.last_name,
      telephone: selectedUser.telephone,
      email: selectedUser.email,
      username: selectedUser.username,
      address: selectedUser.address,
      role_id: selectedUser.role_id,
      organization_id: selectedUser.organization_id || null,
    };

    const { success, message } = await putUser(selectedUser.id, payload);
    if (success) {
      setEditDialogOpen(false);
      setConfirmSaveDialogOpen(false);
      setErrorMessage(""); // Fehler zurücksetzen
      window.location.reload();
    } else {
      setErrorMessage(message);
    }
  };

  const handleDeleteUser = async (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    const { success, message } = await deleteUser(selectedUser.id);
    if (success) {
      setDeleteDialogOpen(false);
      setErrorMessage(""); // Fehler zurücksetzen
      window.location.reload();
    } else {
      setErrorMessage(message);
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Benutzername</TableCell>
                <TableCell>E-Mail</TableCell>
                <TableCell>Vorname</TableCell>
                <TableCell>Nachname</TableCell>
                <TableCell>Telefonnummer</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Rolle</TableCell>
                <TableCell>Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
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
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteUser(user)}
                      sx={{ ml: 1 }}
                    >
                      Löschen
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Dialog für Benutzer bearbeiten */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Benutzername"
              value={selectedUser?.username || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="E-Mail"
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Vorname"
              value={selectedUser?.first_name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nachname"
              value={selectedUser?.last_name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Adresse"
              value={selectedUser?.address || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telefonnummer"
              value={selectedUser?.telephone || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue === "" || inputValue.startsWith("0") || inputValue.startsWith("+")) {
                  setSelectedUser({ ...selectedUser, telephone: inputValue });
                  setError(false);
                } else {
                  setError(true);
                }
              }}
              error={error}
              helperText={error ? "Die Telefonnummer muss mit 0 oder + beginnen!" : ""}
              margin="normal"
            />

            <TextField
              fullWidth
              select
              value={selectedUser?.role_id || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, role_id: parseInt(e.target.value) })}
              margin="normal"
              SelectProps={{ native: true }}
            >
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
            <Button onClick={handleConfirmSave} color="primary">
              Speichern
            </Button>
          </DialogActions>
        </Dialog>
        {/* Bestätigungsdialog für Speichern */}
        <Dialog open={confirmSaveDialogOpen} onClose={() => setConfirmSaveDialogOpen(false)}>
          <DialogTitle>Änderungen übernehmen?</DialogTitle>
          <DialogContent>
            <Typography>Möchten Sie die Änderungen wirklich speichern?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmSaveDialogOpen(false)} color="secondary">
              Nein
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Ja
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog für Benutzer löschen */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Benutzer löschen</DialogTitle>
          <DialogContent>
            <Typography>Möchten Sie wirklich den Benutzer löschen?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
              Nein
            </Button>
            <Button onClick={confirmDeleteUser} color="error">
              Ja
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </StyledPaper>
  );
};

export default UserControl;
