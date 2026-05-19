import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { NotificationIcon } from '@common/icons/notification-icon.tsx';
import { StyledRoundButton } from '@common/styled-round-button.tsx';
import { useAppSelector } from '@redux/hooks.ts';
import type { BookCommentNotificationData } from '@utils/types.ts';
import SimpleBar from 'simplebar-react';

import { Box, List, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import { handleBookNewNotification } from '@api/bookSocketEvents.ts'

import {
  getCommentBooksNotificationsApi,
  getCommentBookNotificationApi,
  getNotViewedBookCommentNotificationsApi,
} from '@api/notification-api.ts';

import { NotificationItem } from './notification-item.tsx';
import { StyledButton } from '@common/styled-button.tsx';
import { useDebounce, useIntersectionObserver } from '@utils/hooks.ts';
import {
  changeNotificationStatus,
  getBookNotifications
} from '@api/api-callers.ts';

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
  const [firstNotViewedCommentsCount, setFirstNotViewedCommentCount] = useState(0);
  const debouncedCommentCount = useDebounce(notViewedCommentsCount, 500);
  const [isAllComments, setIsAllComments] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const notificationButtonRef = useRef(null);
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

    setFirstNotViewedCommentCount(notViewedCommentsCount);
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
          setNotViewedComments(
            (prevNotViewedComments) => [
              result.data.bookNotification,
              ...prevNotViewedComments
            ]
          )
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

  useEffect(() => {
    if(debouncedCommentCount !== firstNotViewedCommentsCount) {
      changeNotificationStatus({ notViewedComments });
    }
  }, [debouncedCommentCount])

  const setIsReadForComments = (id: number) => {

    const newComments = [...comments];
    const newNotViewedComments = [...notViewedComments];

    newComments.map((comment) => {
      if (comment.id === id) {
        comment.isRead = true;
        setNotViewedCommentCount(
          (prevNotViewedCommentCount) => prevNotViewedCommentCount - 1
        )
      }

      return comment;
    })

    newNotViewedComments.map((comment) => {
      if (comment.id === id) {
        comment.isRead = true;
      }

      return comment;
    })

    setComments(newComments);
    setNotViewedComments(newNotViewedComments);
  }

  const handleNotViewedButtonClick = async () => {

    const newNotViewedComments = notViewedComments.filter((comment) => {
      return !comment.isRead
    })
    setNotViewedComments(newNotViewedComments)
    setIsAllComments(false)
  }

  return (
    <StyledAuthLink to="#">
      <StyledRoundButton
        ref={notificationButtonRef}
        icon={<NotificationIcon fill="white" />}
        count={notViewedCommentsCount}
        onClick={() => {
          setIsOpen(true);
          setIsAllComments(true);
        }}
      />
      <StyledPriceRangePopover
        open={isOpen}
        anchorEl={() => notificationButtonRef.current}
        onClose={async () => {
          setIsOpen(false);
        }}
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
        <Box sx={{ padding: '15px 15px 0 15px' }}>
          <StyledButton
            className={isAllComments ? 'active' : ''}
            onClick={() => {
              setIsAllComments(true);
              return;
            }}
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
            style={{ maxHeight: 490, padding: '0 15px' }}
          >
            {isAllComments ? (
              comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <NotificationItem
                    handleNotificationClose={() => setIsOpen(false)}
                    comment={comment}
                    setComments={() => setIsReadForComments}
                    lastCommentId={comments[comments.length - 1].id}
                    setElement={setElement}
                  />
                </React.Fragment>
              ))
            ) : (
              notViewedComments.map((comment) => (
                <React.Fragment key={`${comment.id}-notViewed`}>
                  <NotificationItem
                    handleNotificationClose={() => setIsOpen(false)}
                    comment={comment}
                    setComments={() => setIsReadForComments}
                    lastCommentId={
                      notViewedComments[notViewedComments.length - 1].id
                    }
                    setElement={setElement}
                  />
                </React.Fragment>
              )))
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

    & .MuiList-root {
      padding: 15px 0;
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
      width: 100%;
    }
`);