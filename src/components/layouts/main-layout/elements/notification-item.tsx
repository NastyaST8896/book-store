import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography
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
  }
}

export const NotificationItem = (props: NotificationItemType) => {
  const { comment } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date();
  const createCommentDate = new Date(comment.date);
  const diffTime = today.getTime() - createCommentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const handleNotificationClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('comment');
    params.append('comment', String(comment.id));

    if (location.pathname !== `/product/${comment.bookId}`) {
      navigate(`/product/${comment.bookId}?${params.toString()}`);
    }
  }

  return (
    <StyledListItem alignItems="flex-start" onClick={handleNotificationClick}>
      <ListItemAvatar>
        <Avatar alt={comment.name} src={comment.img} />
      </ListItemAvatar>
      <ListItemText
        primary={comment.name}
        secondary={
          <React.Fragment>
            <StyledNotificationTypography variant="body2">
              {
                diffDays ?
                  `Left a comment ${diffDays} days ago`
                  :
                  'Сomment added today'
              }
              <br />
              {comment.bookTitle}
            </StyledNotificationTypography>

            <StyledCommentTextBox>{comment.text}</StyledCommentTextBox>
          </React.Fragment>
        }
      />
    </StyledListItem>
  )
}

const StyledCommentTextBox = styled(Box)`
  text-overflow: ellipsis; 
  white-space: nowrap; 
  overflow: hidden;
`;

const StyledNotificationTypography = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.primary};
  display: inline;
`);

const StyledListItem = styled(ListItem)(({ theme }) => `
  background-color: ${theme.palette.appColor.light};
  border-radius: 10px;
`);