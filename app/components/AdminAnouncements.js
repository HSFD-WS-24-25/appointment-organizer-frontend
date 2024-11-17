"use client"; // important or else search doesn't work

import Sidebar from './Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Box, Stack, Autocomplete, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, List, ListItemButton, 
  ListItemIcon, ListItemText, Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReportProblem from '@mui/icons-material/ReportProblem';

const data = [
  { title: 'Closed for Server Maintenance', method: 'On Login', startDate: '12.11.2024', endDate: '-', status: 'Active' },
  { title: 'Feature Update Deployment', method: 'E-Mail', startDate: '20.04.2024', endDate: '20.04.2024', status: 'Closed' },
  { title: 'Critical Bug Fix', method: 'On Login', startDate: '08.04.2024', endDate: '10.04.2024', status: 'Closed' },
  // add more data examples here
];

//test
export default function AdminAnnouncements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />


      {/* Main Content */}
      <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Ankündigungen
        </Typography>

        {/* Search and Table */}
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            <Autocomplete
              id="search-input"
              freeSolo
              options={data.map((option) => option.title)}
              onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search" variant="outlined" fullWidth />
              )}
            />
          </Stack>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>Methode</TableCell>
                <TableCell>Start Datum</TableCell>
                <TableCell>End Datum</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index} sx={{ backgroundColor: row.status === 'Closed' ? '#f8d7da' : '#d4edda' }}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="error">Ankündigung Deaktivieren</Button>
          <Button variant="contained" color="primary" href="/admin-create-announcements">Neue Ankündigung</Button>
        </Box>
      </Box>
    </Box>
  );
}
