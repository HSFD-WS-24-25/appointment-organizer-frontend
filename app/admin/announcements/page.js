"use client"; // important or else search doesn't work

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Box, Stack, Autocomplete, Typography
} from '@mui/material';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";

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

    <StyledPaper>
      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column',color: 'black' }}>
        <DesignTitel > Ankündigungen </DesignTitel>

        {/* Search and Table */}
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2} sx={{ maxWidth: { xs: '100%', sm: '50%' }, margin: 'auto' }}>
            <Autocomplete
              id="search-input"
              freeSolo
              options={data.map((option) => option.title)}
              onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Suche"
                  variant="outlined"
                  fullWidth
                  sx={{borderRadius: 1, '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#aaa' }, '&:hover fieldset': { borderColor: '#888' } } }}
                />
              )}
            />
          </Stack>
        </Box>

        <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto', borderRadius: 2, backgroundColor: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#444' }}>
                <TableCell>Titel</TableCell>
                <TableCell>Methode</TableCell>
                <TableCell>Start Datum</TableCell>
                <TableCell>End Datum</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index} sx={{ backgroundColor: row.status === 'Closed' ? '#af2e12' : '#0b5210' }}>
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

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            gap: 2,
            flexWrap: 'wrap',
            paddingBottom: 4,
          }}
        >
          <RedButton>
            Ankündigung Deaktivieren
          </RedButton>
          <BlueButton href="/admin/create-announcements">
            Neue Ankündigung
          </BlueButton>

        </Box>
      </Box>
    </StyledPaper>
  );
}
