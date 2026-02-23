import { useEffect, useState } from 'react';
import { BookCard } from '@common/book-card';
import { getBooks } from '@redux/books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';
import { unwrapResult } from '@reduxjs/toolkit';
import type {Book} from '@utils/types';

import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { FreeBook } from './elements';

export const Home = () => {
  // const auth = useAppSelector((state) => {
  //   return state.auth;
  // });
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    dispatch(getBooks())
      .then(unwrapResult)
      .then((data) =>{
        setBooks(data.books);
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  return (
    <main>
      <Container maxWidth="md">
        <StyledBox>
          <FreeBook />
        </StyledBox>

        <StyledGrid
          container
          columnSpacing={2}
          rowSpacing={8}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </StyledGrid>

      </Container>
    </main>
  );
};

const StyledBox = styled(Box)`
  padding: 20px 0 60px 0;
`;

const StyledGrid = styled(Grid)`
  padding: 20px 0 20px 0;
`;
