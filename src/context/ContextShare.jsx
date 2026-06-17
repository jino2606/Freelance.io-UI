import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('loggedInUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const login = useCallback((userData, authToken) => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    sessionStorage.setItem('token', authToken);
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    if (window.socket) {
      window.socket.disconnect();
      window.socket = null;
    }
  }, []);

  const updateUser = useCallback((userData) => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Theme context
const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
