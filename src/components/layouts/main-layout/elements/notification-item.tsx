import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material"
import type { BookCommentNotificationData } from "@utils/types"
import React, { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router"

type NotificationItemType = {
  comment: BookCommentNotificationData,
  handleNotificationClose: () => void,
  ref: React.RefObject<HTMLLIElement | null>,
  setComments: () => (id: number) => void,
}

export const NotificationItem = (props: NotificationItemType) => {
  const { comment, handleNotificationClose, ref, setComments } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isViewed, setIsViewed] = useState(comment.isRead);
  const [searchParams, setSearchParams] = useSearchParams();

  const createCommentDate = new Date(comment.date);

  const handleNotificationClick = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('comment');
    params.append('comment', String(comment.id));
    if (location.pathname !== `/product/${comment.bookId}`) {
      navigate(`/product/${comment.bookId}?${params.toString()}`);
    } else {
      setSearchParams(params);
    }

    handleNotificationClose();
  };

  const handleItemMouseOver = () => {
    if (!ref.current) {
      return;
    }

    console.log(ref.current);

    ref.current.classList.add('viewed');
    console.log(ref.current.id)
      const setIsReadComments = setComments();
      setIsReadComments(+ref.current.id);
  };

  return (
    <StyledListItem
      id={String(comment.id)}
      key={`comment-${comment.id}`}
      alignItems="flex-start"
      onClick={handleNotificationClick}
      onMouseOver={handleItemMouseOver}
      ref={ref}
    >
      <ListItemAvatar>
        <Avatar alt={comment.name} src={comment.img} />
      </ListItemAvatar>
      <StyledListItemText
        primary={comment.name}
        secondary={
          <React.Fragment>
            {
              new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "medium",
              }).format(createCommentDate)
            }
            <br />
            {comment.bookTitle}
            <br />
            {comment.text}
          </React.Fragment>
        }
      />
    </StyledListItem>
  )
}

const StyledListItem = styled(ListItem)(({ theme }) => `
  background-color: ${theme.palette.appColor.light};
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    background-color: ${theme.palette.appColor.green};
    width: 10px;
    height: 10px;
  }

  &.viewed {
    &::before {
      display: none;
    }
  }
`);

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;