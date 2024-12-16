"use client";

import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TextField, Menu, MenuItem, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useDarkMode } from "@/app/[locale]/components/styledComponents/DarkMode"; // Importiere den DarkMode-Status

const initialEmails = [
  { subject: 'System Update Notification', sender: 'admin@system.com', date: '2024-11-01', status: 'Unread', body: 'System update scheduled for 2024-11-02.' },
  { subject: 'Meeting Reminder', sender: 'manager@company.com', date: '2024-10-30', status: 'Read', body: 'Reminder: Project meeting tomorrow at 10:00 AM.' },
  { subject: 'Feedback Request', sender: 'hr@company.com', date: '2024-10-28', status: 'Unread', body: 'Please complete the feedback survey by the end of this week.' },
  { subject: 'Weekly Newsletter', sender: 'newsletter@updates.com', date: '2024-10-25', status: 'Read', body: 'This week’s newsletter includes updates on recent company events.' },
  { subject: 'Sent Email Example', sender: 'admin@system.com', date: '2024-11-05', status: 'Sent', body: 'This is a sent email example.' },
  { subject: 'Deleted Email Example', sender: 'trash@system.com', date: '2024-11-06', status: 'Trash', body: 'This is a deleted email example.' }
];

const folders = ['Inbox', 'Unread', 'Sent', 'Trash'];

export default function NotificationAdmin() {
  const { isDarkMode } = useDarkMode(); // Zugriff auf den DarkMode-Status
  const [emails, setEmails] = useState(initialEmails);
  const [filteredEmails, setFilteredEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [newEmail, setNewEmail] = useState({ subject: '', recipient: '', body: '' });

  const filterEmails = (folder) => {
    setActiveFolder(folder);
    if (folder === 'Inbox') {
      setFilteredEmails(emails);
    } else {
      setFilteredEmails(emails.filter((email) => email.status === folder));
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleComposeClick = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleReplyClick = () => {
    setReplyOpen(true);
    setNewEmail({
      subject: `Re: ${selectedEmail.subject}`,
      recipient: selectedEmail.sender,
      body: '',
    });
  };

  const handleReplyClose = () => {
    setReplyOpen(false);
  };

  const handleSendEmail = () => {
    setEmails([...emails, { subject: newEmail.subject, sender: 'admin@system.com', date: new Date().toLocaleDateString(), status: 'Sent', body: newEmail.body }]);
    setNewEmail({ subject: '', recipient: '', body: '' });
    setComposeOpen(false);
    setReplyOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Dynamische Farben basierend auf dem DarkMode-Status
  const tableHeaderBgColor = isDarkMode ? '#333' : '#444';
  const tableHeaderTextColor = isDarkMode ? '#ccc' : '#fff';
  const tableRowUnreadBgColor = isDarkMode ? '#2d3748' : '#d1ecf1';
  const tableRowReadBgColor = isDarkMode ? '#1a202c' : '#f8f9fa';
  const paperBgColor = isDarkMode ? '#1e293b' : '#fff';
  const paperTextColor = isDarkMode ? '#f1f5f9' : '#000';

  return (
    <StyledPaper>
      <Box sx={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <DesignTitel>Benachrichtigungen</DesignTitel>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <BlueButton onClick={handleComposeClick}>
            Neue E-Mail verfassen
          </BlueButton>

          <IconButton onClick={handleMenuClick}>
            <AddIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {folders.map((folder, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  filterEmails(folder);
                  handleMenuClose();
                }}
              >
                {folder}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: paperBgColor }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: tableHeaderBgColor }}>
                <TableCell sx={{ color: tableHeaderTextColor }}>Betreff</TableCell>
                <TableCell sx={{ color: tableHeaderTextColor }}>Absender</TableCell>
                <TableCell sx={{ color: tableHeaderTextColor }}>Datum</TableCell>
                <TableCell sx={{ color: tableHeaderTextColor }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmails.map((email, index) => (
                <TableRow
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: email.status === 'Unread' ? tableRowUnreadBgColor : tableRowReadBgColor,
                  }}
                  onClick={() => handleEmailClick(email)}
                >
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>{email.sender}</TableCell>
                  <TableCell>{email.date}</TableCell>
                  <TableCell>{email.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedEmail && (
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2, backgroundColor: paperBgColor, color: paperTextColor, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              {selectedEmail.subject}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Von:</strong> {selectedEmail.sender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Datum:</strong> {selectedEmail.date}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {selectedEmail.body}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 3 }}>
              <BlueButton onClick={handleReplyClick}>
                Antworten
              </BlueButton>
              <RedButton>
                Löschen
              </RedButton>
            </Box>
          </Paper>
        )}

        {(composeOpen || replyOpen) && (
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2, backgroundColor: paperBgColor, color: paperTextColor, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>{replyOpen ? 'Antworten' : 'Neue E-Mail'}</Typography>
            <TextField
              fullWidth
              label="Empfänger"
              variant="outlined"
              value={newEmail.recipient}
              onChange={(e) => setNewEmail({ ...newEmail, recipient: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Betreff"
              variant="outlined"
              value={newEmail.subject}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Nachricht"
              variant="outlined"
              value={newEmail.body}
              onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <RedButton onClick={replyOpen ? handleReplyClose : handleComposeClose}>
                Abbrechen
              </RedButton>
              <BlueButton onClick={handleSendEmail}>
                Senden
              </BlueButton>
            </Box>
          </Paper>
        )}
      </Box>
    </StyledPaper>
  );
}
