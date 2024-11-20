 "use client";

import React, { useState } from 'react';
import {
  Box,
  List,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatBoxUser from './ChatBoxUser';
import { useRouter } from 'next/navigation';
import { Bookmark } from '@mui/icons-material';
import {SidebarItem, SidebarItemMobile} from './SidebarItem';
import {SidebarLogInOut} from './SidebarLogInOut';
import PropTypes from "prop-types";




 SidebarItemMobile.propTypes = {item: PropTypes.any};

 function SidebarUser() {
  const [, setOpenLogoutDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Zustand für das mobile Menü
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die SidebarAdmin-Erweiterung
  const router = useRouter();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die SidebarAdmin bei Mouseleave
  };

  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die SidebarAdmin bei Mouseover
  };
     const handleUserProfilClick = () => {
    router.push('/user/profile');
  };

  const handleUserSettingsClick = () => {
    router.push('/user/settings');
  };
     const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserDraftClick = () => {
    router.push('/user/meinEntwurf');
  };

    const handleUserEventsClick = () => {
        router.push('/user/myevent');
    };

  const mainMenuItems = [
    { icon: <GroupIcon style={{ color: '#ccc' }} />, text: "Veranstaltung erstellen", action: () => {} },
    { icon: <EventIcon style={{ color: '#ccc' }} />, text: "Meine Veranstaltungen", action: handleUserEventsClick },
    { icon: <EventIcon style={{ color: '#ccc' }} />, text: "Meine Teilnahmen", action: () => {} },
    { icon: <Bookmark style={{ color: '#ccc' }} />, text: "Mein Entwurf", action: handleUserDraftClick },
  ];

  const bottomMenuItems = [
    { icon: <AccountCircleIcon style={{ color: '#ccc' }} />, text: "Profil", action: handleUserProfilClick },
    { icon: <SettingsIcon style={{ color: '#ccc' }} />, text: "Einstellungen", action: handleUserSettingsClick },
    { icon: <ExitToAppIcon style={{ color: '#ccc' }} />, text: "Logout", action: handleLogoutClick },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatBoxUser />
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: isExpanded ? 250 : 80,
          backgroundColor: '#333',
          color: '#ccc',
          paddingTop: 2,
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Main Menu */}
        <List>
          {mainMenuItems.map((item, index) => (
            <SidebarItem key={index} item={item} expanded={isExpanded}/>
          ))}
        </List>

        {/* Bottom Menu */}
        <SidebarLogInOut expanded={isExpanded}/>
      </Box>

      {/* Mobile Hamburger Menu */}
      <Box 
        sx={{ 
          display: { xs: 'flex', sm: 'none' }, 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 1300, 
          width: '100%', 
          padding: 1 
        }}
      >
        {!drawerOpen && ( // Icon nur anzeigen, wenn Drawer nicht geöffnet ist
          <IconButton onClick={toggleDrawer} sx={{ color: '#black', marginLeft: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: 250, backgroundColor: '#333', color: '#ccc' },
          }}
        >
          <List>
            {mainMenuItems.map((item, index) => (
              <SidebarItemMobile key={index} item={item}/>
            ))}
          </List>
          <List>
            {bottomMenuItems.map((item, index) => (
                <SidebarItemMobile key={index} item={item}/>
            ))}
          </List>
        </Drawer>
      </Box>

        {/* Logout Confirmation Dialog */}
        {/*Done by the SidebarLoginOut Component*/}
    </Box>
  );
}

export default SidebarUser;
