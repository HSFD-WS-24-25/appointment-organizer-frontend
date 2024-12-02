import React from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        width: "100%", 
        backgroundColor: "#333",
        color: "#ccc",
        padding: "1rem 0",
        textAlign: "center",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        fontSize: "1rem", 
        "@media (max-width: 768px)": {
          fontSize: "0.8rem", 
        },
      }}
    >
      <Box>
        {/* TODO: Link to Info-Page */}
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
    </Box>
  );
}