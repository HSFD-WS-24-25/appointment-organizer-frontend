import {
  Box, Typography, TextField, FormControlLabel,
  Checkbox, Paper, Button

} from "@mui/material";
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const t = useTranslations('AnnouncementCreationForm');

function AnnouncementCreationFrom() {
  return(
      <Box
          component={Paper}
          elevation={4}
          sx={{
            maxWidth: 800,
            margin: "auto",
            marginTop: 6,
            padding: 2,
            border: 3,
            borderColor: "gray",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="black"
            gutterBottom
          >
            {t('text_create_announcement')}
          </Typography>

          <TextField
            label={t('textfield_announcement_title')}
            variant="outlined"
            size="small"
            fullWidth
          />

          <TextField
            label={t('textfield_announcement_description')}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={12}
            sx={{ marginTop: 4 }}
          />

          <Typography variant="h6" fontWeight="bold">
            {t('text_method')}
          </Typography>

          <FormControlLabel control={<Checkbox />} label={t('checkbox_option_when_registering')} />
          <FormControlLabel control={<Checkbox />} label={t('checkbox_option_email')} />

          {/* Buttons */}
          <Box display="flex" justifyContent="end" mt={2} gap={2}>
            <Button
              variant="contained"
              color="error"
              href="/admin/announcements"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {t('button_cancel')}
            </Button>
            <Button
              variant="contained"
              color="success"
              href="/admin/announcements"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {t('button_save')}
            </Button>
          </Box>
        </Box>

  );
}

export default AnnouncementCreationFrom;