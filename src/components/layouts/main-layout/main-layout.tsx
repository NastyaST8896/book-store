import { Outlet } from 'react-router';

import { Footer } from './elems/footer';
import { Header } from './elems/header';

export const MainLayout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};