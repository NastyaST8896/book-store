import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoute } from '@common/private-rote.tsx';

import { ThemeProvider } from '@mui/material';

import { MainLayout } from './components/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { checkAuthUser } from './redux/thunks/auth-thunk.ts';
import { theme } from './theme/theme.tsx';

export const App = () => {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  useEffect(() => {
    dispatch(checkAuthUser());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <div>...Loading</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
