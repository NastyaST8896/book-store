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
import { useSearchParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';

type CommentsType = {
  book: Book | null,
}

export const Comments = (props: CommentsType) => {
  const { book } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const socket = SocketManager.getSocket();

  const user = useAppSelector((state) => {
    return state.user.user;
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isloading, setIsLoading] = useState(false);

  const getBookComments = async () => {
    if (!book) {
      return
    }
    setIsLoading(true);
    const result = await getBookCommentsApi(book.id, { page: String(page) });

    if (!result.data.comments.length) {
      setHasMore(false);
    } else {
      setComments([...result.data.comments]);
      setPage((prev) => prev + 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBookComments();
  }, [book]);

  useEffect(() => {
    const commentId = searchParams.get('comment');
    if (!commentId) {
      return
    }

    const highliteComment = (comment: HTMLElement) => {
      document.querySelectorAll('.active').forEach((el) => {
        el.classList.remove('active');
      });

      comment.classList.add('active');

      setTimeout(() => {
        comment.classList.remove('active');
        const params = new URLSearchParams(searchParams);
        params.delete('comment');
        setSearchParams(params);

      }, 2000);
    };

    if (commentId) {
      const tryScroll = (attempt = 0) => {
        const comment = document.getElementById(commentId);
        if (comment) {
          comment?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          highliteComment(comment);
        } else if (attempt < 10) {
          setTimeout(() => tryScroll(attempt + 1), 100);
        }
      };

      tryScroll();
    }
  }, [searchParams]);

  const getMoreBookComments = () => {


    if (!isloading && hasMore) {
      getBookComments();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement, Element
  >) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
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
    setPage(1);
    getBookComments();
  });

  return (
    <StyledCommentContainerBox>
      <StyledCommentsBox>
        <Typography variant='h1'>Comments</Typography>

        <Box
          id="scrollableDiv"
          style={{
            height: 460,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}>
          <StyledInfiniteScroll
            dataLength={comments.length}
            next={getMoreBookComments}
            inverse={true}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {
              comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />
              })
            }
          </StyledInfiniteScroll>
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

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex; 
  flex-direction: column-reverse;

  &.infinite-scroll-component__outerdiv {
    max-width: 748px;
  };

  &.infinite-scroll-component {
    max-width: 748px;
  };
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