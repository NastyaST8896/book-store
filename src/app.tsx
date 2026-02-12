import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider } from '@mui/material';

import { MainLayout } from './components/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { theme } from './theme/theme.tsx';
import { useEffect } from 'react';
import { checkAuthUser } from './redux/thunks/auth-thunk.ts';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { PrivateRoute } from './components/private-rote.tsx'

export const App = () => {
  const dispatch = useAppDispatch();

  // const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(checkAuthUser());
  }, [dispatch]);

  // if (loading) {
  //   return <div>...loading</div>;
  // }

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

export default App;
