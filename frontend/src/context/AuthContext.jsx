import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('edutrack_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('edutrack_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authAPI
      .me()
      .then((res) => {
        if (res.success && res.user) {
          localStorage.setItem('edutrack_user', JSON.stringify(res.user));
          setUser(res.user);
        }
      })
      .catch(() => {
        localStorage.removeItem('edutrack_token');
        localStorage.removeItem('edutrack_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persist = (token, userData) => {
    localStorage.setItem('edutrack_token', token);
    localStorage.setItem('edutrack_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const login = async (payload) => {
    const res = await authAPI.login(payload);
    if (!res.success) throw new Error(res.message || 'Login failed');
    return persist(res.token, res.user);
  };

  const register = async (payload) => {
    const res = await authAPI.register(payload);
    if (!res.success) throw new Error(res.message || 'Register failed');
    return persist(res.token, res.user);
  };

  const logout = () => {
    localStorage.removeItem('edutrack_token');
    localStorage.removeItem('edutrack_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}