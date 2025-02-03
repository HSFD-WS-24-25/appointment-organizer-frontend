"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarDesign from "@/app/components/styledComponents/SidebarDesign";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/lib/useFetchApiData";

// Funktion zur Generierung des Base Path
export const generateBasePath = (userInfo, user) => {
  return userInfo
    ? `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`
    : `/defaultInstanz/defaultOrganisation/${user?.sub}`;
};


function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const [isPinned, setIsPinned] = useState(false); // Zustand für das Anheften der Sidebar

  const [roleId, setRoleId] = useState(null); // Nur role_id
  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen
  const router = useRouter();

  // Daten über Auth0 und die API laden
  const { user, error: authError, isLoading } = useUser();
  const path = "/api/users"; // Endpoint zum Abrufen der Benutzerdaten
  const method = "GET";
  const { data: users, error: fetchError } = useFetchApiData(user, path, method);

  // Base Path generieren
  const basePath = generateBasePath(userInfo, user);

  // Rolle aus der Datenbank setzen
  useEffect(() => {
    if (users && user) {
      const currentUser = users.find((dbUser) => dbUser.sub === user.sub);
      if (currentUser) {
        setRoleId(currentUser.role_id);
        setUserInfo(currentUser); // Benutzerinformationen setzen
      }
    }
  }, [users, user]);


  let mainMenuItems = [];
  let bottomMenuItems = [
    {
      icon: "Settings",
      text: "Einstellungen",
      action: () => router.push(`${basePath}/settings`),
    },
  ];


  let dashboard = {
    icon: "Dashboard",
    text: "Dashboard",
    action: () => router.push(basePath),
  };

  if (roleId === 1) {
    mainMenuItems = [
      dashboard,
      { icon: "Group", text: "Benutzerverwaltung", action: () => router.push(`${basePath}/userControl`) },
      { icon: "Event", text: "Terminmanagement", action: () => router.push(`${basePath}/termin`) },
      { icon: "Notifications", text: "Benachrichtigungen", action: () => router.push(`${basePath}/notification`) },
      { icon: "ReportProblem", text: "Ankündigungen", action: () => router.push(`${basePath}/announcements`) },
      { icon: "Event", text: "Veranstaltungen", action: () => router.push(`${basePath}/myevent`) },
      { icon: "Event", text: "Meine Teilnahmen", action: () => router.push(`${basePath}/myParticipations`) },
    ];
  } else if (roleId === 2) {
    mainMenuItems = [
      dashboard,
      { icon: "Event", text: "Terminmanagement", action: () => router.push(`${basePath}/termin`) },
      { icon: "Notifications", text: "Benachrichtigungen", action: () => router.push(`${basePath}/notification`) },
      { icon: "ReportProblem", text: "Ankündigungen", action: () => router.push(`${basePath}/announcements`) },
      { icon: "Group", text: "Veranstaltung erstellen", action: () => router.push(`${basePath}/createEvent`) },
      { icon: "Event", text: "Meine Veranstaltungen", action: () => router.push(`${basePath}/myevent`) },
      { icon: "Event", text: "Meine Teilnahmen", action: () => router.push(`${basePath}/myParticipations`) },
      { icon: "Bookmark", text: "Mein Entwurf", action: () => router.push(`${basePath}/meinEntwurf`) },
    ];
  } else if (roleId === 4) {
    mainMenuItems = [
      dashboard,
      { icon: "Event", text: "Terminmanagement", action: () => router.push(`${basePath}/termin`) },
      { icon: "Event", text: "Meine Veranstaltungen", action: () => router.push(`${basePath}/myevent`) },
    ];
  }


  // UI-Interaktion für die Sidebar
  const togglePin = () => setIsPinned(!isPinned);

  const handleMouseEnter = () => setIsExpanded(true);

  const handleMouseLeave = () => {
    if (!isPinned) setIsExpanded(false);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <SidebarDesign
      isExpanded={isExpanded}
      onEnter={handleMouseEnter}
      onLeave={handleMouseLeave}
      drawerOpen={drawerOpen}
      toggleDrawer={toggleDrawer}
      mainMenuItems={mainMenuItems}
      bottomMenuItems={bottomMenuItems}
      role={roleId}
      isPinned={isPinned}
      togglePin={togglePin}
    />
  );
}

export default Sidebar;
