"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import SidebarDesign from "../components/styledComponents/SidebarDesign";

function Sidebar({ role }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Admin-spezifische Menüeinträge
  const adminMenuItems = [
    { icon: "Dashboard", text: "Dashboard", action: () => router.push("") },
    { icon: "Group", text: "Benutzerverwaltung", action: () => router.push("/admin/users") },
    { icon: "Event", text: "Terminmanagement", action: () => router.push("/admin/termin") },
    { icon: "Notifications", text: "Benachrichtigungen", action: () => router.push("/admin/notification") },
    { icon: "ReportProblem", text: "Ankündigungen", action: () => router.push("/admin/announcements") },
  ];

  // User-spezifische Menüeinträge
  const userMenuItems = [
    { icon: "Group", text: "Veranstaltung erstellen", action: () => router.push("/user/createEvent") },
    { icon: "Event", text: "Meine Veranstaltungen", action: () => router.push("/user/myevent") },
    { icon: "Event", text: "Meine Teilnahmen", action: () => {} },
    { icon: "Bookmark", text: "Mein Entwurf", action: () => router.push("/user/meinEntwurf") },
  ];


  // Gemeinsame Menüeinträge
  const bottomMenuItems = [
    { icon: "AccountCircle", text: "Profil", action: () => router.push(`/${role}/profile`) },
    { icon: "Settings", text: "Einstellungen", action: () => router.push(`/${role}/settings`) },
    { icon: "ExitToApp", text: "Logout", action: () => {} },
  ];

  // Wähle die entsprechenden Menüeinträge basierend auf der Rolle
  let mainMenuItems = [];
  if (role === "admin") {
    mainMenuItems = adminMenuItems;
  } else if (role === "user") {
    mainMenuItems = userMenuItems;
  }

  return (
    <SidebarDesign
      isExpanded={isExpanded}
      onEnter={handleMouseEnter}
      onLeave={handleMouseLeave}
      drawerOpen={drawerOpen}
      toggleDrawer={toggleDrawer}
      mainMenuItems={mainMenuItems}
      bottomMenuItems={bottomMenuItems}
      role={role}
    />
  );
}

Sidebar.propTypes = {
  role: PropTypes.oneOf(["admin", "user", "participant"]).isRequired,
};

export default Sidebar;
