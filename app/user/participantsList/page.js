"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Box, Stack, Typography, InputAdornment,
} from '@mui/material';
import StyledPaper from "../../components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "../../components/styledComponents/StyledButton";
import DesignTitel from "../../components/styledComponents/DesignTitel";
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter Icon importieren

{/* Beispieldaten */ }
const data = [
  { name: 'Max Mustermann', contact: 'max.mustermann@beispiel.de' },
  { name: 'Alice Müller', contact: 'alice.mueller@beispiel.de' },
  { name: 'Tom Gast', contact: 'tom.gast@beispiel.de' },
  { name: 'Julia Schmidt', contact: 'julia.schmidt@beispiel.de' },
  { name: 'Peter Neumann', contact: 'peter.neumann@beispiel.de' },
  { name: 'Franz Gast', contact: 'franz.gast@beispiel.de' },
];

export default function Participants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (

    <StyledPaper>
      {/* Seite */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', color: 'black' }}>
        <DesignTitel> Teilnehmerliste </DesignTitel>

        <Box sx={{ mb: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Suche"
            size="small"
            sx={{
              width: { xs: '100%', sm: '100%' },
              marginRight: { sm: 2 },
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: 1,
              '& .MuiInputLabel-root': { color: '#555' },
              '& .MuiOutlinedInput-root': {
                color: '#000',
                '& fieldset': { borderColor: '#aaa' },
                '&:hover fieldset': { borderColor: '#888' },
              },
            }}
            value={searchTerm}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchTerm(inputValue);
              // Optional: Filter logic, falls nötig, z.B.:
              // const filteredData = data.filter(item => item.name.includes(inputValue));
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FilterListIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Tabelle */}
        <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto', borderRadius: 2, backgroundColor: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell>Vor- und Nachname</TableCell>
                <TableCell>Kontaktdaten</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            gap: 2,
            flexWrap: 'wrap',
            paddingBottom: 4,
          }}
        >
          <RedButton href="/user/preview">
            Zurück zur Veranstaltung
          </RedButton>
          <BlueButton href="/user/participantsMessage">
            Nachricht schreiben
          </BlueButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}