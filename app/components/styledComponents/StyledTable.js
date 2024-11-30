"use client";
import { styled } from "@mui/material/styles";
import { TableContainer, Table, TableRow, TableBody, TableCell, TableHead } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderSpacing: 0,
}));

export const StyledTableRow = styled(TableRow)(({ theme, rowStatus }) => ({
  backgroundColor: rowStatus === "Closed" ? "#f8d7da" : "#d4edda",
  "&:hover": {
    backgroundColor: rowStatus === "Closed" ? "#f5c6cb" : "#c3e6cb",
  },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#444",
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: "#444",
  fontWeight: "bold",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
}));
