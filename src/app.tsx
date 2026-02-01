import { Route, Routes } from 'react-router';

import { MainLayout } from './ccomponents/layouts/main-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';

export const App = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
