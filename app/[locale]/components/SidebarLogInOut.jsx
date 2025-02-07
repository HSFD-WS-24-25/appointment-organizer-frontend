import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname, useRouter } from '@/i18n/routing';
import { generateBasePath } from "@/app/[locale]/components/Sidebar";
import { useTranslations } from 'next-intl';
import { BlueButton, RedButton, GreenButton, OrangeButton } from "@/app/[locale]/components/styledComponents/StyledButton";


export function SidebarLogInOut({ expanded }) {
    const { user } = useUser();
    const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Get the current route

    const handleLogoutClick = () => {
        setOpenLogoutDialog(true);
    };

    const handleProfileClick = () => {
          const basePath = generateBasePath(userInfo, user); // Determine the base path
        router.push(`${basePath}/profile_auth0`); // Navigate to the appropriate settings page
    };

    const handleSettingClick = () => {
        const basePath = generateBasePath(userInfo, user); // Determine the base path
        router.push(`${basePath}/settings`); // Navigate to the appropriate settings page
    };

    const handleLogoutCancel = () => {
        setOpenLogoutDialog(false);
    };

    const handleLogoutConfirm = () => {
        window.location.href = "/api/auth/logout"; // Redirect to logout endpoint
    };

    return (
        <>
            <List>
                {user ? (
                    <>
                        <ListItemButton onClick={handleProfileClick}>
                            <ListItemAvatar
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minWidth: 40,
                                }}
                            >
                                <Avatar src={user.picture} alt={user.name} sx={{ width: 24, height: 24 }} />
                            </ListItemAvatar>
                            {expanded && (
                              <ListItemText
                                primary={user.name}
                                sx={{
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              />
                            )}
                        </ListItemButton>
                        <ListItemButton onClick={handleSettingClick} 
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%', 
                          }}>
                            <ListItemIcon>
                                <SettingsIcon style={{ color: "#ccc" }} />
                            </ListItemIcon>
                            {expanded && 
                            <ListItemText primary="Settings" sx={{marginTop: 0, marginBottom: 0}} />}
                        </ListItemButton>
                        <ListItemButton onClick={handleLogoutClick}
                           sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%', 
                          }}>
                            <ListItemIcon>
                                <ExitToAppIcon style={{ color: "#ccc" }} />
                            </ListItemIcon>
                            {expanded && <ListItemText primary="Logout" sx={{marginTop: 0, marginBottom: 0}}/>}
                        </ListItemButton>
                    </>
                ) : (
                    <ListItemButton href="/api/auth/login">
                        <ListItemIcon>
                            <AccountCircleIcon style={{ color: "#ccc" }} />
                        </ListItemIcon>
                        {expanded && <ListItemText primary="Login" />}
                    </ListItemButton>
                )}
            </List>
            <LogoutDialog
                open={openLogoutDialog}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
}

SidebarLogInOut.propTypes = {
    expanded: PropTypes.bool,
};

export function LogoutDialog({ open, onClose, onConfirm }) {
    const t = useTranslations('SidebarLogInOut');
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('dialog_title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('dialog_description')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <RedButton onClick={onClose} color="primary">
                    {t('button_no')}
                </RedButton>
                <GreenButton onClick={onConfirm} color="primary" autoFocus>
                    {t('button_yes')}
                </GreenButton>
            </DialogActions>
        </Dialog>
    );
}

LogoutDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};