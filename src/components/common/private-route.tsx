import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@redux/hooks.ts';

type PrivateRouteProps = {
  redirectTo: string;
  protectVariant: 'auth_required' | 'no_auth';
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ protectVariant, redirectTo }) => {
  const auth = useAppSelector(state => state.user);

  const location = useLocation();

  if (protectVariant === 'auth_required' && !auth.user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (protectVariant === 'no_auth' && auth.user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
