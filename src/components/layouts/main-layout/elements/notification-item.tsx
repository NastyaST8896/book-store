import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material"
import type { BookCommentNotificationData } from "@utils/types"
import React, { useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router"

type NotificationItemType = {
  comment: BookCommentNotificationData,
  handleNotificationClose: () => void,
  setComments: () => (id: number) => void,
  lastCommentId: number;
  setElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>,

}

export const NotificationItem = (props: NotificationItemType) => {
  const {
    comment,
    handleNotificationClose,
    setComments,
    lastCommentId,
    setElement
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const commentRef = useRef<HTMLLIElement | null>(null);
  const viewedRef = useRef(false);

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
    if (!commentRef.current) {
      return;
    }

    commentRef.current.classList.add('viewed');

    if (!viewedRef.current) {
      const setIsReadComments = setComments();
      setIsReadComments(+commentRef.current.id);

      viewedRef.current = true;
    }
  };

  return (
    <StyledListItem
      id={String(comment.id)}
      key={`comment-${comment.id}`}
      alignItems="flex-start"
      onClick={handleNotificationClick}
      onMouseOver={handleItemMouseOver}
      className={comment.isRead ? 'viewed' : ''}
      ref={(el) => {
        commentRef.current = el;

        comment.isRead ? viewedRef.current = true : viewedRef.current = false;

        if (lastCommentId === comment.id) {
          setElement(el);
        }
      }}
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