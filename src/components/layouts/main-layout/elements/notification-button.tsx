import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { NotificationIcon } from '@common/icons/notification-icon.tsx';
import { StyledRoundButton } from '@common/styled-round-button.tsx';
import { useAppSelector } from '@redux/hooks.ts';
import type { BookCommentNotificationData } from '@utils/types.ts';
import SimpleBar from 'simplebar-react';

import { Box, type ButtonProps, List, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import { handleBookNewNotification } from '@api/bookSocketEvents.ts'

import {
  getCommentBooksNotificationsApi,
  getCommentBookNotificationApi,
  getNotViewedBookCommentNotificationsApi,
  patchNotificationIsReadApi
} from '@api/notification-api.ts';

import { NotificationItem } from './notification-item.tsx';
import { StyledButton } from '@common/styled-button.tsx';
import { useIntersectionObserver } from '@utils/hooks.ts';
import { getBookNotifications } from '@api/api-callers.ts';

export const NotificationButton = () => {

  const auth = useAppSelector((state) => {
    return state.user;
  });
  const main = useAppSelector((state) => {
    return state.main;
  })
  const [comments, setComments] = useState<BookCommentNotificationData[]>([]);
  const [
    notViewedComments,
    setNotViewedComments
  ] = useState<BookCommentNotificationData[]>([]);

  const [notViewedCommentsCount, setNotViewedCommentCount] = useState(0);
  const [
    anchorNotificationEl,
    setAnchorNotificationEl
  ] = useState<HTMLElement | null>(null);
  const [isAllComments, setIsAllComments] = useState(true);

  const popoverRef = useRef(null);

  const [isIntersecting, setElement] = useIntersectionObserver({
    root: popoverRef.current,
    rootMargin: '10px',
    threshold: 0
  })

  useEffect(() => {
    if (!auth) {
      return;
    }

    getBookNotifications({
      comments,
      setComments,
      setNotViewedCommentCount,
      notificationsApi: getCommentBooksNotificationsApi
    });

    getBookNotifications({
      comments: notViewedComments,
      setComments: setNotViewedComments,
      setNotViewedCommentCount,
      notificationsApi: getNotViewedBookCommentNotificationsApi
    });
  }, []);

  useEffect(() => {
    if (!main.isConnected) {
      return;
    } else {
      const getNewNotification = () => handleBookNewNotification(
        async (args: BookCommentNotificationData) => {
          const result = await getCommentBookNotificationApi(
            { commentId: String(args.id) }
          );

          setComments(
            (prevComments) => [result.data.bookNotification, ...prevComments]
          );
          setNotViewedCommentCount(
            (prevNotViewedCommentCount) => prevNotViewedCommentCount + 1
          );
        }
      );

      const unsubscribe = getNewNotification?.();

      return unsubscribe;
    }
  }, [main.isConnected]);

  useEffect(() => {
    if (!auth && !isIntersecting) {
      return;
    }

    getBookNotifications({
      comments,
      setComments,
      setNotViewedCommentCount,
      notificationsApi: getCommentBooksNotificationsApi
    });

    getBookNotifications({
      comments: notViewedComments,
      setComments: setNotViewedComments,
      setNotViewedCommentCount,
      notificationsApi: getNotViewedBookCommentNotificationsApi
    });
  }, [isIntersecting])

  const handleNotificationButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorNotificationEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorNotificationEl(null);
  };

  const setIsReadForComments = (id: number) => {
    const newComments = [...comments];
    newComments.map((comment) => {
      if (comment.id === id) {
        comment.isRead = true;
      }

      return comment;
    })

    setComments(newComments);
  }

  return (
    <StyledAuthLink to="#">
      <StyledRoundButton
        icon={<NotificationIcon fill="white" />}
        count={notViewedCommentsCount}
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
        ref={popoverRef}
      >
        <Box sx={{ padding: '5px' }}>
          <StyledButton
            className={isAllComments ? 'active' : ''}
            onClick={() => setIsAllComments(true)}
          >
            All
          </StyledButton>
          <StyledButton
          className={isAllComments ? '' : 'active'} 
          onClick={handleNotViewedButtonClick}
          >
            Not viewed
          </StyledButton>
        </Box>

        <StyledList>
          <SimpleBar
            id="simpleBar"
            style={{ maxHeight: 490 }}
          >
            {
              comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <NotificationItem
                    handleNotificationClose={
                      handleNotificationClose
                    }
                    comment={comment}
                    setComments={() => setIsReadForComments}
                    lastCommentId={comments[comments.length - 1].id}
                    setElement={setElement}
                  />
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