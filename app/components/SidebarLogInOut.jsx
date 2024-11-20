import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List, ListItemAvatar,
    ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import * as PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

export function LogoutDialog(props) {
    return <>
        {/* Logout-Bestätigungsdialog */}
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Abmelden</DialogTitle>
            <DialogContent>
                <DialogContentText>Möchten Sie sich wirklich abmelden?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Nein</Button>
                <Button href="/api/auth/logout" color="primary" autoFocus>Ja</Button>
            </DialogActions>
        </Dialog>
    </>;
}

LogoutDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export function SidebarLogInOut(props) {
    return <List>
        {props.user ? (
            <>
                <ListItemButton onClick={props.onClick}>
                    <ListItemAvatar sx={{display: "flex", justifyContent: "center", alignItems: "center", minWidth: 40}}>
                        <Avatar src={props.user.picture} alt={props.user.name} sx={{width: 30, height: 30}}/>
                    </ListItemAvatar>
                    {props.expanded && <ListItemText primary={props.user.name}/>}
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon style={{color: "#ccc"}}/>
                    </ListItemIcon>
                    {props.expanded && <ListItemText primary="Einstellungen"/>}
                </ListItemButton>
                <ListItemButton onClick={props.onClick1}>
                    <ListItemIcon>
                        <ExitToAppIcon style={{color: "#ccc"}}/>
                    </ListItemIcon>
                    {props.expanded && <ListItemText primary="Logout"/>}
                </ListItemButton>
            </>
        ) : (
            <ListItemButton href="/api/auth/login">
                <ListItemIcon>
                    <AccountCircleIcon style={{color: "#ccc"}}/>
                </ListItemIcon>
                {props.expanded && <ListItemText primary="Login"/>}
            </ListItemButton>
        )}
    </List>;
}

SidebarLogInOut.propTypes = {
    user: PropTypes.any,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    onClick1: PropTypes.func
};