"use client";

import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

// Styled Dialog Container
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
}));

// Styled Dialog Title
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: "center",
  padding: theme.spacing(2),
}));

// Styled Dialog Content
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  padding: theme.spacing(2),
}));

// Styled Dialog Actions
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: "flex-end",
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.default,
}));
