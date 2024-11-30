"use client";

import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";

// Styled Menu
export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    minWidth: 200,
  },
}));

// Styled MenuItem
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiMenuItem-root": {
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    "&.Mui-selected:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
