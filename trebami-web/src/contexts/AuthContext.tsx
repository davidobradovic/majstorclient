'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, authAPI } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role?: 'user' | 'worker';
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      // Verify token is still valid
      authAPI.getMe()
        .then((response) => {
          if (response.success) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          }
        })
        .catch(() => {
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const { user: userData, token: authToken } = response.data;
        
        setUser(userData);
        setToken(authToken);
        
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role?: 'user' | 'worker';
  }) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.success) {
        // After successful registration, automatically log in
        await login(userData.email, userData.password);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const response = await authAPI.updateProfile(user.id, userData);
      
      if (response.success) {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Update failed');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
