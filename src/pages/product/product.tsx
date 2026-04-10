import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getCartBooks } from '@redux/cart-books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import type { Book, ProductBookType } from '@utils/types';
import { Container } from '@mui/material';
import { getBookApi } from '../../api/book-api';
import { ProductBook, Recommendations } from './elements';
import { Comments } from './elements/product-comments';

export const Product = () => {
  const dispatch = useAppDispatch();

  const cartBooks = useAppSelector((state) => {
    return state.cartBooks.books;
  });
  const user = useAppSelector((state) => {
    return state.user;
  });

  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) {
      return
    }

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

    getProductData();

    dispatch(getCartBooks());
  }, [dispatch, id]);

  const mergedBook: ProductBookType | null = useMemo(() => {
    if (!book) {
      return null;
    }

    const cartBook = cartBooks.find((bookInCart) => {
      return bookInCart.id === book?.id;
    });

    if (cartBook) {
      return { ...book, count: cartBook.count };
    }

    if (!cartBook && book?.count) {
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
        {
          mergedBook && (
            <ProductBook
              book={mergedBook}
              onChange={handleBookChange}
            />
          )
        }

        <Comments book={book} />

        <Recommendations cartBooks={cartBooks} />
      </Container>
    </main>
  );
};
