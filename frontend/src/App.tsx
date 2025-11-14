import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import Features from './pages/Features';
import Roadmaps from './pages/Roadmaps';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import MindMap from './pages/MindMap';
import Prioritization from './pages/Prioritization';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { NotificationProvider } from './contexts/NotificationContext';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#9333EA',
        light: '#A855F7',
        dark: '#7E22CE'
      },
      secondary: {
        main: '#6366F1'
      },
      background: {
        default: darkMode ? '#0A0A0A' : '#F4F4F5',
        paper: darkMode ? '#141414' : '#FFFFFF'
      },
      text: {
        primary: darkMode ? '#E4E4E7' : '#18181B',
        secondary: darkMode ? '#A1A1AA' : '#71717A'
      },
      border: {
        default: darkMode ? '#3F3F46' : '#D4D4D8',
        subtle: darkMode ? '#262626' : '#E4E4E7'
      }
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontSize: '30px',
        fontWeight: 700,
        lineHeight: 1.2
      },
      h2: {
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: 1.3
      },
      h3: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: 1.4
      },
      body1: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: 1.5
      },
      caption: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.4
      },
      overline: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.3
      }
    },
    spacing: 4,
    shape: {
      borderRadius: 8
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#141414' : '#FFFFFF',
            color: darkMode ? '#E4E4E7' : '#18181B',
            boxShadow: 'none',
            borderBottom: `1px solid ${darkMode ? '#262626' : '#E4E4E7'}`
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#141414' : '#FFFFFF',
            borderRight: `1px solid ${darkMode ? '#262626' : '#E4E4E7'}`,
            width: 280
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: 500
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#141414' : '#FFFFFF',
            border: `1px solid ${darkMode ? '#262626' : '#E4E4E7'}`,
            boxShadow: darkMode 
              ? '0 0 16px rgba(147, 51, 234, 0.2)' 
              : '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.06)'
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1A1A1A' : '#F9FAFB'
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
            }
          }
        }
      }
    }
  });

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              <Router>
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar 
                    open={sidebarOpen} 
                    onToggle={handleToggleSidebar}
                    darkMode={darkMode}
                  />
                  <Box 
                    component="main" 
                    sx={{ 
                      flexGrow: 1, 
                      transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                      }),
                      marginLeft: sidebarOpen ? 0 : '-280px',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh'
                    }}
                  >
                    <Header 
                      onToggleSidebar={handleToggleSidebar}
                      darkMode={darkMode}
                      onToggleDarkMode={() => setDarkMode(!darkMode)}
                    />
                    <Box 
                      component="div" 
                      sx={{ 
                        flexGrow: 1, 
                        padding: '24px',
                        paddingTop: '80px', // Account for header height
                        maxWidth: 1600,
                        margin: '0 auto',
                        width: '100%'
                      }}
                    >
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/roadmaps" element={<Roadmaps />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/integrations" element={<Integrations />} />
                        <Route path="/mindmap" element={<MindMap />} />
                        <Route path="/prioritization" element={<Prioritization />} />
                      </Routes>
                    </Box>
                  </Box>
                </Box>
              </Router>
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;