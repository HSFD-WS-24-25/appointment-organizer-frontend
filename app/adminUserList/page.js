"use client"

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

//Beispieldaten, Später dann mit echten Nutzern über Backend
const users = [
  {
    name: "Max Mustermann",
    role: "Veranstalter",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    accessFull: true,
    accessRestricted: false,
    lastActive: "15.11.2023",
  },
  {
    name: "Willy Lost",
    role: "Teilnehmer",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    accessFull: false,
    accessRestricted: true,
    lastActive: "15.4.2023",
  },
  {
    name: "Franz Beck",
    role: "Teilnehmer",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    accessFull: false,
    accessRestricted: true,
    lastActive: "13.9.2018",
  },
  {
    name: "Bratdie Wurst",
    role: "Veranstalter",
    contact: "info@info.de",
    assignment: "Bratdie Wurst",
    accessFull: true,
    accessRestricted: false,
    lastActive: "5.12.2022",
  },
  {
    name: "Tom Wurst",
    role: "Teilnehmer",
    contact: "info@info.de",
    assignment: "Bratdie Wurst",
    accessFull: false,
    accessRestricted: true,
    lastActive: "18.3.2017",
  },
];

export default function ResponsiveUserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.contact.toLowerCase().includes(searchTerm) ||
      user.assignment.toLowerCase().includes(searchTerm)
  );

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Suchfeld */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      {/* Tabelle oder Kartenansicht */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "800px",
          overflowX: isMobile ? "auto" : "hidden",
        }}
      >
        {isMobile ? (
          filteredUsers.map((user, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: user.accessRestricted ? "#f8d7da" : "#d4edda",
              }}
            >
              <Typography variant="body1">
                <strong>Benutzer:</strong> {user.name}
              </Typography>
              <Typography variant="body1">
                <strong>Rolle:</strong> {user.role}
              </Typography>
              <Typography variant="body1">
                <strong>Kontaktdaten:</strong> {user.contact}
              </Typography>
              <Typography variant="body1">
                <strong>Veranstalter:</strong> {user.assignment}
              </Typography>
              <Typography variant="body1">
                <strong>Berechtigung:</strong> Vollzugriff{" "}
                {user.accessFull ? "[x]" : "[ ]"} Beschränkt{" "}
                {user.accessRestricted ? "[x]" : "[ ]"}
              </Typography>
              <Typography variant="body1">
                <strong>Zuletzt aktiv:</strong> {user.lastActive}
              </Typography>
            </Box>
          ))
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Benutzer</TableCell>
                <TableCell>Rolle</TableCell>
                <TableCell>Kontaktdaten</TableCell>
                <TableCell>Veranstalter</TableCell>
                <TableCell>Berechtigung</TableCell>
                <TableCell>Zuletzt aktiv</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: user.accessRestricted
                      ? "#f8d7da"
                      : "#d4edda",
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.assignment}</TableCell>
                  <TableCell>
                    Vollzugriff {user.accessFull ? "[x]" : "[ ]"} Beschränkt{" "}
                    {user.accessRestricted ? "[x]" : "[ ]"}
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Neu Konto Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          maxWidth: "800px",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            maxWidth: isMobile ? "150px" : "200px",
          }}
        >
          Neues Konto Erstellen
        </Button>
      </Box>
    </Box>
  );
}

