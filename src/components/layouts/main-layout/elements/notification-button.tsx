import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { NotificationIcon } from '@common/icons/notification-icon.tsx';
import { StyledRoundButton } from '@common/styled-round-button.tsx';
import { useAppSelector } from '@redux/hooks.ts';
import type { BookCommentNotificationData } from '@utils/types.ts';
import SimpleBar from 'simplebar-react';

import { Box, type ButtonProps, List, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  getCommentBooksNotificationsApi
} from '../../../../api/notification-api.ts';
import { SocketManager } from '../../../../socket.ts';

import { NotificationItem } from './notification-item.tsx';

export const NotificationButton = () => {
  const auth = useAppSelector((state) => {
    return state.user;
  });

  const socket = SocketManager.getSocket();

  const [
    anchorNotificationEl,
    setAnchorNotificationEl
  ] = React.useState<HTMLElement | null>(null);

  const [comments, setComments] = useState<BookCommentNotificationData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef<boolean>(false);


  const getBookNotifications = useCallback(async () => {
    if (!auth) {
      return;
    }

    setIsLoading(true);

    const result = await getCommentBooksNotificationsApi(
      { page: String(page) }
    );

    if (
      result.meta && (
        result.meta?.pagination.currentPage > result.meta?.pagination.totalPages
      )
    ) {
      setHasMore(false);

      return;
    }

    if (result) {
      setComments(result.data.booksNotifications);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  },[auth, page]);

  useEffect(() => {
    if(!hasFetched.current) {
      getBookNotifications();
      hasFetched.current = true;
    }
  }, [getBookNotifications]);

  const options = {
    root: document.querySelector('.simpleBar'),
    rootMargin: '0px 0px 75px 0px',
    threshold: 0,
  };

  const target = document.querySelector('.target');

  const createObserver = () => {
    return new IntersectionObserver((entries) => {
      let isVisible = false;

      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible && !isLoading && hasMore) {
          getBookNotifications();
          isVisible = true;
        }

        if (!entry.isIntersecting && isVisible) {
          isVisible = false;
        }
      });
    }, options);
  };

  const observer = createObserver();

  if (target) {
    observer.observe(target);
  }

  const handleNotificationButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorNotificationEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorNotificationEl(null);
  };

  useEffect(() => {
    if(!socket) {
      return;
    }

    const handleNewNotifications = () => {
      setPage(1);
      getBookNotifications();
    };

    socket.on('book comment notification', handleNewNotifications);

    return () => {
      socket.off('book comment notification', handleNewNotifications);
    };
  }, [socket, getBookNotifications]);

  // const getMoreBooksCommentsNotifications = () => {
  //   if (!isLoading && hasMore) {
  //     getBookNotifications();
  //   }
  // }

  return (
    <StyledAuthLink to="#">
      <StyledRoundButton
        icon={<NotificationIcon fill="white" />}
        count={comments.length}
        onClick={handleNotificationButtonClick}
      />
      <StyledPriceRangePopover
        open={Boolean(anchorNotificationEl)}
        anchorEl={anchorNotificationEl}
        onClose={handleNotificationClose}
        anchorOrigin={
          { horizontal: 'left', vertical: 'bottom' }
        }
        transformOrigin={
          {
            vertical: 'top',
            horizontal: 'center'
          }
        }
        disableScrollLock={true}
        marginThreshold={null}
      >
        <StyledList>
          <SimpleBar
            id="simpleBar"
            style={{ maxHeight: 400 }}
          >
            {
              comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <NotificationItem
                    targetClassName={
                      (index === (comments.length - 2))
                        ? 'target'
                        : ''
                    }
                    handleNotificationClose={
                      handleNotificationClose
                    }
                    comment={comment}
                  />

                  {
                    index !== (comments.length - 1)
                    &&
                    <StyledLineBox />
                  }
                </React.Fragment>
              ))
            }
          </SimpleBar>
        </StyledList>
      </StyledPriceRangePopover>
    </StyledAuthLink>
  );
};

const StyledPriceRangePopover = styled(Popover)(({ theme }) => `
  & .MuiPaper-root {
    background-color: ${theme.palette.appColor.darkBlue};
    margin-top: 16px;
    border-radius: 16px;
    overflow: visible;
    box-shadow: none;
    max-width: 400px;
    width: 100%;
    padding: 0 8px;
    
      & .MuiCheckbox-root {
        padding: 5px 15px;
      }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 165px;
      width: 20px;
      height: 20px;
      background: ${theme.palette.appColor.darkBlue};
      transform: translateY(-50%) rotate(45deg);
      z-index: 0;
    }
  }
  
  & .MuiButtonBase-root {
      padding: 15px 15px 10px 15px;
      
      & .MuiListItemIcon-root {
        display: block;
        max-width: 34px;
        min-width: auto;
      }
      
      & .MuiListItemText-root {
      display: flex;
      justify-content: start;
      color: ${theme.palette.appColor.darkBlue};
      
      & .MuiTypography-root {
       font-weight: 500;
       font-size: 16px;
      }
    }
  }
`);

const StyledAuthLink = styled(Link)`
  width: 48px;

  @media (max-width: 600px) {
    width: 32px;
  }
`;

const StyledList = styled(List)(({ theme }) => `
  &. MuiList-root {
    width: 100%;
    max-width: 360px;
    background-color: ${theme.palette.appColor.light};
  }

  & .MuiListItem-root {
      width: 97%;
    }
`);

const StyledLineBox = styled(Box)(({ theme }) => `
  height: 1px;
  width: 100%;
  background-color: ${theme.palette.appColor.lightGrey};
  margin: 10px 0;
`);