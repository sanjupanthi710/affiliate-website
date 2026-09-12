import { createContext, useContext, useEffect, useState } from 'react';
import { adminLogin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('adminInfo');
    if (stored) setAdmin(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await adminLogin(email, password);
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminInfo', JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
