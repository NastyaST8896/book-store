import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '@redux/hooks.ts';

type PrivateRouteProps = {
  children: React.JSX.Element;
  redirectTo: string;
  protectVariant: 'auth_required' | 'no_auth'
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAppSelector(state => state.auth);

  const location = useLocation();

  if (!auth.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
