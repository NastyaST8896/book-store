import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider } from '@mui/material';

import { MainLayout } from './ccomponents/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { theme } from './theme/theme.tsx';

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
