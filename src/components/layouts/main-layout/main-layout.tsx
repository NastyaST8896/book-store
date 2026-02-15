import { Outlet } from 'react-router';

import { Footer, Header } from './elements';

export const MainLayout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};