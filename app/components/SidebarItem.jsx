import * as PropTypes from "prop-types";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

export function SidebarItem(props) {
    return <ListItemButton onClick={props.item.action} sx={{justifyContent: props.expanded ? "initial" : "center"}}>
        <ListItemIcon sx={{
            minWidth: 0,
            mr: props.expanded ? 3 : "auto",
            justifyContent: "center"
        }}>{props.item.icon}</ListItemIcon>
        <ListItemText
            primary={props.item.text}
            sx={{
                opacity: props.expanded ? 1 : 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                transition: "opacity 0.3s ease, max-width 0.3s ease",
                maxWidth: props.expanded ? "200px" : "0px",
            }}
        />
    </ListItemButton>;
}

export function SidebarItemMobile(props) {
    return <ListItemButton onClick={props.item.action}>
        <ListItemIcon>{props.item.icon}</ListItemIcon>
        <ListItemText primary={props.item.text}/>
    </ListItemButton>;
}

SidebarItem.propTypes = {
    item: PropTypes.any,
    expanded: PropTypes.bool
};