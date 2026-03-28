import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { getCartBooks } from '@redux/cart-books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import type { Book, ProductBookType } from '@utils/types';

import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { getBookApi } from '../../api/book-api';

import { ProductBook } from './elements';

export const Product = () => {
  const dispatch = useAppDispatch();

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
        setRecommended(result.recommended);

        return;
      };

      getProductData();

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

    if(!cartBook && book.count > 0) {
      return { ...book, count: 0 };
    }

    return book;
  }, [book, cartBooks]);

  const handleBookChange = (newBook: ProductBookType) => {
    setBook(newBook);
  };

  return (
    <main>
      <Container maxWidth="md">

        <ProductBook
          book={mergedBook}
          onChange={handleBookChange}
        />


        <StyledBox>
          <Typography variant="h1">Recommendations</Typography>

          <Grid
            container
            columnSpacing="20px"
          >
            {mergedRecommendedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </Grid>
        </StyledBox>

      </Container>
    </main>
  );
};

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0 80px 0;
`;