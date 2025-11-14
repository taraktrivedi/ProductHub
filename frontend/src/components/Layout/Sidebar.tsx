import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Feedback as FeedbackIcon,
  Extension as FeaturesIcon,
  Map as RoadmapIcon,
  Analytics as AnalyticsIcon,
  Settings as IntegrationsIcon,
  Psychology as MindMapIcon,
  Assessment as PrioritizationIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  darkMode: boolean;
}

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Feedback', path: '/feedback', icon: <FeedbackIcon /> },
  { label: 'Features', path: '/features', icon: <FeaturesIcon /> },
  { label: 'Roadmaps', path: '/roadmaps', icon: <RoadmapIcon /> },
  { label: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
  { label: 'Integrations', path: '/integrations', icon: <IntegrationsIcon /> },
  { label: 'Mind Map', path: '/mindmap', icon: <MindMapIcon /> },
  { label: 'Prioritization', path: '/prioritization', icon: <PrioritizationIcon /> }
];

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {open && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              borderRight: (theme) => `1px solid ${theme.palette.border.subtle}`,
              backgroundColor: (theme) => theme.palette.background.paper,
              overflow: 'hidden'
            }
          }}
        >
          <Box sx={{ p: 3, borderBottom: (theme) => `1px solid ${theme.palette.border.subtle}` }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                ProductHub
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Product Management Platform
              </Typography>
            </motion.div>
          </Box>

          <List sx={{ px: 1, py: 2 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      minHeight: 48,
                      px: 2,
                      mx: 1,
                      backgroundColor: isActive(item.path) ? 'primary.main' : 'transparent',
                      color: isActive(item.path) ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        backgroundColor: isActive(item.path) 
                          ? 'primary.dark' 
                          : darkMode 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(0, 0, 0, 0.03)'
                      },
                      position: 'relative',
                      '&::before': isActive(item.path) ? {
                        content: '""',
                        position: 'absolute',
                        left: -3,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: '60%',
                        backgroundColor: 'primary.main',
                        borderRadius: '0 3px 3px 0'
                      } : {}
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive(item.path) ? 'inherit' : 'text.secondary',
                        minWidth: 40
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: isActive(item.path) ? 600 : 500
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>

          <Divider sx={{ mx: 2, my: 2 }} />

          <Box sx={{ p: 2, mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: 2,
                  bgcolor: 'primary.main',
                  fontSize: 14
                }}
              >
                JD
              </Avatar>
              <Box>
                <Typography variant="caption" fontWeight={600}>
                  John Doe
                </Typography>
                <Typography variant="overline" color="text.secondary" display="block">
                  Product Manager
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderColor: (theme) => theme.palette.border.default,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)',
                  borderColor: 'primary.main'
                }
              }}
            >
              Settings
            </Button>
          </Box>
        </Drawer>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;