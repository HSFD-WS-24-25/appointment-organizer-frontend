"use client";

import React, { useRef, useEffect } from "react";
import "dayjs/locale/de";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "@/app/components/styledComponents/IconMarker.png";

export function OpenStreetMap({ address, coordinates }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Initialisiere die Karte nur einmal
    if (!mapInstance.current) {
      const map = L.map(mapRef.current, {
        center: coordinates || [51.505, -0.09], // Standardkoordinaten
        zoom: 18, // Erhöhter Zoom-Level
        dragging: false, // Ziehen deaktivieren
        scrollWheelZoom: false, // Zoomen mit Scrollrad deaktivieren
        doubleClickZoom: false, // Doppelklick-Zoomen deaktivieren
        keyboard: false, // Tastatursteuerung deaktivieren
        zoomControl: false, // Zoom-Steuerung ausblenden
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 22,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (coordinates) {
        const marker = L.marker(coordinates, {
          icon: L.icon({
            iconUrl: customMarkerIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }).addTo(map);
        marker.bindPopup(address).openPopup();
      }

      mapInstance.current = map;
    }
  }, [coordinates, address]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default OpenStreetMap;