import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { StyledButton } from '@common/styled-button';
import { useAppSelector } from '@redux/hooks';
import type { Book, CommentType } from '@utils/types';

import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  addBookCommentApi,
  getBookCommentsApi
} from '../../../../api/comment-api';

import { Comment } from './comment';
import { handleNewComment } from '../../../../api/bookSocketEvents';

type CommentsType = {
  book: Book | null,
};

export const Comments = (props: CommentsType) => {
  const { book } = props;

  const main = useAppSelector((state) => {
    return state.main;
  })

  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAppSelector((state) => {
    return state.user.user;
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getBookComments = useCallback(async (resetPage = false) => {
    if (!book || isLoading) {
      return;
    }
    setIsLoading(true);

    const currentPage = resetPage ? 1 : page;
    const result = await getBookCommentsApi(book.id, { page: String(currentPage) });

    if (
      result.meta && (
        result.meta?.pagination.currentPage > result.meta?.pagination.totalPages
      )
    ) {
      setHasMore(false);
    } else {
      if (resetPage) {
        setComments([...result.data.comments]);
        setPage(2);
      } else {
        setComments([...result.data.comments]);
        setPage((prev) => prev + 1);
      }
    }
    setIsLoading(false);
  }, [book, page, isLoading]);

  useEffect(() => {
    if (isInitialLoad && book) {
      getBookComments(true);
      setIsInitialLoad(false);
    }
  }, [book, getBookComments, isInitialLoad]);

  useEffect(() => {
    const commentId = searchParams.get('comment');

    if (!commentId) {
      return;
    }

    const highlightComment = (comment: HTMLElement) => {
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
          highlightComment(comment);
        } else if (attempt < 10) {
          setTimeout(() => tryScroll(attempt + 1), 100);
        }
      };

      tryScroll();
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!main.isConnected) {
      return;
    }
    const newComment = () => handleNewComment(() => {
      setPage(1);
      getBookComments(true);
      return;
    });

    const unsubscribe = newComment?.();

    return unsubscribe;

  }, [main.isConnected, getBookComments]);

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
        };

        addBookComment();
        setCommentText('');
      }
    }
  };

  const handleCommentButtonClick = (e: React.MouseEvent<
    HTMLButtonElement, MouseEvent
  >) => {
    e.preventDefault();
    if (commentText !== '' && book) {
      const addBookComment = async () => {
        await addBookCommentApi(book.id, commentText);
      };

      addBookComment();
      setCommentText('');
    }
  };

  const handleMoreCommentsButtonClick = () => {
    if (!isLoading && hasMore) {
      getBookComments(false);
    }
  };

  return (
    <StyledCommentContainerBox>
      <StyledCommentsBox>
        <Typography variant="h1">Comments</Typography>

        <StyledMoreCommentsButton
          onClick={handleMoreCommentsButtonClick}
          disabled={hasMore ? false : true}
        >
          {hasMore && !isLoading && 'View previous comments'}
          {isLoading && 'Loading...'}
          {!hasMore && !isLoading && 'No more comments'}
        </StyledMoreCommentsButton>

        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          maxWidth: '748px',
          width: '100%'
        }}>
          {
            comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })
          }
        </div>

      </StyledCommentsBox>

      {
        user && (
          <StyledCommentInputBox
            width={{ lg: '50%', sm: '75%', xs: '100%' }}
          >
            <StyledTextField
              label=""
              multiline
              rows={4}
              placeholder="Share a comment"
              value={commentText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <StyledButton
              sx={{ maxWidth: '276px', width: '100%' }}
              onClick={handleCommentButtonClick}
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
`;

const StyledMoreCommentsButton = styled(Button)`
  text-transform: none;
  max-width: 738px;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  background-color: #344966;
  color: #FFFFFF;
  font-size: 20px;

  &:disabled {
    background-color: #FFFFFF;
    border: 1px solid #0D1821;
    color: #0D1821;
  }
`;