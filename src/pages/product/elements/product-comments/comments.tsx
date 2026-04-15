import { StyledButton } from '@common/styled-button';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Book, CommentType } from '@utils/types';
import {
  addBookCommentApi,
  getBookCommentsApi
} from '../../../../api/comment-api';
import { useEffect, useState } from 'react';
import { SocketManager } from '../../../../socket';
import { Comment } from './comment';
import { useAppSelector } from '@redux/hooks';

type CommentsType = {
  book: Book | null,
}

export const Comments = (props: CommentsType) => {
  const { book } = props;

  const socket = SocketManager.getSocket();

  const user = useAppSelector((state) => {
    return state.user.user;
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState<string>('');

  useEffect(() => {
    if (!book) {
      return
    }

    const getBookComments = async () => {
      const result = await getBookCommentsApi(book.id);

      if (result.comments) {
        setComments(result.comments);
      }
    };

    getBookComments();


  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement, Element
  >) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLDivElement>) => {
   if(e.code === 'Enter') {
    if (commentText !== '' && book) {
      const addBookComment = async () => {
        await addBookCommentApi(book.id, commentText);
      }
      addBookComment();
      setCommentText('');
    }
   }
  } 

  const handleCommentButtonCklick = (e: React.MouseEvent<
    HTMLButtonElement, MouseEvent
  >) => {
    e.preventDefault();
    if (commentText !== '' && book) {
      const addBookComment = async () => {
        await addBookCommentApi(book.id, commentText);
      }
      addBookComment();
      setCommentText('');
    }
  };

  socket?.on("new comment", () => {
    if (!book) {
      return
    };

    const getBookComments = async () => {
      const result = await getBookCommentsApi(book.id);
      if (result.comments) {
        setComments(result.comments);
      }

      return;
    };

    getBookComments();
  });

  return (
    <StyledCommentContainerBox>
      <StyledCommentsBox>
        <Typography variant='h1'>Comments</Typography>

        <Box>
          {comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </Box>
      </StyledCommentsBox>

      {
        user && (
          <StyledCommentInputBox
            width={{ lg: '50%', sm: '75%', xs: '100%' }}
          >
            <StyledTextField
              label=''
              multiline
              rows={4}
              placeholder="Share a comment"
              value={commentText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <StyledButton
              sx={{ maxWidth: '276px', width: '100%' }}
              onClick={handleCommentButtonCklick}
            >
              Post a comment
            </StyledButton>
          </StyledCommentInputBox>
        )
      }

    </StyledCommentContainerBox>
  );
};

const StyledCommentsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StyledCommentInputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 738px;
  width: 100%;
`;

const StyledTextField = styled(TextField)(({ theme }) => `
  background-color: ${theme.palette.appColor.light};
  border-radius: 16px;

  & .MuiOutlinedInput-input {
    color: ${theme.palette.appColor.darkBlue};
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`);

const StyledCommentContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 60px 0;

  @media(max-width: 1000px) {

  }
`;