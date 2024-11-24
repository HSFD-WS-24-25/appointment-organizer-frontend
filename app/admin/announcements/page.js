"use client" //important or else search doesnt work
import Link from 'next/link'
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Box, Stack, Autocomplete
} from '@mui/material';
const data = [
  { title: 'Closed for Server Maintenance', method: 'On Login', startDate: '12.11.2024', endDate: '-', status: 'Active' },
  { title: 'Feature Update Deployment', method: 'E-Mail', startDate: '20.04.2024', endDate: '20.04.2024', status: 'Closed' },
  { title: 'Critical Bug Fix', method: 'On Login', startDate: '08.04.2024', endDate: '10.04.2024', status: 'Closed' },
  // add Data examples here
];
export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);
  // Funktion zur Filterung der Daten basierend auf dem Suchbegriff
  React.useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);
    
  return (
    <Box sx={{ p: 4 }}>
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
        <Button variant="contained" color="primary" href="/admin/announcements/create-announcements">Neue Ankündigung </Button>
        
      </Box>
    </Box>
  );
}