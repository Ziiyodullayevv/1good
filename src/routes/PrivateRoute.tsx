// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // yoki <Loading /> komponent

  return user ? <Outlet /> : <Navigate to='/' replace />;
};

export default PrivateRoute;
