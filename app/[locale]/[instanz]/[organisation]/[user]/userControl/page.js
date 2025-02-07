"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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
  useMediaQuery
} from "@mui/material";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/[locale]/lib/useFetchApiData";
import { usePutUser } from "@/app/hooks/usePutUser";
import { useDeleteUser } from "@/app/hooks/useDeleteUser"
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { BlueButton, StyledDeleteButton, StyledEditButton, GreenButton, OrangeButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";

const UserControl = () => {
  const t = useTranslations('UserControl');
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
  const isMobile = useMediaQuery("(max-width: 600px)"); // Prüft, ob das Gerät mobil ist

  if (isLoading) return <div>{t('text_loading')}</div>;
  if (authError) return <div>{t('text_error_loading_user_data')}{authError.message}</div>;
  if (!user) return <div>{t('text_please_log_in')}</div>;
  if (fetchError) return <div>{t('text_error_fetching_user_data')}{fetchError.message}</div>;

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
      case 1: return t('text_instance_admin');
      case 2: return t('text_organisation_admin');
      case 3: return t('text_organizer');
      case 4: return t('text_guest');
      default: return t('text_no_role');
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ padding: 4 }}>
        <DesignTitel variant="h4" gutterBottom>
          {t('title')}
        </DesignTitel>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              {!isMobile && <TableCell>{t('table_column_id')}</TableCell>}
                 {!isMobile &&  <TableCell>{t('table_column_username')}</TableCell>}
                 {!isMobile && <TableCell>{t('table_column_email')}</TableCell>}
                <TableCell>{t('table_column_first_name')}</TableCell>
                <TableCell>{t('table_column_surname')}</TableCell>
                {!isMobile && <TableCell>{t('table_column_phone_number')}</TableCell>}
                {!isMobile && <TableCell>{t('table_column_adress')}</TableCell>}
                {!isMobile && <TableCell>{t('table_column_role')}</TableCell> }
                <TableCell>{t('table_column_actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                 {!isMobile && <TableCell>{user.id}</TableCell> }
                 {!isMobile && <TableCell>{user.username}</TableCell> }
                 {!isMobile &&<TableCell>{user.email}</TableCell>}
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  {!isMobile && <TableCell>{user.telephone}</TableCell>}
                  {!isMobile && <TableCell>{user.address}</TableCell> }
                  {!isMobile &&<TableCell>{getRoleName(user.role_id)}</TableCell>}
                  <TableCell>
                    <Grid>
                    <BlueButton
                      onClick={() => handleEditUser(user)}
                    >
                      {t('table_column_button_edit')}
                    </BlueButton>
                    <RedButton
                      onClick={() => handleDeleteUser(user)}
                    >
                      {!isMobile ? t('table_column_button_delete') : t('table_column_button_phone_delete') }
                    </RedButton>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Dialog für Benutzer bearbeiten */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>{t('dialog_edit_user_title')}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_username')}
              value={selectedUser?.username || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_email')}
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_first_name')}
              value={selectedUser?.first_name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_surname')}
              value={selectedUser?.last_name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_adress')}
              value={selectedUser?.address || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('dialog_edit_user_textfield_phone_number')}
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
              helperText={error ? t('dialog_edit_user_phone_number_error') : ""}
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
            <RedButton onClick={() => setEditDialogOpen(false)}>
              {t('dialog_edit_user_button_cancel')}
            </RedButton>
            <GreenButton onClick={handleConfirmSave} color="primary">
              {t('dialog_edit_user_button_save')}
            </GreenButton>
          </DialogActions>
        </Dialog>
        {/* Bestätigungsdialog für Speichern */}
        <Dialog open={confirmSaveDialogOpen} onClose={() => setConfirmSaveDialogOpen(false)}>
          <DialogTitle>{t('dialog_save_user_title')}</DialogTitle>
          <DialogContent>
            <Typography>{t('dialog_save_user_description')}</Typography>
          </DialogContent>
          <DialogActions>
            <RedButton onClick={() => setConfirmSaveDialogOpen(false)} >
              {t('dialog_save_user_button_no')}
            </RedButton>
            <GreenButton onClick={handleSaveChanges}>
              {t('dialog_save_user_button_yes')}
            </GreenButton>
          </DialogActions>
        </Dialog>

        {/* Dialog für Benutzer löschen */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>{t('dialog_delete_user_title')}</DialogTitle>
          <DialogContent>
            <Typography>{t('dialog_delete_user_description')}</Typography>
          </DialogContent>
          <DialogActions>
            <RedButton onClick={() => setDeleteDialogOpen(false)} >
              {t('dialog_delete_user_button_no')}
            </RedButton>
            <BlueButton onClick={confirmDeleteUser} >
              {t('dialog_delete_user_button_yes')}
            </BlueButton>
          </DialogActions>
        </Dialog>

      </Box>
    </StyledPaper>
  );
};

export default UserControl;
