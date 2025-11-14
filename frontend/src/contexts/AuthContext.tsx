import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUser } from '../store/slices/authSlice';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: any) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  const mockLogin = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (email && password) {
      const user = {
        id: 1,
        email,
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        role: 'product-manager',
        avatar: email.split('@')[0].charAt(0).toUpperCase()
      };
      
      dispatch(login({ user, token: 'mock-jwt-token' }));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const mockLogout = () => {
    dispatch(logout());
  };

  const mockUpdateUser = (updates: any) => {
    dispatch(updateUser(updates));
  };

  const value: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login: mockLogin,
    logout: mockLogout,
    updateUser: mockUpdateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};