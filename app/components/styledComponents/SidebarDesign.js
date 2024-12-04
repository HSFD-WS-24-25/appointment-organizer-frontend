"use client"
import React from "react";
import {
  Box,
  List,
  IconButton,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

function SidebarDesign({
  isExpanded,
  onEnter,
  onLeave,
  drawerOpen,
  toggleDrawer,
  mainMenuItems,
  bottomMenuItems,
  role,
}) {
  // Map icons based on string names
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Desktop Sidebar */}
      <Box
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        sx={{
          width: isExpanded ? 250 : 80,
          backgroundColor: "#333",
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
        {/* Hauptmenü */}
        <List>
          {mainMenuItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={{ ...item, icon: icons[item.icon] }}
              expanded={isExpanded}
            />
          ))}
        </List>

        {/* Bottom-Menü */}
  <Box sx={{ marginTop: "auto" }}>
    <List>
      {bottomMenuItems.map((item, index) => (
        <SidebarItem
          key={index}
          item={{ ...item, icon: icons[item.icon] }}
          expanded={isExpanded}
        />
      ))}
    </List>
  </Box>

        {/* Gemeinsames Menü */}
        <SidebarLogInOut expanded={isExpanded} />
      </Box>

      {/* Mobile Hamburger Menu */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1300,
          width: "100%",
          padding: 1,
        }}
      >
        {!drawerOpen && (
          <IconButton onClick={toggleDrawer} sx={{ color: "#black", marginLeft: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: 250, backgroundColor: "#333", color: "#ccc" },
          }}
        >
          <List>
            {mainMenuItems.map((item, index) => (
              <SidebarItemMobile
                key={index}
                item={{ ...item, icon: icons[item.icon] }}
              />
            ))}
          </List>
        </Drawer>
      </Box>

    </Box>
  );
}

SidebarDesign.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  mainMenuItems: PropTypes.array.isRequired,
  bottomMenuItems: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
};

export default SidebarDesign;
