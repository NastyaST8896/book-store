import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { getBooks } from '@redux/books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';
import { getAllGenres } from '@redux/thunks/genres-thunk.ts';
import { getMaxPrice } from '@redux/thunks/price-thunk.ts';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [genres, setGenres] = useState<Genre[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMaxPrice())
      .unwrap()
      .then((data) => setMaxPrice(data.maxPrice));

    dispatch(getAllGenres())
      .unwrap()
      .then((data) => setGenres(data.allGenres));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBooks({
      page: searchParams.get('page'),
      genres: searchParams.get('genres'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      sortBy: searchParams.get('sortId'),
    }));
  }, [searchParams, dispatch]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(value));

    setSearchParams(params);
  };

  const handlePriceRangeChange = (priceRange: number[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete('minPrice');
    params.delete('maxPrice');

    params.append('minPrice', String(priceRange[0]));
    params.append('maxPrice', String(priceRange[1]));

    setSearchParams(params);
  };

  const handleGenresChange = (genres: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete('genres');

    if (genres.length) {
      params.append('genres', genres.join(','));
    }

    setSearchParams(params);
  };

  const handleSortByChange = (sortId: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete('sortId');

    params.append('sortId', sortId);

    setSearchParams(params);
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
                genres={genres}
                selectedGenres={searchParams.get('genres')?.split(',') || []}
                onClose={handleGenresChange}
              />
            </Grid>

            <Grid size={4}>
              <PriceRangeFilter
                value={[
                  Number(searchParams.get('minPrice')),
                  Number(searchParams.get('maxPrice')) || Number(maxPrice),
                ]}
                maxPrice={maxPrice}
                onClose={handlePriceRangeChange}
              />
            </Grid>

            <Grid size={4}>
              <SortByFilter
                sortNames={sortNames}
                sortName={
                  sortNames.find((sort) =>
                    sort.id === Number(searchParams.get('sortId')))?.name
                    || ''
                }
                onClose={handleSortByChange}
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
            page={Number(searchParams.get('page')) || 1}
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