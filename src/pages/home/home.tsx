import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { getBooks } from '@redux/books/thunk.ts';
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

import { GenresFilter } from './elements/genres-filter.tsx';
import { PriceRangeFilter } from './elements/price-range-filter.tsx';
import { SortByFilter } from './elements/sort-by-filter.tsx';
import { FreeBook } from './elements';
import { getGenresApi } from '../../api/genres-api.ts';
import { getMaxPriceApi } from '../../api/price-api.ts';

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
    const getMaxPrice = async () => {
      const maxPrice = await getMaxPriceApi();

      setMaxPrice(maxPrice.maxPrice)
    };

    const getGenres = async () => {
      const genres = await getGenresApi();

      setGenres(genres.allGenres)
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
  }, [searchParams, dispatch]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(value));

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
              />
            </Grid>

            <Grid size={4}>
              <PriceRangeFilter
                value={[
                  Number(searchParams.get('minPrice')),
                  Number(searchParams.get('maxPrice')) || Number(maxPrice),
                ]}
                maxPrice={maxPrice}
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
              books.books.length ? (
                <StyledGrid
                  container
                  columnSpacing={2}
                  rowSpacing={8}
                >
                  {
                    books.books.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                      />
                    ))
                  }
                </StyledGrid>
              ) : (
                <StyledWithoutBooksGrid>
                  <StyledWithoutBooksTypography variant='h1'>
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
    </main >
  );
};

const StyledFreeBookBox = styled(Box)`
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