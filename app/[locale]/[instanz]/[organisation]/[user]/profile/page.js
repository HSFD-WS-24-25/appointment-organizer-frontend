"use client";

import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Avatar } from '@mui/material';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function UserProfile() {
  const t = useTranslations('Profile');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveClick = () => {
    setOpenSaveDialog(true);
  };

  const handleSaveConfirm = () => {
    setOpenSaveDialog(false);
    alert(t('alert_saved_changes'));
    // Hier kannst du die eigentliche Speichern-Funktion implementieren
  };

  const handleSaveCancel = () => {
    setOpenSaveDialog(false);
  };

  return (
    <StyledPaper >
      <Box >
        <DesignTitel>
          {t('title')}
        </DesignTitel>

        {/* Profile Image Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Avatar src={profileImage} sx={{ width: 120, height: 120, marginRight: { sm: 2, xs: 0 }, marginBottom: { xs: 2, sm: 0 } }} />
            <GreenButton component="label">
              {t('button_change_profile_picture')}
              <input type="file" hidden onChange={handleImageChange} />
            </GreenButton>
          </Box>

          {/* Personal Information Section */}
          <Box component="form" sx={{ display: 'grid', gap: 3, width: '100%' }}>
            <TextField label={t('textfield_name')} variant="outlined" fullWidth/>
            <TextField label={t('textfield_first_name')} variant="outlined" fullWidth  />
            <TextField label={t('textfield_personnel_number')} variant="outlined" fullWidth />
            <TextField label={t('textfield_email')} variant="outlined" fullWidth />
            <TextField label={t('textfield_phone_number')} variant="outlined" fullWidth />
          </Box>

          {/* Save Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              gap: 2,
              marginTop: 4,
              flexWrap: 'wrap'
            }}
          >
            <BlueButton onClick={handleSaveClick}>
              {t('button_save_changes')}
            </BlueButton>
          </Box>
        </Box>
      </Box>

      {/* Save Confirmation Dialog */}
      <Dialog open={openSaveDialog} onClose={handleSaveCancel}>
        <DialogTitle>{t('dialog_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('dialog_description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveCancel} color="primary">{t('dialog_button_no')}</Button>
          <Button onClick={handleSaveConfirm} color="primary" autoFocus>{t('dialog_button_yes')}</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
}

export default UserProfile;
