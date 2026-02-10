import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider } from '@mui/material';

import { MainLayout } from './components/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { theme } from './theme/theme.tsx';
import { useEffect } from 'react';
import { initialAuth } from './redux/slices/auth-slice'
import { useAppRootDispatch } from './redux/hooks';
import { getUser } from 'redux/thunks/auth-thunk.ts';

export const App = () => {
   const dispatch = useAppRootDispatch();

   useEffect(() => {
         dispatch(getUser({ accessToken: JSON.stringify() }))
              .unwrap()
    },[dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
