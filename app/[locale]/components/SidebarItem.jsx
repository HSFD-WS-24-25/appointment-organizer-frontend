import * as PropTypes from "prop-types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

export function SidebarItem(props) {
    return (
        <ListItemButton 
            onClick={props.item.action} 
            sx={{ 
                justifyContent: props.expanded ? "initial" : "center",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative", // Position bleibt konstant
                minHeight: "48px" // Einheitliche Höhe für alle Elemente
            }}
        >
            <ListItemIcon sx={{
                minWidth: "48px", // Einheitliche Breite für alle Icons
                justifyContent: "center",
                display: "flex",
                alignItems: "center"
            }}>
                {props.item.icon}
            </ListItemIcon>
            <ListItemText
                primary={props.item.text}
                sx={{
                    opacity: props.expanded ? 1 : 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    transition: "opacity 0.3s ease-in-out, max-width 0.3s ease-in-out",
                    maxWidth: props.expanded ? "180px" : "0px",
                    position: "absolute", // Verhindert, dass der Text die Höhe beeinflusst
                    left: "60px", // Fixierte Position neben dem Icon
                }}
            />
        </ListItemButton>
    );
}

export function SidebarItemMobile(props) {
    return (
        <ListItemButton 
            onClick={props.item.action} 
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minHeight: "48px"
            }}
        >
            <ListItemIcon sx={{
                minWidth: "48px", 
                justifyContent: "center",
                display: "flex",
                alignItems: "center"
            }}>
                {props.item.icon}
            </ListItemIcon>
            <ListItemText primary={props.item.text} />
        </ListItemButton>
    );
}

SidebarItem.propTypes = {
    item: PropTypes.any,
    expanded: PropTypes.bool
};
