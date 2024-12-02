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

  let mainMenuItems = [];

  switch (role) {
    case "admin":
      mainMenuItems = [
        { icon: "Dashboard", text: "Dashboard", action: () => router.push("") },
        { icon: "Group", text: "Benutzerverwaltung", action: () => router.push("/admin/users") },
        { icon: "Event", text: "Terminmanagement", action: () => router.push("/admin/termin") },
        { icon: "Notifications", text: "Benachrichtigungen", action: () => router.push("/admin/notification") },
        { icon: "ReportProblem", text: "Ankündigungen", action: () => router.push("/admin/announcements") },
      ];
      break;

    case "user":
      mainMenuItems = [
        { icon: "Group", text: "Veranstaltung erstellen", action: () => router.push("/user/createEvent") },
        { icon: "Event", text: "Meine Veranstaltungen", action: () => router.push("/user/myevent") },
        { icon: "Event", text: "Meine Teilnahmen", action: () => {} },
        { icon: "Bookmark", text: "Mein Entwurf", action: () => router.push("/user/meinEntwurf") },
      ];
      break;

    default:
      mainMenuItems = []; // Optional: Menüeinträge für unbekannte Rollen oder keine Rolle
  }

  return (
    <SidebarDesign
      isExpanded={isExpanded}
      onEnter={handleMouseEnter}
      onLeave={handleMouseLeave}
      drawerOpen={drawerOpen}
      toggleDrawer={toggleDrawer}
      mainMenuItems={mainMenuItems}
      role={role}
    />
  );
}

Sidebar.propTypes = {
  role: PropTypes.oneOf(["admin", "user", "participant"]).isRequired,
};

export default Sidebar;
