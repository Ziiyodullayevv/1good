// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/User';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        Cookies.remove('user');
        Cookies.remove('token');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    // State-ni yangilash
    setUser(userData);
    setToken(token);

    // Cookie-larga saqlash
    try {
      Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'lax' });
      Cookies.set('user', JSON.stringify(userData), {
        expires: 7,
        path: '/',
        sameSite: 'lax',
      });
    } catch (error) {
      console.error('Error setting cookies:', error);
    }

    // Backup: localStorage-ga ham saqlash
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  const queryClient = useQueryClient();

  const logout = () => {
    setUser(null);
    setToken(null);

    // Cookie-larni tozalash
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user', { path: '/' });

    // localStorage-ni ham tozalash
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }

    queryClient.removeQueries({ queryKey: ['user'] });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
