import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getCartBooks } from '@redux/cart-books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import type { CommentType, Book, ProductBookType } from '@utils/types';

import {
  Box,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { getBookApi } from '../../api/book-api';

import { Comment, ProductBook, Recommendations } from './elements';
import { getRecommendedApi } from '../../api/recommended-api';
import { StyledButton } from '@common/styled-button';
import { socket } from '../../socket';
import { addBookCommentApi } from '../../api/comment-api';

export const Product = () => {
  const dispatch = useAppDispatch();

  const [commentText, setCommentText] = useState<string>('')

  const [comments, setComments] = useState<CommentType[]>([]);

  const cartBooks = useAppSelector((state) => {
    return state.cartBooks.books;
  });

  const user = useAppSelector((state) => {
    return state.user;
  });

  const { id } = useParams();

  const [book, setBook] = useState({
    id: 0,
    title: '',
    author: '',
    price: '',
    booksRating: '0.0',
    media: '',
    description: '',
    rating: 0,
    userRating: 0.0,
    count: 0,
    availableCount: 1,
  });


  const [recommended, setRecommended] = useState<Book[]>([]);

  useEffect(() => {
    if (id) {
      const getProductData = async () => {
        const result = await getBookApi({
          id,
          ...(user.user?.id && { userId: user.user?.id }),
        });

        if (result.book) {
          setBook(result.book);
        }

        return;
      };

      const getRecommendedBook = async () => {
        const result = await getRecommendedApi({ id });

        if (result.recommended.length > 4) {
          result.recommended.splice(4);
        }

        setRecommended(result.recommended);

        return;
      };

      getProductData();
      getRecommendedBook();

      dispatch(getCartBooks());
    }
  }, [dispatch, id]);

  const mergedRecommendedBooks = useMemo(() => {
    return recommended.map((book) => {
      const cartBook = cartBooks.find((bookInCart) => {
        return bookInCart.id === book.id;
      });

      if (cartBook) {
        return { ...book, count: cartBook.count };
      }

      return book;
    });
  }, [cartBooks, recommended]);

  const mergedBook = useMemo(() => {
    const cartBook = cartBooks.find((bookInCart) => {
      return bookInCart.id === book.id;
    });

    if (cartBook) {
      return { ...book, count: cartBook.count };
    }

    if (!cartBook && book.count > 0) {
      return { ...book, count: 0 };
    }

    return book;
  }, [book, cartBooks]);

  const handleBookChange = (newBook: ProductBookType) => {
    setBook(newBook);
  };

  const handleInputChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement, Element
  >) => {
    e.preventDefault();
    setCommentText(e.target.value);
  }

  const handleCommentButtonCklick = (e: React.MouseEvent<
    HTMLButtonElement, MouseEvent
  >) => {
    e.preventDefault();
    if (commentText !== '') {
      const addBookComment = async () => {
        await addBookCommentApi(book.id, commentText);
      }
      addBookComment();
      setCommentText('');

      socket.emit('new comment', commentText);
    }
  };

  socket.on('new comment', () => {

    const getBookComments = async () => {
      const result = await getBookCommentsApi(book.id);

      if (result.comments) {
        setComments(result.comments);
      }
    };

    getBookComments();
  })

  return (
    <main>
      <Container maxWidth="md">

        <ProductBook
          book={mergedBook}
          onChange={handleBookChange}
        />

        <StyledCommentContainerBox>
          <StyledCommentsBox>
            <Typography variant='h1'>Comments</Typography>

            <Box>
              {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />
              })}
            </Box>
          </StyledCommentsBox>

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
            />

            <StyledButton
              sx={{ maxWidth: '276px', width: '100%' }}
              onClick={handleCommentButtonCklick}
            >
              Post a comment
            </StyledButton>
          </StyledCommentInputBox>
        </StyledCommentContainerBox>

        <Recommendations recommendedBooks={mergedRecommendedBooks} />

      </Container>
    </main >
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
