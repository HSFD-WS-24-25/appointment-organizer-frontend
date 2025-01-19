"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarDesign from "@/app/components/styledComponents/SidebarDesign";
import { useUserContext } from "@/app/context/UserContext"; // Benutzerkontext

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const [isPinned, setIsPinned] = useState(false); // Zustand für das Anheften der Sidebar
  const router = useRouter();
  const { userInfo } = useUserContext(); // Benutzerinformationen aus dem Kontext
  const [role, setRole] = useState("");

  // Rolle aus dem Benutzerkontext setzen
  useEffect(() => {
    if (userInfo && userInfo.role) {
      setRole(userInfo.role);
    }
  }, [userInfo]);

  if (!userInfo) {
    return;
  }

  const basePath = `/${userInfo.instanz}/${userInfo.organisation}/${userInfo.username}`;

  let mainMenuItems = [];
  let bottomMenuItems = [
    { icon: "Settings", text: "Einstellungen", action: () => router.push(`${basePath}/settings`) }
  ];

  let dashboard = { icon: "Dashboard", text: "Dashboard", action: () => router.push(basePath) }

  switch (role) {
    case "organisation-admin":
      mainMenuItems = [
        dashboard,
        { icon: "Group", text: "Benutzerverwaltung", action: () => router.push(`${basePath}/userControl`) },
        { icon: "Event", text: "Terminmanagement", action: () => router.push(`${basePath}/termin`) },
        { icon: "Notifications", text: "Benachrichtigungen", action: () => router.push(`${basePath}/notification`) },
        { icon: "ReportProblem", text: "Ankündigungen", action: () => router.push(`${basePath}/announcements`) },
        { icon: "Group", text: "Veranstaltung erstellen", action: () => router.push(`${basePath}/createEvent`) },
        { icon: "Event", text: "Veranstaltungen", action: () => router.push(`${basePath}/myevent`) },
        { icon: "Event", text: "Meine Teilnahmen", action: () => router.push(`${basePath}/myParticipations`) },
      ];
      break;

    case "organisator":
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
      break;

      case "teilnehmer":
        mainMenuItems = [
          dashboard,
          { icon: "Event", text: "Terminmanagement", action: () => router.push(`${basePath}/termin`) },
          { icon: "Event", text: "Meine Veranstaltungen", action: () => router.push(`${basePath}/myevent`) },
        ];
        break;
        

    default:
      mainMenuItems = []; // Optional: Menüeinträge für unbekannte Rollen
  }

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned)
    setIsExpanded(false);
    else {
      setIsExpanded(true);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <SidebarDesign
      isExpanded={isExpanded}
      onEnter={handleMouseEnter}
      onLeave={handleMouseLeave}
      drawerOpen={drawerOpen}
      toggleDrawer={toggleDrawer}
      mainMenuItems={mainMenuItems}
      bottomMenuItems={bottomMenuItems} // Übergabe des Bottom-Menüs
      role={role}
      isPinned={isPinned}
      togglePin={togglePin}
    />
  );
}

export default Sidebar;
