import { Route, Routes } from 'react-router';

import { MainLayout } from './ccomponents/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';

export const App = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
