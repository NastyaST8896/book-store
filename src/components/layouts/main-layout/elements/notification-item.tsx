import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material"
import React from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router"

type NotificationItemType = {
  comment: {
    id: number,
    name: string,
    date: string,
    bookTitle: string,
    text: string,
    img: string,
    bookId: number,
  },
  handleNotificationClose: () => void,
  targetClassName: string,
}

export const NotificationItem = (props: NotificationItemType) => {
  const { comment, handleNotificationClose, targetClassName } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  }

  return (
    <StyledListItem
      className={targetClassName}
      key={`comment-${comment.id}`}
      alignItems="flex-start"
      onClick={(handleNotificationClick)}
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
`);

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;