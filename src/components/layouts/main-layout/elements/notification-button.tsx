import React, { useEffect, useRef, useState } from 'react';
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

export const NotificationButton = () => {

  const auth = useAppSelector((state) => {
    return state.user;
  });

  const main = useAppSelector((state) => {
    return state.main;
  })
  // Af7dK?c!eJ8u*UV
  const [
    anchorNotificationEl,
    setAnchorNotificationEl
  ] = React.useState<HTMLElement | null>(null);

  const [comments, setComments] = useState<BookCommentNotificationData[]>([]);
  const [notViewedCommentsCount, setNotViewedCommentCount] = useState(0);
  const commentRef = useRef(null);

  useEffect(() => {

    const getBookNotifications = async () => {
      if (!auth) {
        return;
      }

      if (comments.length === 0) {
        const result = await getCommentBooksNotificationsApi(
          { notificationId: String(0) }
        );
        const booksNotifications = result.data.booksNotifications;
        const pagination = result.meta?.pagination;

        if (
          booksNotifications.length && pagination &&
          (comments.length < pagination.totalAmount)
        ) {
          setComments(booksNotifications);
          setNotViewedCommentCount(pagination.notViewedAmount);
        }
      }

      return;
    }

    getBookNotifications();
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
        }
      );

      const unsubscribe = getNewNotification?.();

      return unsubscribe;
    }
  }, [main.isConnected]);

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
      >
        <Box sx={{ padding: '5px' }}>
          <StyledButton>
            All
          </StyledButton>
          <StyledButton>
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
                    ref={commentRef}
                    setComments={() => setIsReadForComments}
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