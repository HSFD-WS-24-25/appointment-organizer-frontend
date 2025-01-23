"use client"; // Wichtig für Next.js

// React Basics
global.React = require('react');
global.useState = React.useState;
global.useEffect = React.useEffect;
global.createContext = React.createContext;
global.useContext = React.useContext;

// Material UI - Basis Komponenten
global.Autocomplete = require('@mui/material').Autocomplete;
global.Modal = require('@mui/material').Modal;
global.Box = require('@mui/material').Box;
global.Button = require('@mui/material').Button;
global.TextField = require('@mui/material').TextField;
global.Typography = require('@mui/material').Typography;
global.Paper = require('@mui/material').Paper;
global.Checkbox = require('@mui/material').Checkbox;
global.Stack = require('@mui/material').Stack;
global.Avatar = require('@mui/material').Avatar;
global.Grid = require('@mui/material').Grid;
global.Card = require('@mui/material').Card;
global.CardContent = require('@mui/material').CardContent;
global.CardActions = require('@mui/material').CardActions;
global.FormControl = require('@mui/material').FormControl;
global.InputLabel = require('@mui/material').InputLabel;
global.MenuItem = require('@mui/material').MenuItem;
global.Select = require('@mui/material').Select;
global.Alert = require('@mui/material').Alert;
global.List = require('@mui/material').List;
global.ListItem = require('@mui/material').ListItem;
global.ListItemAvatar = require('@mui/material').ListItemAvatar;
global.ListItemText = require('@mui/material').ListItemText;
global.ListItemButton = require('@mui/material').ListItemButton;
global.ListItemIcon = require('@mui/material').ListItemIcon;
global.Dialog = require('@mui/material').Dialog;
global.DialogTitle = require('@mui/material').DialogTitle;
global.DialogContent = require('@mui/material').DialogContent;
global.DialogContentText = require('@mui/material').DialogContentText;
global.DialogActions = require('@mui/material').DialogActions;
global.FormControlLabel = require('@mui/material').FormControlLabel;
global.InputAdornment = require('@mui/material').InputAdornment;
global.Drawer = require('@mui/material').Drawer;
global.Divider = require('@mui/material').Divider;
global.Badge = require('@mui/material').Badge;
global.Switch = require('@mui/material').Switch;
global.createTheme = require('@mui/material/styles').createTheme;
global.ThemeProvider = require('@mui/material/styles').ThemeProvider;

// Material UI - Tabellen
global.Table = require('@mui/material').Table;
global.TableBody = require('@mui/material').TableBody;
global.TableCell = require('@mui/material').TableCell;
global.TableContainer = require('@mui/material').TableContainer;
global.TableHead = require('@mui/material').TableHead;
global.TableRow = require('@mui/material').TableRow;

// Material UI - Icons
global.AddIcon = require('@mui/icons-material/Add').default;
global.FilterListIcon = require('@mui/icons-material/FilterList').default;
global.CalendarTodayIcon = require('@mui/icons-material/CalendarToday').default;
global.AccessTimeIcon = require('@mui/icons-material/AccessTime').default;
global.ListIcon = require('@mui/icons-material/ViewList').default;
global.GridIcon = require('@mui/icons-material/ViewModule').default;
global.EditIcon = require('@mui/icons-material/Edit').default;
global.DeleteIcon = require('@mui/icons-material/Delete').default;
global.HeadsetMicIcon = require('@mui/icons-material/HeadsetMic').default;
global.CloseIcon = require('@mui/icons-material/Close').default;
global.LocationOnIcon = require('@mui/icons-material/LocationOn').default;
global.ContactMailIcon = require('@mui/icons-material/ContactMail').default;
global.FacebookIcon = require('@mui/icons-material/Facebook').default;
global.InstagramIcon = require('@mui/icons-material/Instagram').default;
global.CameraAltIcon = require('@mui/icons-material/CameraAlt').default;
global.FavoriteBorderIcon = require('@mui/icons-material/FavoriteBorder').default;
global.SettingsIcon = require('@mui/icons-material/Settings').default;
global.ExitToAppIcon = require('@mui/icons-material/ExitToApp').default;
global.AccountCircleIcon = require('@mui/icons-material/AccountCircle').default;
global.PushPinIcon = require('@mui/icons-material/PushPin').default;
global.ChromeReaderModeIcon = require('@mui/icons-material/ChromeReaderMode').default;
global.Notifications = require('@mui/icons-material/Notifications').default;
global.Bookmark = require('@mui/icons-material/Bookmark').default;
global.ReportProblem = require('@mui/icons-material/ReportProblem').default;

// Styled Components
global.StyledTableContainer = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTable = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTableRow = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTableHeadCell = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTableBody = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTableCell = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledTableHead = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.StyledPaper = require('@/app/[locale]/components/styledComponents/StyledPaper').default;
global.BlueButton = require('@/app/[locale]/components/styledComponents/StyledButton').BlueButton;
global.RedButton = require('@/app/[locale]/components/styledComponents/StyledButton').RedButton;
global.GreenButton = require('@/app/[locale]/components/styledComponents/StyledButton').GreenButton;
global.DesignTitel = require('@/app/[locale]/components/styledComponents/DesignTitel').default;
global.SidebarDesign = require('@/app/[locale]/components/styledComponents/SidebarDesign').default;
global.CustomToolbar = require('@/app/[locale]/components/styledComponents/StyledCalender').CustomToolbar;

// Next.js Features
global.useRouter = require('next/navigation').useRouter;
global.useParams = require('next/navigation').useParams;
global.usePathname = require('next/navigation').usePathname;
global.notFound = require('next/navigation').notFound;
// Internationalisierung
global.useTranslations = require('next-intl').useTranslations;
global.NextIntlClientProvider = require('next-intl').NextIntlClientProvider;
global.LocaleSwitcher = require('@/app/[locale]/components/LocaleSwitcher').default;
global.getMessages = require('next-intl/server').getMessages;
global.routing = require('@/i18n/routing').routing;

// Auth0 Provider
global.UserProvider = require('@auth0/nextjs-auth0/client').UserProvider;
global.useUser = require('@auth0/nextjs-auth0/client').useUser;
global.withPageAuthRequired = require('@auth0/nextjs-auth0/client').withPageAuthRequired;

// Custom Context Providers
global.useUserContext = require('@/app/[locale]/context/UserContext').useUserContext;

global.LocalStorage = {
    get: (key) => (typeof window !== 'undefined' ? localStorage.getItem(key) : null),
    set: (key, value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },
  };
global.ChatProvider = require('@/app/[locale]/components/ChatContext').ChatProvider;
global.DarkModeProvider = require('@/app/[locale]/components/styledComponents/DarkMode').DarkModeProvider;
global.UserProviderr = require('@/app/[locale]/context/UserContext').UserProviderr;

// Libraries
global.moment = require('moment');
global.jsPDF = require('jspdf');
global.saveAs = require('file-saver').saveAs;
global.PropTypes = require('prop-types');
global.clsx = require('clsx');

// Utils
global.LocalStorage = require('../components/styledComponents/LocaleStorage').default;

// CSS und Globals
require('@/app/[locale]/globals.css');
