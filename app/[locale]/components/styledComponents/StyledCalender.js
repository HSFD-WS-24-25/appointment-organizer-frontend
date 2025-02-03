"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StyledPaper from "./StyledPaper";
import { RedButton, BlueButton, GreenButton } from "./StyledButton";
import DesignTitel from "./DesignTitel";
import jsPDF from "jspdf"; // Für PDF-Generierung
import { saveAs } from "file-saver"; // Für .ics-Datei
import exp from "constants";
import { useTranslations } from 'next-intl';

moment.locale("de"); // Setze die Lokalisierung auf Deutsch

export const CustomToolbar = (props) => {
  const t = useTranslations('StyledCalender');
  
    const goToBack = () => {
      props.onNavigate("PREV");
    };
  
  
    const goToNext = () => {
      props.onNavigate("NEXT");
    };
  
    const goToToday = () => {
      props.onNavigate("TODAY");
    };
  
    const handleViewChange = (view) => {
      props.onView(view);
    };
  
    const label = props.label;
  
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div>
          {/* Buttons in der Reihenfolge Zurück, Heute, Weiter */}
          <button
            onClick={goToBack}
            style={{
              marginRight: "10px",
              border: "1px solid black", // Umrandung
              padding: "5px 10px", // Innenabstand
              borderRadius: "4px", // Abgerundete Ecken
              cursor: "pointer", // Zeiger ändern
            }}
          >
            {t('button_back')}
          </button>
          <button
            onClick={goToToday}
            style={{
              marginRight: "10px",
              border: "1px solid black",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('button_today')}
          </button>
          <button
            onClick={goToNext}
            style={{
              border: "1px solid black",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('button_next')}
          </button>
        </div>
  
        <div>
          <span>{label}</span>
        </div>
  
        <div>
          {/* Ansichtswechsel-Buttons */}
          <button
            onClick={() => handleViewChange("month")}
            style={{
              marginRight: "10px",
              border: props.view === "month" ? "2px solid black" : "1px solid black",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('button_month')}
          </button>
          <button
            onClick={() => handleViewChange("week")}
            style={{
              marginRight: "10px",
              border: props.view === "week" ? "2px solid black" : "1px solid black",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('button_week')}
          </button>
          <button
            onClick={() => handleViewChange("day")}
            style={{
              border: props.view === "day" ? "2px solid black" : "1px solid black",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('button_day')}
          </button>
        </div>
      </div>
    );
  };

export const formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    agendaTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    dayHeaderFormat: "dddd, D. MMMM YYYY",
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format("D. MMMM YYYY")} – ${moment(end).format("D. MMMM YYYY")}`,
    monthHeaderFormat: "MMMM YYYY",
  };

export const germanMessages = {
    allDay: "Ganztägig",
    previous: "Zurück",
    next: "Weiter",
    today: "Heute",
    month: "Monat",
    week: "Woche",
    day: "Tag",
    agenda: "Agenda",
    date: "Datum",
    time: "Zeit",
    event: "Ereignis",
    noEventsInRange: "Keine Ereignisse in diesem Zeitraum.",
    showMore: (total) => `+ ${total} mehr`,
  };

export   const calculateColor = (event) => {
    const now = moment();
    const eventStart = moment(event.start);
    const diffDays = eventStart.diff(now, "days");

    if (diffDays <= 0) return "red";
    if (diffDays <= 7) return "orange";
    return "green";
  };