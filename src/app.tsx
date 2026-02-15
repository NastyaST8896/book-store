import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoute } from '@common/private-route.tsx';

import { MainLayout } from './components/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { useAppDispatch } from './redux/hooks.ts';
import { checkAuthUser } from './redux/thunks/auth-thunk.ts';
import { IN_APP_ROUTES } from './utils/routes.ts';

export const App = () => {
  const dispatch = useAppDispatch();

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(checkAuthUser())
      .finally(() => setIsAuthChecked(true));
  }, [dispatch]);

  if (!isAuthChecked) {
    return <div>...Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route element={<PrivateRoute redirectTo={IN_APP_ROUTES.home.path} protectVariant="no_auth" />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute redirectTo={IN_APP_ROUTES.login.path} protectVariant="auth_required" />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
