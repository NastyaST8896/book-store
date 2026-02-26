import React from 'react';
import { useEffect, useState } from 'react';
import { BookCard } from '@common/book-card';
import { ArrowIcon } from '@common/icons/arrow-icon';
import { getBooks } from '@redux/books/thunk.ts';
import { useAppDispatch } from '@redux/hooks.ts';
import { unwrapResult } from '@reduxjs/toolkit';
import type { Book, Genre } from '@utils/types';

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Menu,
  MenuItem,
  Pagination, type PaginationProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { FreeBook } from './elements';

function getGenresWidthChecked(genres: Genre[]): Genre[] {
  return genres.map((genre) => {
    genre.checked = false;

    return genre;
  });
}

function getCheckedGenresName(genres: Genre[]): string[] {
  return genres
    .filter((genre) => genre.checked)
    .map((genre) => genre.name);
}

export const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    dispatch(getBooks({ page }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setGenres(getGenresWidthChecked(data.genres));
      })
      .catch(err => console.log(err));
  }, [dispatch, page]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    dispatch(getBooks({ page: value, genres: getCheckedGenresName(genres) }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setGenres(getGenresWidthChecked(data.genres));
      })
      .catch(err => console.log(err));

    setPage(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

    dispatch(getBooks({ page, genres: getCheckedGenresName(genres) }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setGenres(getGenresWidthChecked(data.genres));
      })
      .catch(err => console.log(err));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'checkbox') {
      const genre = genres.find((item) => {
        return item.id === +event.target.id;
      });

      const newGenres = genres.map((item) => {
        if (item === genre) {
          item.checked = !item.checked;

          return item;
        }

        return item;
      });

      setGenres(newGenres);
    }
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

          <Grid container size={6}>
            <Grid size={4}>
              <StyledFilterButton
                onClick={handleClick}
                endIcon={<ArrowIcon />}
              >
                Genre
              </StyledFilterButton>
            </Grid>
            <StyledGenreMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // onClick={handleClose}
              onChange={handleCheckboxChange}

              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id}>
                  <Box>
                    <Checkbox
                      id={`${genre.id}`}
                      checked={genre.checked}
                      icon={<CheckboxIcon />}
                      checkedIcon={<CheckedCheckboxIcon />}
                    />
                  </Box>
                  {genre.name}
                </MenuItem>
              ))}
            </StyledGenreMenu>
          </Grid>
        </Grid>

        <StyledGrid
          container
          columnSpacing={2}
          rowSpacing={8}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </StyledGrid>

        <StyledPaginationBox>
          <StyledPagination
            color="secondary"
            count={totalPages}
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
  bordrer: none;
}
`);

const StyledPaginationBox = styled(Box)`
  padding: 40px 0 150px 0;
  display: flex;
  justify-content: center;
`;

const StyledFilterButton = styled(Button)(({ theme }) => `
  text-transform: none;
  background-color: ${theme.palette.appColor.light};
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 16px;
  width:100%;

  & .MuiButton-icon {
    margin-left: 43%;
  }
`);

const StyledGenreMenu = styled(Menu)(({ theme }) => `
  & .MuiMenu-paper {
    box-shadow: none;
    background-color: ${theme.palette.appColor.light};
    margin-top: 16px;
    overflow: visible;
    border-radius: 16px;

    &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 14px;
    width: 10px;
    height: 10px;
    background: ${theme.palette.appColor.light};
    transform: translateY(-50%) rotate(45deg);
    z-index: 0;
  },

  & .MuiMenuItem-root {
   & .MuiTouchRipple-root {
    border-radius: 16px;
  }}
},
`);

const CheckboxIcon = styled('span')(({ theme }) => `
  border-radius: 12px;
  width: 24px;
  height: 24px;
  border: 1px solid ${theme.palette.appColor.dark};

  background-color: ${theme.palette.appColor.white};
`);

const CheckedCheckboxIcon = styled(CheckboxIcon)(({ theme }) => `
  background-color: ${theme.palette.appColor.dark};
  &::before: {
    display: block;
    width: 10px;
    height: 10px;
    /* background-image: url(Check);
    background-size: cover;
    background-position: center; */
    content: "";
  },
`);