"use client";
import Papa from 'papaparse';
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
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import { useRouter } from '@/i18n/routing';
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import { useTranslations } from 'next-intl';

function UserDashboard() {
  const t = useTranslations('Invites');
  const [searchText, setSearchText] = useState('');
  const [filterPreviousInvite, setFilterPreviousInvite] = useState(false);
  const [guests, setGuests] = useState([
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
  const [newGuest, setNewGuest] = useState({ name: '', email: '', invited: false, known: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFields, setShowFields] = useState(false);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true,
        complete: (results) => {
          const newGuests = results.data.map((row) => ({
            name: row.name,
            email: row.email,
            invited: row.invited === 'true',
            known: row.known === 'true',
          }));
          setGuests((prevGuests) => [...prevGuests, ...newGuests]);
          setFilteredData((prevGuests) => [...prevGuests, ...newGuests]); // Update filtered data as well
        },
      });
    }
  };
  const handleAddGuestClick = () => {
    setShowFields(true); // Show input fields
  };
  const handleAddGuest = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
  
    // Validate input fields
    if (!newGuest.name || !newGuest.email) {
      return; // Do nothing if fields are empty
    }
  
    // Add the new guest to the list
    setGuests((prevGuests) => [...prevGuests, newGuest]);
    setFilteredData((prevGuests) => [...prevGuests, newGuest]);
  
    // Reset input fields and hide the form
    setNewGuest({ name: '', email: '', invited: false, known: false });
    setShowFields(false);
  };
  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>
        <DesignTitel variant="h4" gutterBottom>
          {t('title')}
        </DesignTitel>

        {/* Existing Search Bar, Filter, and Table */}
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

        {/* CSV Import */}
        <Box sx={{ marginBottom: 3, display: 'flex', alignItems: 'right' }}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <BlueButton
            onClick={handleFileUpload}
            sx={{ marginLeft: 'auto', padding: '4px 8px', fontSize: '0.875rem' }} // Adjust padding and font size for a smaller button
          >
            {t('button_csv_import')}
          </BlueButton>
        </Box>

        {/* Add New Guest Section */}
      {showFields ? (
        <Box
          component="form"
          onSubmit={handleAddGuest}
          sx={{ marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 2 }}>
            <TextField
              label={t('textfield_name')}
              value={newGuest.name}
              onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
              required
            />
            <TextField
              label={t('textfield_email')}
              value={newGuest.email}
              onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <GreenButton type="submit" variant="contained">
              {t('button_add_guest')}
            </GreenButton>
            <RedButton onClick={() => setShowFields(false)}>{t('button_cancel')}</RedButton>
          </Box>
        </Box>
      ) : (
        <BlueButton onClick={handleAddGuestClick} sx={{ marginBottom: 3 }}>
          {t('button_add_new_guests')}
        </BlueButton>
      )}
        
      {/* Guest Table */}
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
                <TableCell sx={{ border: '1px solid #ddd' }}>{guest.name}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{guest.email}</TableCell>
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

