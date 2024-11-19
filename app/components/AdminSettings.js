"use client";

import Sidebar from './Sidebar'
import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function AdminSettings() {
    const router = useRouter();

    {/* Buttons */ }
    const handleSaveChanges = (event) => {
        alert("Änderungen erfolgreich gespeichert.");
    }

    const handleGoBack = (event) => {
        router.push("/admin");
    }

    const handleResetSettings = (event) => {
        alert("Einstellungen erfolgreich zurückgesetzt.");
    }

    const [language, setLanguage] = React.useState('');

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };

    const [timezone, setTimezone] = React.useState('');

    const handleChangeTimezone = (event) => {
        setTimezone(event.target.value);
    };

    const [notifications, setNotifications] = React.useState('');

    const handleChangeNotifications = (event) => {
        setLanguage(event.target.value);
    };

    const [textSize, setTextSize] = React.useState('');

    const handleChangeTextSize = (event) => {
        setLanguage(event.target.value);
    };

    const [checked, setChecked] = React.useState(true);

    const handleChangeMode = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Box sx={{ flex: 1, display: 'flex', height: '100vh' }}>

            {/* Einstellungen */}
            <Box sx={{ flex: 1, justifyContent: "center", backgroundColor: '#f5f5f5' }}>

                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", padding: 3, fontSize: 30 }}>
                    <h1>Einstellungen</h1>
                </Box>
                {/* Sprache */}
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label">Sprache</InputLabel>
                            <Select
                                labelId="language-label"
                                id="language"
                                value={language}
                                label="Language"
                                onChange={handleChangeLanguage}
                            >
                                <MenuItem value="German">Deutsch</MenuItem>
                                <MenuItem value="English">Englisch</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {/* Zeitzone */}
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
                        <FormControl fullWidth>
                            <InputLabel id="timezone-label">Zeitzone</InputLabel>
                            <Select
                                labelId="timezone-label"
                                id="timezone"
                                value={timezone}
                                label="Timezone"
                                onChange={handleChangeTimezone}
                            >
                                <MenuItem value="CET">CET</MenuItem>
                                <MenuItem value="UTC">UTC</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {/* Benachrichtigungen */}
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
                        <FormControl fullWidth>
                            <InputLabel id="notifications-label">Benachrichtigungen</InputLabel>
                            <Select
                                labelId="notifications-label"
                                id="notifications"
                                value={notifications}
                                label="Notifications"
                                onChange={handleChangeNotifications}
                            >
                                <MenuItem value="German">Alle</MenuItem>
                                <MenuItem value="English">Stummschalten</MenuItem>
                                <MenuItem value="German">Benutzerdefiniert</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {/* Textgröße */}
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
                        <FormControl fullWidth>
                            <InputLabel id="textSize-label">Textgröße</InputLabel>
                            <Select
                                labelId="textSize-label"
                                id="textSize"
                                value={textSize}
                                label="textSize"
                                onChange={handleChangeTextSize}
                            >
                                <MenuItem value="German">Klein</MenuItem>
                                <MenuItem value="English">Mittel</MenuItem>
                                <MenuItem value="German">Groß</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {/* Nachtmodus */}
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, flex: 1, display: "flex", justifyContent: "center" }}>
                        <FormGroup>
                            <FormControlLabel onClick={handleChangeMode} control={<Switch />} label="Nachtmodus" />
                        </FormGroup>
                    </Box>
                </div>

                {/* Buttons */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", padding: 3 }}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleGoBack} variant="contained" color="error">
                            Zurück
                        </Button>
                        <Button onClick={handleResetSettings} variant="contained">
                            Einstellungen zurücksetzen
                        </Button>
                        <Button onClick={handleSaveChanges} variant="contained" color="success">
                            Änderungen speichern
                        </Button>
                    </Stack>
                </Box>

            </Box>

        </Box>
    );
}

export default AdminSettings;