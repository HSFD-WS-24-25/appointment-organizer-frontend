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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import  StyledPaper  from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useRouter } from '@/i18n/routing';
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import { useTranslations } from 'next-intl';

function UserDashboard() {
  const t = useTranslations('Invites');
  const [searchText, setSearchText] = useState('');
  const [filterPreviousInvite, setFilterPreviousInvite] = useState(false);
  const [guests] = useState([
    { name: "Max Mustermann", email: "max.mustermann@beispiel.de", invited: true, known: true },
    { name: "Alice Müller", email: "alice.mueller@example.com", invited: false, known: true },
    { name: "Tom Gast", email: "tom.gast@fakedomain.com", invited: false, known: false },
    { name: "Julia Schmidt", email: "julia.schmidt@website.net", invited: true, known: true },
    { name: "Peter Neumann", email: "peter.neumann@anotherdomain.org", invited: true, known: false },
    { name: "Franz Gast", email: "franz.gast@someplace.co", invited: false, known: false },
    { name: "Mia Schulze", email: "mia.schulze@randommail.com", invited: false, known: true },
    { name: "Lena Becker", email: "lena.becker@samplemail.de", invited: false, known: false },
  ]);
  const [filteredData, setFilteredData] = useState(guests); // useState für gefilterte Daten

  const router = useRouter();
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext
  
  useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);

  // Handle search filter action
  const handleSearch = () => {
    const lowercasedSearchText = searchText.toLowerCase();
    let filtered = guests.filter(guest => {
      const nameMatches = guest.name.toLowerCase().includes(lowercasedSearchText);
      const emailMatches = guest.email.toLowerCase().includes(lowercasedSearchText); // Suche auch in der E-Mail-Adresse
      return nameMatches || emailMatches; // Beide Felder prüfen
    });

    if (filterPreviousInvite) {
      filtered = filtered.filter(guest => guest.invited); // Nur Gäste, die bereits eingeladen sind
    }

    setFilteredData(filtered); // Setze gefilterte Daten
  };

  // Handle Filter Checkbox Change
  const handleFilterChange = () => {
    setFilterPreviousInvite(!filterPreviousInvite); // Toggle den Filter
  };

  useEffect(() => {
    handleSearch(); // Führe den Suchfilter erneut aus, wenn der Suchtext oder der Filter geändert wird
  }, [searchText, filterPreviousInvite]);

  const handleBackToEventClick = () => {
    router.push(`${basePath}/createEvent`);
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>
        <DesignTitel variant="h4" gutterBottom>
          {t('title')}
        </DesignTitel>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 3,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <TextField
            variant="outlined"
            placeholder={t('searchbar_placeholder')}
            size="small"
            sx={{ width: { xs: '100%', sm: '80%' }, marginRight: { sm: 2 } }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Setze den Suchtext
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

        {/* Filter for Previous Invitation */}
        <Box sx={{ marginBottom: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterPreviousInvite}
                onChange={handleFilterChange} // Filter anwenden
                name="previousInvite"
                color="primary"
              />
            }
            label={t('checkbox_text_show_guests_with_prior_invitation')}
          />
        </Box>

        {/* Table for guests */}
        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  {t('table_column_guest_information')}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  {t('table_column_email')}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  {t('table_column_invite')}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                {t('table_column_prevoius_invitation')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((guest, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {guest.name}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {guest.email}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    <input type="checkbox" checked={guest.invited} readOnly />
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
            {t('button_cancel')}
          </RedButton>
          <BlueButton>
          {t('button_send_invitation')}
          </BlueButton>
          <GreenButton onClick={handleBackToEventClick}>
            {t('button_back_to_event_creation')}
          </GreenButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}

export default UserDashboard;










