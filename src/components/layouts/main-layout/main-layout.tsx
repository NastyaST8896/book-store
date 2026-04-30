import { Link, Outlet } from 'react-router';

import { Footer, Header } from './elements';
import { ToastContainer, toast, type ToastContentProps } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';
import { styled } from '@mui/material';
import { connectToSocket, disconnectFromSocket } from '@redux/main/thunk';
import { handleNewCommentToast } from '../../../api/bookSocketEvents';

export const MainLayout = () => {

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => {
    return state.user.user?.id;
  });

  const isConnected = useAppSelector((state) => {
    return state.main.isConnected;
  })

  type Props = Partial<ToastContentProps> & {
    book: { title: string, id: number };
  };

  function Msg({ book }: Props) {
    return (
      <StyledLink to={`/product/${book.id}`}>
        <p>
          New comment added to
          <br />
          {book.title}
        </p>
      </StyledLink>
    );
  }

  useEffect(() => {
    if (userId) {
      dispatch(connectToSocket(+userId));

      const getNewCommentToast = () => handleNewCommentToast(
        (book: { title: string, id: number }) => {
          toast(<Msg book={book} />);
        });

      const disconnectSocket = () => {
        if (isConnected) {
          dispatch(disconnectFromSocket());
        }
      }

      const unsubscribe = getNewCommentToast();

      return (
        disconnectSocket?.(),
        unsubscribe
      )
    };
  }, [userId, dispatch])

  return (
    <>
      <StyledToastContainer
        position="top-right"
      />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const StyledToastContainer = styled(ToastContainer)(({ theme }) => `
  .Toastify__toast-theme--light {
    background-color: ${theme.palette.appColor.light};
    color: ${theme.palette.appColor.darkBlue}
  }
`);

const StyledLink = styled(Link)`
  all: unset;
`;