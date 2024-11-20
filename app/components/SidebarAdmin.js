"use client";

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/navigation';
import { ReportProblem } from '@mui/icons-material';
import {SidebarLogInOut} from './SidebarLogInOut'



function SidebarAdmin() {
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die SidebarAdmin-Erweiterung
  const router = useRouter();

  // For auth



  const handleMouseEnter = () => {
    setIsExpanded(true); // Erweitert die SidebarAdmin bei Mouseover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Verkleinert die SidebarAdmin bei Mouseleave
  };


  const handleUsers = () => {
    router.push('/users');
  }

  const handleAnouncements = () => {
    router.push('/admin/announcements');
  };


  const handleTerminClick = () => {
    router.push('/admin/termin');
  };

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: isExpanded ? 250 : 80, // Erweiterung der SidebarAdmin bei Mouseover
            backgroundColor: '#333',
            color: '#ccc',
            paddingTop: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'width 0.3s ease',
            '& .MuiListItemIcon-root': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 40,
            },
          }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Dashboard"/>}
          </ListItemButton>
          <ListItemButton onClick={handleUsers}>
            <ListItemIcon>
              <GroupIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benutzerverwaltung"/>}
          </ListItemButton>
          <ListItemButton onClick={handleTerminClick}>
            <ListItemIcon>
              <EventIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Terminmanagement"/>}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Benachrichtigungen"/>}
          </ListItemButton>
          <ListItemButton onClick={handleAnouncements}>
            <ListItemIcon>
              <ReportProblem style={{color: '#ccc'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Ankündigungen"/>}
          </ListItemButton>
        </List>
        <SidebarLogInOut expanded={isExpanded}/>
      </Box>
    </Box>
  );
}

export default SidebarAdmin;
