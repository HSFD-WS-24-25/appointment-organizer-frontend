import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography, Select } from "@mui/material";

const DynamicTextStyler = ({
  label,
  name,
  value,
  onChange,
  onStyleChange, // Hinzugefügt
  multiline = false,
  rows = 1,
  fullWidth = true,
  style = {},
  error,
  helperText,
}) => {
  const [dynamicStyles, setDynamicStyles] = useState({
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    color: "#333",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });

  const handleStyleChange = (key, value) => {
    const newStyles = {
      ...dynamicStyles,
      [key]: value,
    };
    setDynamicStyles(newStyles);

    // Überprüfen, ob onStyleChange als Prop übergeben wurde
    if (onStyleChange) {
      onStyleChange(newStyles);
    }
  };
  

  return (
    <Box>
      {/* Textfeld */}
      <Box sx={{ marginBottom: 2 }}>
      <TextField
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          fullWidth={fullWidth}
          error={error}
          helperText={helperText}
          placeholder={label} // Platzhalter anzeigen
          InputProps={{
            style: {
              color: dynamicStyles.color, // Textfarbe
              fontFamily: dynamicStyles.fontFamily, // Schriftart
              fontWeight: dynamicStyles.fontWeight, // Fett
              fontStyle: dynamicStyles.fontStyle, // Kursiv
              textDecoration: dynamicStyles.textDecoration, // Unterstrichen
              lineHeight: "1.5", // Feste Zeilenhöhe
            },
            inputProps: {
              style: {
                fontSize: dynamicStyles.fontSize, // Schriftgröße
              },
            },
          }}
          style={{
            backgroundColor: "white",
            height: multiline ? "150px" : "56px", // Fixe Höhe für Multiline und Single-Line
            boxSizing: "border-box", // Stabilisiert die Höhe
            overflow: "hidden", // Verhindert Größenänderung durch Inhalt
            ...style,
          }}
        />
      </Box>

      {/* Styling-Tools */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 2 }}>
        {/* Schriftarten */}
        <Select
          value={dynamicStyles.fontFamily}
          onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
        >
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="Georgia, serif">Georgia</MenuItem>
          <MenuItem value="'Courier New', monospace">Courier New</MenuItem>
          <MenuItem value="Tahoma, sans-serif">Tahoma</MenuItem>
        </Select>

        {/* Schriftgröße */}
        <TextField
          label="Schriftgröße (px)"
          type="number"
          value={parseInt(dynamicStyles.fontSize)}
          onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
          InputProps={{ inputProps: { min: 8, max: 50 } }}
        />

        {/* Textfarbe */}
        <input
          type="color"
          value={dynamicStyles.color}
          onChange={(e) => handleStyleChange("color", e.target.value)}
          style={{ width: "50px", height: "50px", border: "none" }}
        />

        {/* Fett */}
        <Button
          variant={dynamicStyles.fontWeight === "bold" ? "contained" : "outlined"}
          onClick={() =>
            handleStyleChange(
              "fontWeight",
              dynamicStyles.fontWeight === "bold" ? "normal" : "bold"
            )
          }
        >
          Fett
        </Button>

        {/* Kursiv */}
        <Button
          variant={dynamicStyles.fontStyle === "italic" ? "contained" : "outlined"}
          onClick={() =>
            handleStyleChange(
              "fontStyle",
              dynamicStyles.fontStyle === "italic" ? "normal" : "italic"
            )
          }
        >
          Kursiv
        </Button>

        {/* Unterstrichen */}
        <Button
          variant={
            dynamicStyles.textDecoration === "underline" ? "contained" : "outlined"
          }
          onClick={() =>
            handleStyleChange(
              "textDecoration",
              dynamicStyles.textDecoration === "underline" ? "none" : "underline"
            )
          }
        >
          Unterstrichen
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicTextStyler;
