"use client";
import { createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

// Themes für Light- und Darkmode
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#ffffff",
      default: "#f4f4f4",
    },
    text: {
      primary: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#121212",
      default: "#181818",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// Custom Hook für Theme-Management
export function useThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialer Zustand aus localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false; // Standardwert (Lightmode)
  });

  useEffect(() => {
    // Speichere den aktuellen Zustand in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  // Umschalten des Themes
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return {
    theme: isDarkMode ? darkTheme : lightTheme,
    isDarkMode,
    toggleTheme,
  };
}
