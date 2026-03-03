import { useEffect, useState } from 'react';
import { BookCard } from '@common/book-card';
import { setGenres, setPriceRange, setSortBy } from '@redux/books/slice.ts';
import { getBooks } from '@redux/books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';

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

import { GenresFilter } from './elements/genres-filter.tsx';
import { PriceRangeFilter } from './elements/price-range-filter.tsx';
import { FreeBook } from './elements';
import { SortByFilter } from './elements/sort-by-filter.tsx';
import { getBook } from '@redux/book/thunk.ts';

export const Home = () => {
  const books = useAppSelector((state) => state.books);

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks({
      page,
      genres: books.activeFilters?.genres,
      minPrice: books.activeFilters?.priceRange?.[0],
      maxPrice: books.activeFilters?.priceRange?.[1],
      sortBy: books.activeFilters?.sortBy,
    }));
  }, [
    books.activeFilters?.priceRange,
    books.activeFilters?.genres,
    books.activeFilters?.sortBy,
    dispatch,
    page
  ]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    setPage(value);
  };

  return (
    <main>
      <Container maxWidth="md">
        <StyledFreeBookBox>
          <FreeBook />
        </StyledFreeBookBox>

        <Grid container justifyContent="space-between">
          <Grid size={2}>
            <Typography variant="h1">Catalog</Typography>
          </Grid>

          <Grid container spacing="20px" size={8}>
            <Grid size={4}>
              <GenresFilter
                genres={books.genres}
                onClose={(genres) => dispatch(setGenres(genres))}
              />
            </Grid>

            <Grid size={4}>
              <PriceRangeFilter
                minPrice={books.minPrice}
                maxPrice={books.maxPrice}
                onClose={(priceRange) => dispatch(setPriceRange(priceRange))}
              />
            </Grid>

            <Grid size={4}>
              <SortByFilter
                onClose={(sortName) => dispatch(setSortBy(sortName))}
              />
            </Grid>
          </Grid>
        </Grid>

        {
          books.loading
            ? (
              <StyledProgressBox>
                <CircularProgress size={100} />
              </StyledProgressBox>
            ) : (
              <StyledGrid
                container
                columnSpacing={2}
                rowSpacing={8}
              >
                {books.books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={(id) => {
                      console.log('>id', id)
                      dispatch(getBook(id));
                    }}
                  />
                ))}
              </StyledGrid>
            )
        }

        <StyledPaginationBox>
          <StyledPagination
            color="secondary"
            count={books.totalPages}
            page={page}
            onChange={handlePaginationChange}
          />
        </StyledPaginationBox>

      </Container>
    </main>
  );
};

const StyledFreeBookBox = styled(Box)`
  padding: 20px 0 60px 0;
`;

const StyledGrid = styled(Grid)`
  padding: 20px 0 40px 0;
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