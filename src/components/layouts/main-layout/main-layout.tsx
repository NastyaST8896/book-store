import { Outlet } from 'react-router';

import { Footer } from './elems/footer';
import { Header } from './elems/header';
import { useEffect } from 'react';
import { initialAuth } from '../../../redux/slices/auth-slice'
import { useAppRootDispatch } from '../../../redux/hooks';

export const MainLayout = () => {
  const dispatch = useAppRootDispatch();

    useEffect(() => {
      dispatch(initialAuth());
  },[dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};