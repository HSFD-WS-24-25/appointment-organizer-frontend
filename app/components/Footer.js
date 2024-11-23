import React from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 10,
        right: 10,
        backgroundColor: "#333", 
        color: "#ccc", 
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        textAlign: "center",
      }}
    >
      {/* TODO: Links to  Info-Page*/}

      <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
        <Link href="#about" underline="hover" color="inherit" sx={{ marginRight: "1rem" }}>
          Über uns
        </Link>
        <Link href="#privacy" underline="hover" color="inherit" sx={{ marginRight: "1rem" }}>
          Datenschutz
        </Link>
        <Link href="#contact" underline="hover" color="inherit" sx={{ marginRight: "1rem" }}>
          Kontakt
        </Link>
        <Link href="#imprint" underline="hover" color="inherit">
          Impressum
        </Link>
      </Typography>

      {/* Copyright */}
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} Appointment Organizer
      </Typography>
    </Box>
  );
}