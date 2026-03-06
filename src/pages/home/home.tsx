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
import { SortByFilter } from './elements/sort-by-filter.tsx';
import { FreeBook } from './elements';
import { useSearchParams } from 'react-router';

export const Home = () => {
  const books = useAppSelector((state) => state.books);

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {

    console.log(searchParams)
    dispatch(getBooks({
      page,
      genres: searchParams.has('genres') ? searchParams.getAll('genres') : undefined,
      minPrice: Number(searchParams.get('minPrice')),
      maxPrice: Number(searchParams.get('maxPrice')),
      sortBy: String(searchParams.get('sortId')),
    }));
  }, [
    searchParams,
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
                onClose={(genres) => {
                  const params = new URLSearchParams(searchParams);

                  params.delete('genres');

                  genres.forEach((genre) => params.append('genres', genre));

                  setSearchParams(params);
                }}
              />
            </Grid>

            <Grid size={4}>
              <PriceRangeFilter
                onClose={(priceRange) => {
                  const params = new URLSearchParams(searchParams);

                  params.delete('minPrice');
                  params.delete('maxPrice');

                  params.append('minPrice', String(priceRange[0]));
                  params.append('maxPrice', String(priceRange[1]));

                  setSearchParams(params);
                }
                }
              />
            </Grid>

            <Grid size={4}>
              <SortByFilter
                onClose={(sortId) => {
                  const params = new URLSearchParams(searchParams);

                  params.delete('sortId');

                  params.append('sortId', sortId);

                  setSearchParams(params);
                }
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {
          books.isLoading
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
                  />
                ))}
              </StyledGrid>
            )
        }

        <StyledPaginationBox>
          <StyledPagination
            color="secondary"
            count={books.pagination.totalPages}
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