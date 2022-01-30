import React, { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  Box,
  ListItemIcon,
} from '@mui/material';
import { Person as ProfileIcon, Logout as LogoutIcon, Settings as SettingsIcon } from '@mui/icons-material';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import logo from '../../assets/imgs/logo.png';
import { useHistory } from 'react-router-dom';
import greenDot from '../../assets/avatar/greenDot.png';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, logout } = useAuth();
  const history = useHistory();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    history.push('/profile');
  };
  const toDashboard = () => {
    history.push('/dashboard');
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static" sx={{ background: '#eee', boxShadow: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 5 }}>
          <img src={logo} alt="logo.png" />
        </Typography>
        {loggedInUser && (
          <>
            <MenuItem onClick={toDashboard}>
              <Typography sx={{ color: '#000', fontWeight: 600 }} textAlign="center">
                Dashboard
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography sx={{ color: '#000', fontWeight: 600 }} textAlign="center">
                Messages
              </Typography>
              <img src={greenDot} alt="green dot" />
            </MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Box sx={{ mr: 5 }}>
                <AvatarDisplay user={loggedInUser} loggedIn={true} />
              </Box>
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ProfileIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
