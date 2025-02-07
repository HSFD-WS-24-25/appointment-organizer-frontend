"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  IconButton,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import {
  Dashboard,
  Group,
  Event,
  AccountCircle,
  Settings,
  ExitToApp,
  Notifications,
  Bookmark,
  ReportProblem,
} from "@mui/icons-material";
import { SidebarItem, SidebarItemMobile } from "../SidebarItem";
import { SidebarLogInOut } from "../SidebarLogInOut";
import PropTypes from "prop-types";

// 🔹 Icon-Farben auf Grau setzen (#ccc)
const icons = {
  Dashboard: <Dashboard style={{ color: "#ccc" }} />,
  Group: <Group style={{ color: "#ccc" }} />,
  Event: <Event style={{ color: "#ccc" }} />,
  AccountCircle: <AccountCircle style={{ color: "#ccc" }} />,
  Settings: <Settings style={{ color: "#ccc" }} />,
  ExitToApp: <ExitToApp style={{ color: "#ccc" }} />,
  Notifications: <Notifications style={{ color: "#ccc" }} />,
  Bookmark: <Bookmark style={{ color: "#ccc" }} />,
  ReportProblem: <ReportProblem style={{ color: "#ccc" }} />,
};

function SidebarDesign({
  isExpanded,
  onEnter,
  onLeave,
  mainMenuItems,
  bottomMenuItems,
  role,
  isPinned,
  togglePin,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)"); // Mobile Ansicht ab 900px

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{  display: "flex", height: "100vh"  }}>
      {/* Mobile Burger-Menü */}
      {isMobile && (
        <IconButton
  onClick={toggleDrawer}
  sx={{
    color: "white", // Sichtbare Farbe
    position: "fixed", // Fixiert es an einem festen Punkt
    top: 10, // Abstand von oben
    left: -3, // Abstand von links
    zIndex: 9999, // Sehr hohe Priorität
  }}
>
  <MenuIcon />
</IconButton>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
       <Box
       onMouseEnter={onEnter}
       onMouseLeave={onLeave}
       sx={{
         width: isExpanded ? 250 : 80,
        // backgroundColor: "#333",
         color: "#ccc",
         paddingTop: 2,
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between",
         transition: "width 0.3s ease",
         "& .MuiListItemIcon-root": {
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           minWidth: 40,
         },
       }}
     >
          {/* Pin Icon */}
          <Box
          sx={{
            display: 'flex',
            marginLeft: '10px', // Verschiebe das Icon 20 Pixel vom linken Rand, wenn die Sidebar erweitert ist
            alignItems: 'center',
            padding: 0.2,
            borderBottom: '1px solid #444',
          }}
        >
            <IconButton onClick={togglePin}>
              <ChromeReaderModeIcon style={{ color: isPinned ? "orange" : "#ccc" }} />
            </IconButton>
          </Box>

          {/* Hauptmenü */}
          <List sx={{ flexGrow: 1 }}>
          {mainMenuItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={{ ...item, icon: icons[item.icon] }}
              expanded={isExpanded}
            />
          ))}
        </List>

          {/* Trennlinie & Logout-Bereich */}
          <Box sx={{ marginTop: "auto" }}>
            <Divider sx={{ backgroundColor: "#444", marginX: "10px" }} />
            <Box sx={{ paddingY: "10px" }}>
              <SidebarLogInOut expanded={isExpanded} />
            </Box>
          </Box>
        </Box>
      )}

      {/* Mobile Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: "auto",
            background: "linear-gradient(135deg, #121212, #1d1d2b, #0a0a23)",
            color: "#ccc",
            borderRadius: "0 10px 10px 0", // 🔹 Mobile Sidebar ebenfalls abgerundet
            padding: "10px"
          },
        }}
      >
        <List sx={{ paddingY: "10px" }}>
          {mainMenuItems.map((item, index) => (
            <SidebarItemMobile
              key={index}
              item={{ ...item, icon: icons[item.icon] }}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: "0 10px 10px 0", // 🔹 Abgerundete rechte Ecken für mobile Ansicht
                "& .MuiListItemIcon-root": {
                  minWidth: "50px",
                },
                "& .MuiListItemText-root": {
                  marginLeft: "15px",
                },
                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            />
          ))}
        </List>

        {/* Trennlinie & Logout-Bereich */}
        <Box sx={{ marginTop: "auto" }}>
          <Divider sx={{ backgroundColor: "#444", marginX: "10px" }} />
          <Box sx={{ paddingY: "10px" }}>
            <SidebarLogInOut expanded={true} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

SidebarDesign.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  mainMenuItems: PropTypes.array.isRequired,
  bottomMenuItems: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired,
};

export default SidebarDesign;