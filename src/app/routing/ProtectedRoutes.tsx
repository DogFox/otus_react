import React, { type FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';

export const ProtectedRoute: FC = () => {
  const location = useLocation();
  const { initialized, token } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <div className="App-routeStatus">Initializing application...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export const AdminRoute: FC = () => {
  const { initialized, profile, token } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <div className="App-routeStatus">Initializing application...</div>;
  }

  return token && profile?.role === 'admin' ? <Outlet /> : <Navigate to="/products" replace />;
};

