"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Checkbox, FormControlLabel, InputAdornment, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';
import StyledPaper from "../../../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../../../../components/styledComponents/StyledButton";
import DesignTitel from "../../../../components/styledComponents/DesignTitel";
import { useUserContext } from "../../../../context/UserContext"; // Benutzerkontext importieren

function UserDashboard() {
  const [checkedOnline, setCheckedOnline] = useState(false);
  const [checkedInPerson, setCheckedInPerson] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog
  const [preview, setPreview] = useState(false);
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const router = useRouter();
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink 
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext

  // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
  useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);
}