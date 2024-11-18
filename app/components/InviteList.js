"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import SidebarUser from './SidebarUser';
import FilterListIcon from '@mui/icons-material/FilterList'; // Import the filter icon

function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(["Max Mustermann", "Alice Müller", "Tom Gast", "Julia Schmidt", "Peter Neumann", "Franz Gast"]);
  
  // Handle search filter action
  const handleSearch = () => {
    // Filtering based on the search text and matching guests' names
    if (searchText) {
      setFilteredGuests(filteredGuests.filter(name => name.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      setFilteredGuests(["Max Mustermann", "Alice Müller", "Tom Gast", "Julia Schmidt", "Peter Neumann", "Franz Gast"]); // Reset when search is empty
    }
  };

  // Function to highlight the search text within the names
  const highlightText = (text) => {
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack sidebar on small screens
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SidebarUser />
      </Box>
      
      {/* Mobile Sidebar */}
      <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }} >
        <SidebarUser />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: { xs: 2, sm: 3 },
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Einladungsliste
        </Typography>

        {/* Section for guests who have participated before */}
        <Typography variant="h6" gutterBottom>
          Gäste die schon an anderen Veranstaltungen teilgenommen haben:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 3,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Search Bar with Filter Icon on the Right */}
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ width: { xs: '100%', sm: '80%' }, marginRight: { sm: 2 } }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FilterListIcon 
                    onClick={handleSearch}
                    sx={{ cursor: 'pointer' }} 
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{ width: { xs: '100%', sm: '80%' }, marginBottom: 4 }}
        >
          <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Gast-Informationen
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Teilgenommen
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGuests.map((name, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {/* Highlight matching text */}
                    {highlightText(name)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {name.toLowerCase().replace(" ", ".")}@beispiel.de
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    <input type="checkbox" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Section for new guest email input */}
        <Typography variant="h6" gutterBottom>
          Für Neue Gäste tragen Sie bitte die Emails ein:
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: { xs: '100%', sm: '80%' }, marginBottom: 3 }}
        >
          <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Gast-Informationen
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {["Julia Schmidt", "Peter Neumann", "Franz Gast"].map((name, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {name.toLowerCase().replace(" ", ".")}@beispiel.de
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
           <Button
              variant="contained"
              sx={{
              backgroundColor: 'red',
              color: '#fff',
              '&:hover': { backgroundColor: 'darkred' },
              width: { xs: '100%', sm: 'auto' },
             }}
           >
             Abbrechen
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#20488c',
              color: '#fff',
              '&:hover': { backgroundColor: 'darkblue' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Einladung Schicken
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'green',
              color: '#fff',
              '&:hover': { backgroundColor: 'darkgreen' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Zurück zu Veranstaltungs
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard;
