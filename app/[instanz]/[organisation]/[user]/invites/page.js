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
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "@/app/components/styledComponents/StyledButton";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useRouter, usePathname } from 'next/navigation';
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext importieren

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [filterPreviousInvite, setFilterPreviousInvite] = useState(false);
  const [guests, setGuests] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // useState für gefilterte Daten
  const [selectedEmails, setSelectedEmails] = useState([]); // useState für ausgewählte E-Mails

  const router = useRouter();
  const pathname = usePathname();
  const eventID = pathname.split('/').pop();
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenResponse = await fetch('/api/token');
        const { accessToken } = await tokenResponse.json();
        console.log('Token:', accessToken);
        const response = await fetch(`${BackendUrl}/api/users`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const guestData = await response.json();
        setGuests(guestData);
        setFilteredData(guestData); 

      } catch (error) {
        console.error('Error fetching guest data:', error);
        setGuests([]);
        setFilteredData([]);
      }
    };

    fetchUserData();
  }, [BackendUrl]);


  const sendInvitationList = async () => {
    try {
      const invitedEmails = selectedEmails;
      const tokenResponse = await fetch('/api/token');
      const { accessToken } = await tokenResponse.json();
      const response = await fetch(`${BackendUrl}/api/participants/${eventID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ invitedEmails }), // Sende die eingeladenen E-Mails
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

    } catch (error) {
      console.error('Error sending invitation list:', error); 
    }
  };

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

  // Handle Checkbox Change
  const handleCheckboxChange = (email) => {
    setSelectedEmails(prevSelectedEmails => {
      if (prevSelectedEmails.includes(email)) {
        return prevSelectedEmails.filter(selectedEmail => selectedEmail !== email);
      } else {
        return [...prevSelectedEmails, email];
      }
    });
  };

  return (
    <StyledPaper>
      {/* Main Content */}
      <Box>
        <DesignTitel variant="h4" gutterBottom>
          Einladungsliste
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
            placeholder="Search"
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
            label="Nur Gäste mit vorheriger Einladung anzeigen"
          />
        </Box>

        {/* Table for guests */}
        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
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
                  Einladen
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold' }}>
                  Vorherige Einladung
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
                    <Checkbox
                      checked={selectedEmails.includes(guest.email)}
                      onChange={() => handleCheckboxChange(guest.email)}
                    />
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
            Abbrechen
          </RedButton>
          <BlueButton onClick={sendInvitationList}>
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










