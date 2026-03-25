import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { useAppSelector } from '@redux/hooks';
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

  const user = useAppSelector((state) => {
    return state.user;
  });

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
  });

  const [recommended, setRecommended] = useState<Book[]>([]);

  const { id } = useParams();

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
        setRecommended(result.recomended);
      }

      getProductData()
    }
  }, [id]);

  const handleBookChange = (newBook: ProductBookType) => {
    setBook(newBook)
  }

  return (
    <main>
      <Container maxWidth="md">

        <ProductBook book={book} onChange={handleBookChange} />


        <StyledBox>
          <Typography variant="h1">Recommendations</Typography>

          <Grid
            container
            columnSpacing="20px"
          >
            {recommended.map((book) => (
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