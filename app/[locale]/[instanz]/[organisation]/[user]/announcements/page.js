"use client"; // important or else search doesn't work

import React, { useState, useEffect } from 'react';
import { 
  Paper, TextField, Box, Stack, Autocomplete, 
} from '@mui/material';
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { BlueButton, RedButton } from "@/app/[locale]/components/styledComponents/StyledButton";
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import {StyledTableContainer, 
   StyledTable, 
   StyledTableRow,
   StyledTableHeadCell,
   StyledTableBody,
   StyledTableCell, 
   StyledTableHead } from "@/app/[locale]/components/styledComponents/StyledTable";
import { useUserContext } from "@/app/[locale]/context/UserContext"; // Benutzerkontext importieren
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const data = [
  { title: 'Closed for Server Maintenance', method: 'On Login', startDate: '12.11.2024', endDate: '-', status: 'Active' },
  { title: 'Feature Update Deployment', method: 'E-Mail', startDate: '20.04.2024', endDate: '20.04.2024', status: 'Closed' },
  { title: 'Critical Bug Fix', method: 'On Login', startDate: '08.04.2024', endDate: '10.04.2024', status: 'Closed' },
  // add more data examples here
];

//test
export default function AdminAnnouncements() {

  const t = useTranslations('Announcements');
  const [basePath, setBasePath] = useState(""); // Dynamischer Basislink
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext
  const router = useRouter();

   // Basislink dynamisch auf Basis von Benutzerinformationen erstellen
   useEffect(() => {
    if (userInfo && userInfo.instanz && userInfo.organisation && userInfo.username) {
      const path = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;
      setBasePath(path);
    }
  }, [userInfo]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const newAnnouncementClick = () => {
    router.push(`${basePath}/create-announcements`);
  };



  return (

    <StyledPaper>
      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column',color: 'black' }}>
        <DesignTitel > {t('title')} </DesignTitel>

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
                  label={t('searchbar_placeholder')}
                  variant="outlined"
                  fullWidth
                  sx={{borderRadius: 1, '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#aaa' }, '&:hover fieldset': { borderColor: '#888' } } }}
                />
              )}
            />
          </Stack>
        </Box>


        <StyledTableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto', borderRadius: 2, backgroundColor: '#fff' }}>
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
              <StyledTableHeadCell>{t('table_column_title')}</StyledTableHeadCell>
                <StyledTableHeadCell>{t('table_column_method')}</StyledTableHeadCell>
                <StyledTableHeadCell>{t('table_column_start_date')}</StyledTableHeadCell>
                <StyledTableHeadCell>{t('table_column_end_date')}</StyledTableHeadCell>
                <StyledTableHeadCell>{t('table_column_status')}</StyledTableHeadCell>
              </StyledTableRow>
            </StyledTableHead>
            <StyledTableBody>
              {filteredData.map((row, index) => (
                <StyledTableRow key={index} sx={{ backgroundColor: row.status === 'Closed' ? '#af2e12' : '#0b5210' }}>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>{row.method}</StyledTableCell>
                  <StyledTableCell>{row.startDate}</StyledTableCell>
                  <StyledTableCell>{row.endDate}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                </StyledTableRow>

              ))}
            </StyledTableBody>
          </StyledTable>
        </StyledTableContainer>

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
            {t('button_disable_announcements')}
          </RedButton>
          <BlueButton onClick={newAnnouncementClick}>
            {t('button_new_announcement')}
          </BlueButton>

        </Box>
      </Box>
    </StyledPaper>
  );
}
