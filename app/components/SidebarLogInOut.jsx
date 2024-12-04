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
import { usePathname, useRouter } from 'next/navigation';

export function SidebarLogInOut({ expanded }) {
    const { user } = useUser();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Get the current route

    const handleLogoutClick = () => {
        setOpenLogoutDialog(true);
    };

    const handleProfileClick = () => {
        const basePath = pathname.startsWith("/admin") ? "/admin" : "/user"; // Determine the base path
        router.push(`${basePath}/profile`); // Navigate to the appropriate settings page
    };

    const handleSettingClick = () => {
        const basePath = pathname.startsWith("/admin") ? "/admin" : "/user"; // Determine the base path
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
                                <Avatar src={user.picture} alt={user.name} sx={{ width: 30, height: 30 }} />
                            </ListItemAvatar>
                            {expanded && <ListItemText primary={user.name} />}
                        </ListItemButton>
                        <ListItemButton onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <ExitToAppIcon style={{ color: "#ccc" }} />
                            </ListItemIcon>
                            {expanded && <ListItemText primary="Logout" />}
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
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Abmelden</DialogTitle>
            <DialogContent>
                <DialogContentText>Möchten Sie sich wirklich abmelden?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Nein
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Ja
                </Button>
            </DialogActions>
        </Dialog>
    );
}

LogoutDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};
