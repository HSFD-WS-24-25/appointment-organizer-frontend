"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Beispiel-Daten, später dann mit echten Nutzern über Backend
const users = [
  {
    name: "Max Mustermann",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    lastActive: "15.11.2023",
  },
  {
    name: "Willy Lost",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    lastActive: "15.4.2023",
  },
  {
    name: "Franz Beck",
    contact: "info@info.de",
    assignment: "Max Mustermann",
    lastActive: "13.9.2018",
  },
  {
    name: "Bratdie Wurst",
    contact: "info@info.de",
    assignment: "Bratdie Wurst",
    lastActive: "5.12.2022",
  },
  {
    name: "Tom Wurst",
    contact: "info@info.de",
    assignment: "Bratdie Wurst",
    lastActive: "18.3.2017",
  },
];

export default function UserTable() {
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
                backgroundColor: "#d4edda",
              }}
            >
              <Typography variant="body1">
                <strong>Benutzer:</strong> {user.name}
              </Typography>
              <Typography variant="body1">
                <strong>Kontaktdaten:</strong> {user.contact}
              </Typography>
              <Typography variant="body1">
                <strong>Veranstalter:</strong> {user.assignment}
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
                <TableCell>Kontaktdaten</TableCell>
                <TableCell>Veranstalter</TableCell>
                <TableCell>Zuletzt aktiv</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index} sx={{ backgroundColor: "#d1edda" }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.assignment}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}