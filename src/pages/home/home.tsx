import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { getBooks } from '@redux/books/thunk.ts';
import { getCartBooks } from '@redux/cart-books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';
import type { Genre } from '@utils/types.ts';

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  type PaginationProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { getGenresApi } from '../../api/genres-api.ts';
import { getMaxPriceApi } from '../../api/price-api.ts';

import { GenresFilter } from './elements/genres-filter.tsx';
import { PriceRangeFilter } from './elements/price-range-filter.tsx';
import { SortByFilter } from './elements/sort-by-filter.tsx';
import { FreeBook } from './elements';

const sortNames = [
  { id: 1, name: 'Price' },
  { id: 2, name: 'Name' },
  { id: 3, name: 'Author name' },
  { id: 4, name: 'Rating' },
  { id: 5, name: 'Date of issue' },
];

export const Home = () => {
  const books = useAppSelector((state) => state.books);
  const cartBooks = useAppSelector((state) => state.cartBooks.books);

  const [searchParams, setSearchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [genres, setGenres] = useState<Genre[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMaxPrice = async () => {
      const maxPrice = await getMaxPriceApi();

      setMaxPrice(maxPrice.maxPrice);
    };

    const getGenres = async () => {
      const genres = await getGenresApi();

      setGenres(genres.allGenres);
    };

    getGenres();
    getMaxPrice();
  }, []);

  useEffect(() => {
    dispatch(getBooks({
      page: searchParams.get('page'),
      genres: searchParams.get('genres'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      sortBy: searchParams.get('sortId'),
      searchValue: searchParams.get('searchValue'),
    }));

    dispatch(getCartBooks());
  }, [searchParams, dispatch]);

  const mergedBooks = useMemo(() => {
    return books.books.map((book) => {
      const cartBook = cartBooks.find((bookInCart) => {
        return bookInCart.id === book.id;
      });
      // cartBooksObj[book.id]

      if (cartBook) {
        return { ...book, count: cartBook.count };
      }

      return book;
    });
  }, [books.books, cartBooks]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(value));

    setSearchParams(params);
  };

  return (
    <main>
      <Container maxWidth="md">
        <StyledFreeBookGrid>
          <FreeBook />
        </StyledFreeBookGrid>

          <StyledCatalogHeaderGrid container>
            <Grid size={2}>
              <Typography variant="h1">Catalog</Typography>
            </Grid>

            <Grid container spacing="20px" size={{ md: 8, sm: 12}}>
              <Grid size={{sm: 4, xs: 12 }}>
                <GenresFilter
                  genres={genres}
                  selectedGenres={searchParams.get('genres')?.split(',') || []}
                />
              </Grid>

              <Grid size={{sm: 4, xs: 12 }}>
                <PriceRangeFilter
                  value={[
                    Number(searchParams.get('minPrice')),
                    Number(searchParams.get('maxPrice')) || Number(maxPrice),
                  ]}
                  maxPrice={maxPrice}
                />
              </Grid>

              <Grid size={{sm: 4, xs: 12 }}>
                <SortByFilter
                  sortNames={sortNames}
                  sortName={
                    sortNames.find((sort) =>
                      sort.id === Number(searchParams.get('sortId')))?.name
                    || ''
                  }
                />
              </Grid>
            </Grid>
          </StyledCatalogHeaderGrid>

        {
          books.isLoading
            ? (
              <StyledProgressBox>
                <CircularProgress size={100} />
              </StyledProgressBox>
            ) : (
              mergedBooks.length ? (
                <StyledGrid
                  container
                  columnSpacing={2}
                  rowSpacing={8}
                  justifyContent='center'
                >
                  {
                    mergedBooks.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                      />
                    ))
                  }
                </StyledGrid>
              ) : (
                <StyledWithoutBooksGrid>
                  <StyledWithoutBooksTypography variant="h1">
                    No books where found.
                    Try changing the filtering parameters.
                  </StyledWithoutBooksTypography>
                </StyledWithoutBooksGrid>
              )
            )
        }

        <StyledPaginationBox>
          <StyledPagination
            color="secondary"
            count={books.pagination.totalPages}
            page={Number(searchParams.get('page')) || 1}
            onChange={handlePaginationChange}
          />
        </StyledPaginationBox>

      </Container>
    </main>
  );
};

const StyledFreeBookGrid = styled(Grid)`
  padding: 20px 0 60px 0;
`;

const StyledGrid = styled(Grid)`
  padding: 20px 0 40px 0;
`;

const StyledWithoutBooksGrid = styled(Grid)`
  padding: 20px 0 40px 0;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

const StyledWithoutBooksTypography = styled(Typography)`
  margin-top: 40px;
  text-align: center;
`;

const StyledPagination = styled(Pagination)(({ theme }) => `
  & .MuiPaginationItem-root {
    color: ${theme.palette.appColor.dark};
  }
  
  & .MuiTouchRipple-root  {
    border: none;
  }
`);

const StyledPaginationBox = styled(Box)`
  padding: 40px 0 150px 0;
  display: flex;
  justify-content: center;
`;

const StyledProgressBox = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 40px;
`;

const StyledCatalogHeaderGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;
  }
`;