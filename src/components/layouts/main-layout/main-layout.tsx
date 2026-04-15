import { Link, Outlet } from 'react-router';

import { Footer, Header } from './elements';
import { ToastContainer, toast, type ToastContentProps } from 'react-toastify';
import { SocketManager} from '../../../socket';
import { useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';
import { styled } from '@mui/material';

export const MainLayout = () => {

  const userId = useAppSelector((state) => {
    return state.user.user?.id;
  });

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
      SocketManager.initSocket(+userId);
      const socket = SocketManager.getSocket();

      socket?.on('connect', () => {
        console.log('Connected');

        socket?.on("new comment toast", (book) => {
          toast(<Msg book={book} />);
        })

        socket.on('disconnect', () => {
          console.log('Disconnected');
          socket?.off("new comment toast")
        })
      });
    };
  }, [userId])

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