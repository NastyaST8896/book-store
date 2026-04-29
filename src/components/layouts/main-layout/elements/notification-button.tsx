import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { NotificationIcon } from '@common/icons/notification-icon.tsx';
import { StyledRoundButton } from '@common/styled-round-button.tsx';
import { useAppSelector } from '@redux/hooks.ts';
import type { BookCommentNotificationData } from '@utils/types.ts';
import SimpleBar from 'simplebar-react';

import { Box, type ButtonProps, List, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import { handleBookNewNotification } from '../../../../api/bookSocketEvents.ts'

import {
  getCommentBookNotificationApi,
  getCommentBooksNotificationsApi,
  patchNotificationIsReadApi
} from '../../../../api/notification-api.ts';

import { NotificationItem } from './notification-item.tsx';
import { StyledButton } from '@common/styled-button.tsx';

const options = {
  root: document.querySelector('.simpleBar'),
  rootMargin: '0px 0px 75px 0px',
  threshold: 0,
};

export const NotificationButton = () => {
  const auth = useAppSelector((state) => {
    return state.user;
  });

  const [
    anchorNotificationEl,
    setAnchorNotificationEl
  ] = React.useState<HTMLElement | null>(null);

  const [comments, setComments] = useState<BookCommentNotificationData[]>([]);
  const [targetComment, setTargetComment] = useState(0);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isShowNotViewed, setIsShowNotViewed] = useState(false);

  const main = useAppSelector((state) => {
    return state.main;
  })

  useEffect(() => {

    const getBookNotifications = async () => {
      if (!auth) {
        return;
      }

      if (targetComment === 0 && comments.length === 0) {
        const result = await getCommentBooksNotificationsApi(
          { notificationId: String(targetComment) }
        );
        const booksNotifications = result.data.booksNotifications;
        const pagination = result.meta?.pagination;

        if (
          booksNotifications.length && pagination &&
          (comments.length < pagination.totalAmount)
        ) {
          setComments(booksNotifications);
          setTotalCommentCount(pagination.notViewedAmount);
          const lastIndex = booksNotifications.length - 1;
          const lastNotificationId =
            booksNotifications[lastIndex].notificationId;
          if (lastNotificationId) {
            setTargetComment(lastNotificationId);
          }
        } else {
          setHasMore(false)
        }
      }

      return;
    }

    getBookNotifications();
  }, []);



  const target = document.querySelector('.target');

  const createObserver = () => {
    return new IntersectionObserver((entries, observer) => {
      let isVisible = false;

      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !isVisible) {

          const result = await getCommentBooksNotificationsApi(
            { notificationId: String(targetComment) }
          );
          const booksNotifications = result.data.booksNotifications;
          const pagination = result.meta?.pagination;

          if (
            pagination?.totalAmount &&
            (pagination.totalAmount > totalCommentCount)
          ) {
            setTotalCommentCount(pagination.notViewedAmount);
            setHasMore(true);
          }

          if (booksNotifications.length && hasMore) {
            setComments([...comments, ...booksNotifications]);

            if (
              (comments.length + booksNotifications.length) !==
              pagination?.totalAmount
            ) {
              const lastIndex = booksNotifications.length - 1;
              const lastNotificationId =
                booksNotifications[lastIndex].notificationId;

              if (lastNotificationId) {
                setTargetComment(lastNotificationId);
              }
            } else {
              setTargetComment(0);
              setHasMore(false);
            }


            observer.unobserve(entry.target)
          }

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
    const allViewedElements = document.querySelectorAll('.viewed');
    const changedComments = [...comments];

    allViewedElements.forEach((viewedElement) => {
      changedComments.map((comment) => {
        if (comment.id === +viewedElement.id && comment.isRead === false) {
          comment.isRead = true;
          setTotalCommentCount((prev) => prev - 1);
        }

        return comment;
      })
      setComments(changedComments);
    });

    const viewedNotificationId = changedComments
      .filter((comment) => {
        return comment.isRead === true;
      })
      .map((notification) => {
        if (notification.notificationId) {
          return notification.notificationId
        } else {
          return null
        }
      });


    const changedNotificationsIsRead = async () => {
      await patchNotificationIsReadApi(viewedNotificationId)
    }

    changedNotificationsIsRead();
  };

  useEffect(() => {
    if (!main.isConnected) {
      return;
    } else {
      const getNewNotification = handleBookNewNotification(
        async (args: BookCommentNotificationData) => {
          const result = await getCommentBookNotificationApi(
            { commentId: String(args.id) }
          );

          setComments(
            (prevComments) => [result.data.bookNotification, ...prevComments]
          );

          setTotalCommentCount(
            (prevTotalCommentCount) => prevTotalCommentCount + 1
          );
        }
      );

      return getNewNotification?.();
    }
  }, [main.isConnected]);

  const handleAllButtonClick = () => {
    setIsShowNotViewed(false);
  }

  const handleNotViewedButtonClick = () => {
    setIsShowNotViewed(true);
  }

  return (
    <StyledAuthLink to="#">
      <StyledRoundButton
        icon={<NotificationIcon fill="white" />}
        count={totalCommentCount}
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
        <Box sx={{ padding: '5px' }}>
          <StyledButton
            onClick={handleAllButtonClick}
          >
            All
          </StyledButton>
          <StyledButton
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
            {isShowNotViewed ? (
              comments.map((comment, index) => {
                if (!comment.isRead) {
                  return (
                    <React.Fragment key={comment.id}>
                      <NotificationItem

                        targetClassName={
                          (index === (comments.length - 1))
                            ? 'target'
                            : ''
                        }
                        handleNotificationClose={
                          handleNotificationClose
                        }
                        comment={comment}
                      />
                    </React.Fragment>
                  )
                }
                return;
              })
            ) : (
              comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <NotificationItem
                    targetClassName={
                      (index === (comments.length - 1))
                        ? 'target'
                        : ''
                    }
                    handleNotificationClose={
                      handleNotificationClose
                    }
                    comment={comment}
                  />
                </React.Fragment>
              ))
            )}
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