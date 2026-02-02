"use client";

import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luxe_user');
      if (saved) setUser(JSON.parse(saved));
      
      const regs = localStorage.getItem('luxe_registered');
      if (regs) setRegistered(JSON.parse(regs));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('luxe_user', JSON.stringify(user));
      else localStorage.removeItem('luxe_user');
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('luxe_registered', JSON.stringify(registered));
    } catch (e) {}
  }, [registered]);

  const login = ({ email, name }) => {
    if (!registered.includes(email)) {
      return { success: false, error: 'Email not found. Please sign up first.' };
    }
    setUser({ email, name: name || '', loggedAt: Date.now() });
    return { success: true };
  };

  const signup = ({ email, name }) => {
    if (registered.includes(email)) {
      return { success: false, error: 'Email already registered.' };
    }
    setRegistered([...registered, email]);
    setUser({ email, name: name || '', loggedAt: Date.now() });
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, registered }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
