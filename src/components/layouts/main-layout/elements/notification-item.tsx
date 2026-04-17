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
  handleNotificationClose: () => void
}

export const NotificationItem = (props: NotificationItemType) => {
  const { comment, handleNotificationClose } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date();
  const createCommentDate = new Date(comment.date);
  const diffTime = today.getTime() - createCommentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const handleNotificationClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('comment');

    if (location.pathname !== `/product/${comment.bookId}`) {
      navigate(`/product/${comment.bookId}?${params.toString()}`);
    } else {
      params.append('comment', String(comment.id));
      setSearchParams(params);
    }

    handleNotificationClose();
  }

  return (
    <StyledListItem key={`comment-${comment.id}`} alignItems="flex-start" onClick={(handleNotificationClick)}>
      <ListItemAvatar>
        <Avatar alt={comment.name} src={comment.img} />
      </ListItemAvatar>
      <StyledListItemText
        primary={comment.name}
        secondary={
          <React.Fragment>
            {
              diffDays ?
                `Left a comment ${diffDays} days ago`
                :
                'Сomment added today'
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