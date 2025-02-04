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
    <Box sx={{ display: "flex" }}>
      {/* Mobile Burger-Menü */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            color: "black",
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
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
            backgroundColor: "#333",
            color: "#ccc",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "width 0.3s ease",
            padding: "10px 0",
            borderRadius: "0 10px 10px 0", // 🔹 Abgerundete rechte Ecken
          }}
        >
          {/* Pin Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: isExpanded ? "space-between" : "center",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #444",
            }}
          >
            <IconButton onClick={togglePin}>
              <ChromeReaderModeIcon style={{ color: isPinned ? "orange" : "#ccc" }} />
            </IconButton>
          </Box>

          {/* Hauptmenü */}
          <List sx={{ flexGrow: 1, paddingY: "10px" }}>
            {mainMenuItems.map((item, index) => (
              <SidebarItem
                key={index}
                item={{ ...item, icon: icons[item.icon] }}
                expanded={isExpanded}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderRadius: "0 10px 10px 0", // 🔹 Abgerundete rechte Ecken für Menüeinträge
                  "& .MuiListItemIcon-root": {
                    minWidth: "50px", // 🔹 Einheitliche Abstände
                  },
                  "& .MuiListItemText-root": {
                    marginLeft: "15px", // 🔹 Mehr Platz für bessere Lesbarkeit
                  },
                  "&:hover": {
                    backgroundColor: "#444", // 🔹 Leichter Hover-Effekt
                  },
                }}
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
            width: 250,
            backgroundColor: "#333",
            color: "#ccc",
            borderRadius: "0 10px 10px 0", // 🔹 Mobile Sidebar ebenfalls abgerundet
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
