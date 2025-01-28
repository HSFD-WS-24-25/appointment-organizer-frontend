"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Box, Stack, InputAdornment, Checkbox
} from '@mui/material';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, GreenButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter Icon importieren
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

{/* Beispieldaten */ }
const data = [
  { name: 'Max Mustermann', contact: 'max.mustermann@beispiel.de' },
  { name: 'Alice Müller', contact: 'alice.mueller@beispiel.de' },
  { name: 'Tom Gast', contact: 'tom.gast@beispiel.de' },
  { name: 'Julia Schmidt', contact: 'julia.schmidt@beispiel.de' },
  { name: 'Peter Neumann', contact: 'peter.neumann@beispiel.de' },
  { name: 'Franz Gast', contact: 'franz.gast@beispiel.de' },
];

export default function ParticipantsMessage() {
  const t = useTranslations('ParticipantsMessage');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const [selected, setSelected] = useState([]);

  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
    const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext
  
     // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
     useEffect(() => {
      if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
        const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
        setBasePath(path);
      }
    }, [userInfo]);
  
  {/* Handler für den "Nachricht schicken" Button */}
  const handleSendBackToEvent = () => {
    router.push(`${basePath}/preview`);
  };

  {/* Handler für den "Nachricht schicken" Button */}
  const handleSendMessage = () => {
    if (selected.length == 0) {
        alert(t('text_no_persons_were_selected'));
    } else {
      alert(t('text_message_sent_to_selected_persons'));
    }
  };

  {/* Handler für die Checkbox */}
  const handleCheckboxChange = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  {/* Handler für den "Alle auswählen/Alle abwählen" Button */}
  const handleSelectAll = () => {
    if (selected.length === filteredData.length) {
      setSelected([]); // Alles abwählen
    } else {
      setSelected(filteredData.map((_, index) => index)); // Alle auswählen
    }
  };

  {/* Funktion für den Suchfilter */}
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
        <DesignTitel> {t('title')} </DesignTitel>

        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <TextField
              variant="outlined"
              placeholder={t('search_placeholder')}
              size="small"
              sx={{
                width: { xs: '100%', sm: '100%' },
                marginRight: { sm: 2 },
                ackgroundColor: '#fff',
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

            {/* Button um alle Einträge auszuwählen oder abzuwählen */}
            {/* minWidth: "250px" wird benötigt, da sonst der Text im Button zu lang ist und es einen Zeilenumbruch gibt */}
            <BlueButton
              sx={{ minWidth: "250px" }}
              onClick={handleSelectAll}
            >
              {selected.length === filteredData.length ? t('text_deselect_all') : t('text_select_all')}
            </BlueButton>
          </Stack>
        </Box>

        {/* Tabelle */}
        <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto', borderRadius: 2, backgroundColor: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell>{t('table_column_first_name_and_surname')}</TableCell>
                <TableCell>{t('table_column_contact_details')}</TableCell>
                <TableCell>{t('table_column_recipient')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>
                    {/* padding: 0 wird benötigt, da sonst die Zeilen durch die Checkbox größer werden */}
                    <Checkbox sx={{ padding: 0 }}
                      checked={selected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Nachricht schreiben */}
        <Stack justifyContent="space-between" spacing={2} sx={{ textAlign: "left", fontSize: 30, mt: 3 }}>
        <h1>{t('text_write_a_message')}</h1>
          <TextField
            id="outlined-multiline-flexible"
            label={t('textfield_write_a_message')}
            multiline
            rows={5}
            fullWidth
          />
        </Stack>
       
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
          <RedButton onClick={handleSendBackToEvent}>
            {t('button_back_to_the_event')}
          </RedButton>
          <GreenButton onClick={handleSendMessage}>
            {t('button_send_message')}
          </GreenButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}