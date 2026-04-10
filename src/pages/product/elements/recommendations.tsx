import { BookCard } from '@common/book-card';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import type { Book } from '@utils/types';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getCartBooks } from '@redux/cart-books/thunk';
import { useAppDispatch } from '@redux/hooks';
import { getRecommendedApi } from '../../../api/recommended-api';
import type { CartBookType } from '@redux/cart-books/slice';

type RecommendationsType = {
  cartBooks: CartBookType[];
}

export const Recommendations = (props: RecommendationsType) => {
  const { cartBooks } = props

  const dispatch = useAppDispatch();

  const [recommended, setRecommended] = useState<Book[]>([]);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabletFrom = useMediaQuery(theme.breakpoints.down('md'));
  const tabletTo = useMediaQuery(theme.breakpoints.up('sm'));

  const { id } = useParams();

  let limitSize: number = 0;

  if (mobile) {
    limitSize = 2;
  } else if (tabletTo && tabletFrom) {
    limitSize = 3;
  }

  useEffect(() => {
    if (!id) {
      return
    }

    const getRecommendedBook = async () => {
      const result = await getRecommendedApi({ id });

      if (result.recommended.length > 4) {
        result.recommended.splice(4);
      }

      setRecommended(result.recommended);

      return;
    };

    getRecommendedBook();

    dispatch(getCartBooks());
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

  return (
    <StyledBox>
      <Typography variant="h1">Recommendations</Typography>

      <Grid
        container
        columnSpacing="20px"
      >
        {(limitSize !== 0) ? (
          mergedRecommendedBooks
            .filter((_, index) => index < limitSize)
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
        ) : (
          mergedRecommendedBooks
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            )))}
      </Grid>
    </StyledBox>
  )
};

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0 80px 0;
`;