import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Command as CommandIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, darkMode, onToggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
    handleProfileMenuClose();
  };

  const confirmLogout = () => {
    // Implement logout logic
    navigate('/login');
    setLogoutDialogOpen(false);
  };

  const mockNotifications = [
    { id: 1, title: 'New feedback received', time: '2 min ago', read: false },
    { id: 2, title: 'Feature vote updated', time: '1 hour ago', read: false },
    { id: 3, title: 'Roadmap updated', time: '3 hours ago', read: true }
  ];

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ px: 3 }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={onToggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h3" sx={{ flexGrow: 0, mr: 4 }}>
          ProductHub
        </Typography>

        {/* Search Button */}
        <Button
          startIcon={<SearchIcon />}
          onClick={handleSearchClick}
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            justifyContent: 'flex-start',
            color: 'text.secondary',
            border: (theme) => `1px solid ${theme.palette.border.default}`,
            borderRadius: 2,
            px: 2,
            py: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'action.hover',
              borderColor: 'primary.main'
            }
          }}
        >
          Search features, feedback, roadmaps... (⌘K)
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
        <IconButton
          color="inherit"
          onClick={onToggleDarkMode}
          sx={{ mr: 1 }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* Notifications */}
        <IconButton
          color="inherit"
          onClick={handleNotificationsOpen}
          sx={{ mr: 1 }}
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile Menu */}
        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{ p: 0 }}
        >
          <Avatar
            sx={{ 
              width: 36, 
              height: 36,
              bgcolor: 'primary.main',
              fontSize: 14
            }}
          >
            JD
          </Avatar>
        </IconButton>
      </Toolbar>

      {/* Search Dialog */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh'
            }}
            onClick={handleSearchClose}
          >
            <Box
              sx={{
                width: 640,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: theme.shadows[24],
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features, feedback, roadmaps, and more..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    height: 56,
                    fontSize: 20,
                    border: 'none',
                    '& fieldset': { border: 'none' }
                  }
                }}
                autoFocus
              />
              <Box sx={{ p: 2, borderTop: (theme) => `1px solid ${theme.palette.border.subtle}` }}>
                <Typography variant="caption" color="text.secondary">
                  Try searching for "mobile app", "user experience", or "integration"
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Box>
            <Typography variant="body2" fontWeight={600}>John Doe</Typography>
            <Typography variant="caption" color="text.secondary">john@example.com</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Help & Support</MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ mt: 1 }}
      >
        {mockNotifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationsClose}>
            <Box>
              <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                {notification.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2" color="primary" textAlign="center" width="100%">
            View all notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmLogout} variant="contained" color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;