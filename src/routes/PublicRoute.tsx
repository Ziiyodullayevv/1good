// src/components/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return !user ? <Outlet /> : <Navigate to='/talent' replace />;
};

export default PublicRoute;
