"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
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
import FilterListIcon from '@mui/icons-material/FilterList'; // Import the filter icon
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import {BlueButton,GreenButton ,RedButton} from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useRouter } from 'next/navigation';
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren

function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(["Max Mustermann", "Alice Müller", "Tom Gast", "Julia Schmidt", "Peter Neumann", "Franz Gast"]);
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

  const handleBackToEventClick = () => {
    router.push(`${basePath}/createEvent`);
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>
        <DesignTitel variant="h4" gutterBottom>
          Einladungsliste
        </DesignTitel>

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
          sx={{marginBottom: 3}}
        >
          <Table>
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
          sx={{ marginBottom: 3 }}
        >
          <Table>
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
           <RedButton>
             Abbrechen
          </RedButton>
          <BlueButton>
            Einladung Schicken
          </BlueButton>
          <GreenButton onClick={handleBackToEventClick}>
            Zurück zu Veranstaltungs
          </GreenButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}

export default UserDashboard;
