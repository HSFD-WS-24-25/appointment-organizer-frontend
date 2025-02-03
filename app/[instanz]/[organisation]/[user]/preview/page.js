"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { useFetchEventById } from "@/app/hooks/useFetchEventById";
import { usePutEvent } from "@/app/hooks/usePutEvent";
import { useParams } from "next/navigation";
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "@/app/components/styledComponents/IconMarker.png";
import { useUserContext } from "@/app/context/UserContext";
import { generateBasePath } from "@/app/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation';
import QuillEditor from "@/app/components/styledComponents/QuillEditor";
import OpenStreetMap from "@/app/components/OpenStreetMap";


const Preview = ({ formData = {}, backgroundImage, inviteID}) => {
  console.log(formData);
    useEffect(() => {
      setTimeout(() => {
        const mapElements = document.querySelectorAll(".leaflet-container");
        mapElements.forEach((element) => {
          const mapInstance = element._leaflet_map;
          if (mapInstance) {
            mapInstance.invalidateSize(); // Aktualisiere die Größe der Karte
          }
        });
      }, 100); // Timeout, um sicherzustellen, dass DOM vollständig geladen ist
    }, []);

    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "#333",
          margin: "0",
          padding: "50px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "2.5em",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Einladung
            </h1>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "0.9em",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Teilnehmen
              </button>
              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "0.9em",
                  borderRadius: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Nicht Teilnehmen
              </button>
            </div>
          </div>

          {/* Titel */}
          <p
            style={{
              fontSize: "24px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontStyle: "normal",
              textDecoration: "underline",
              color: "#333",
            }}
          >
            {formData.title || formData.name || "Titel nicht angegeben"}
          </p>

          {/* Typ */}
          <p>
            <strong>Typ:</strong> {formData.eventType || "N/A"}
          </p>

          {/* Inhalt */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <strong>Start:</strong>{" "}
              <div
                style={{
                  display: "flex",
                  overflowY: "auto", // Scrollbar aktivieren, wenn der Inhalt zu groß ist
                  alignItems: "center",
                  maxHeight: "160px",
                  height: "50px",
                  backgroundColor: "#f9f9f9", // Hintergrundfarbe für bessere Lesbarkeit
                  border: "1px solid #ccc", // Rahmen zur besseren Sichtbarkeit
                  borderRadius: "4px", // Optional: Abgerundete Ecken für ein moderneres Design
                  fontSize: "18px", // Optional: Schriftgröße anpassen
                }}
              >
                <p>

                  {formData.startDate ? dayjs(formData.startDate).format("DD.MM.YYYY HH:mm") : dayjs(formData.date_start).format("DD.MM.YYYY HH:mm") || "N/A"}
                </p>
              </div>
              <strong>Adresse:</strong>
              <div
                style={{
                  display: "flex",
                  overflowY: "auto", // Scrollbar aktivieren, wenn der Inhalt zu groß ist
                  alignItems: "center",
                  maxHeight: "160px",
                  height: "50px",
                  backgroundColor: "#f9f9f9", // Hintergrundfarbe für bessere Lesbarkeit
                  border: "1px solid #ccc", // Rahmen zur besseren Sichtbarkeit
                  borderRadius: "4px", // Optional: Abgerundete Ecken für ein moderneres Design
                  fontSize: "18px", // Optional: Schriftgröße anpassen
                }}
              >
                <p>
                  {formData.address || formData.location|| "N/A"}
                </p>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                  overflow: "hidden",
                  fontSize: "16px", // Optional: Schriftgröße anpassen
                }}
              >
                {formData.coordinates || formData.address || formData.location ? (
                  <OpenStreetMap
                    address={formData.address || formData.location}
                    coordinates={formData.coordinates}
                    mapOptions={{
                      dragging: false, // Deaktiviert das Ziehen der Karte
                      scrollWheelZoom: false, // Deaktiviert das Zoomen mit dem Scrollrad
                      doubleClickZoom: false, // Deaktiviert das Doppelklick-Zoomen
                      keyboard: false, // Deaktiviert Tastaturinteraktion
                      zoomControl: false, // Entfernt die Zoom-Steuerung
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      backgroundColor: "#f9f9f9", // Hintergrundfarbe für bessere Lesbarkeit
                      border: "1px solid #ccc", // Rahmen zur besseren Sichtbarkeit
                      borderRadius: "4px", // Optional: Abgerundete Ecken für ein moderneres Design
                    }}
                  >
                    Keine Adresse eingegeben
                  </div>
                )}
              </div>

            </div>
            <div>
              <strong>Ende:</strong>{" "}
              <div
                style={{
                  display: "flex",
                  overflowY: "auto", // Scrollbar aktivieren, wenn der Inhalt zu groß ist
                  alignItems: "center",
                  maxHeight: "160px",
                  height: "50px",
                  backgroundColor: "#f9f9f9", // Hintergrundfarbe für bessere Lesbarkeit
                  border: "1px solid #ccc", // Rahmen zur besseren Sichtbarkeit
                  borderRadius: "4px", // Optional: Abgerundete Ecken für ein moderneres Design
                  fontSize: "18px", // Optional: Schriftgröße anpassen
                }}
              >
                <p>

                  {formData.endDate ? dayjs(formData.endDate).format("DD.MM.YYYY HH:mm") : dayjs(formData.date_end).format("DD.MM.YYYY HH:mm") || "N/A"}
                </p>
              </div>
              <div>

                <strong>Beschreibung:</strong>
                <div
style={{
  height: "300px",
  maxHeight: "300px", // Maximale Höhe der Vorschau
  maxWidth: "500px", // Maximale Breite festlegen
  overflowY: "auto", // Scrollbar nur für die Höhe aktivieren
  overflowX: "hidden", // Keine Scrollbar für die Breite
  border: "1px solid #ccc", // Rahmen zur besseren Sichtbarkeit
  padding: "10px", // Innenabstand für den Text
  backgroundColor: "#f9f9f9", // Hintergrundfarbe für bessere Lesbarkeit
  borderRadius: "4px", // Optional: Abgerundete Ecken für ein moderneres Design
  lineHeight: "1.5", // Optional: Zeilenhöhe für bessere Lesbarkeit
  margin: "0 auto", // Optional: Zentrierung des Elements horizontal
  wordWrap: "break-word", // Zeilenumbruch bei langen Wörtern
  overflowWrap: "break-word", // Zusätzliche Unterstützung für Zeilenumbruch
  whiteSpace: "normal", // Verhindert horizontales Scrollen durch Inhalte
}}

                  dangerouslySetInnerHTML={{
                    __html: formData.description || "Keine Beschreibung angegeben",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  module.exports = Preview;