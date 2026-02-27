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
  Slider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { FreeBook } from './elements';
import { DefaultCheckIcon } from '@common/icons/default-check-icon';
import { CheckedIcon } from '@common/icons/checked-icon';
import { RightArrowIcon } from '@common/icons/right-arrow-icon';

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
  const [
    anchorGenreEl,
    setAnchorGenreEl
  ] = React.useState<null | HTMLElement>(null);
  const [
    anchorPriceEl,
    setAnchorPriceEl
  ] = React.useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isActiveGenreButton, setIsActiveGenreButton] = useState(false);
  const [isActivePriceButton, setIsActivePriceButton] = useState(false);
  const [priceValue, setPriceValue] = useState([0, 50000]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(50000);
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getBooks({ page }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setGenres(getGenresWidthChecked(data.genres));
        setMaxPrice(data.maxPrice);
        setMinPrice(data.minPrice);
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  const handlePaginationChange: PaginationProps['onChange'] = (_, value) => {
    dispatch(getBooks({
      page: value,
      genres: getCheckedGenresName(genres),
      maxPrice: priceValue[1],
      minPrice: priceValue[0],
    }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.log(err));

    setPage(value);
  };

  const handleGenreButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorGenreEl(event.currentTarget);
    setIsActiveGenreButton(true);

  };
  const handleGenreButtonClose = () => {
    setAnchorGenreEl(null);
    setIsActiveGenreButton(false);

    dispatch(getBooks({ page, genres: getCheckedGenresName(genres) }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.log(err));
  };

  const handlePriceButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPriceEl(event.currentTarget)
    setIsActivePriceButton(true);
  };

  const handlePriceValueChange = (_: Event, newValue: number[] | number) => {
    if (Array.isArray(newValue)) {
      setPriceValue(newValue);
    }
  }

  const handlePriceButtonClose = () => {
    setAnchorPriceEl(null);
    setIsActiveGenreButton(false);

    dispatch(getBooks({
      page,
      genres: getCheckedGenresName(genres),
      maxPrice: priceValue[1],
      minPrice: priceValue[0]
    }))
      .then(unwrapResult)
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
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

  const marks = [
    {
      value: minPrice,
      label: `$ ${minPrice.toFixed(2)}`,
      left: '0%'
    },

    {
      value: maxPrice,
      label: `$ ${maxPrice.toFixed(2)}`,
      left: '78%'
    },
  ]

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

          <Grid container spacing='20px' size={6}>
            <Grid size={4}>
              <StyledFilterButton
                onClick={handleGenreButtonClick}
                endIcon={
                  isActiveGenreButton ? <ArrowIcon /> : <RightArrowIcon />
                }
              >
                Genre
              </StyledFilterButton>
            </Grid>
            <StyledGenreMenu
              anchorEl={anchorGenreEl}
              open={Boolean(anchorGenreEl)}
              onClose={handleGenreButtonClose}
              onChange={handleCheckboxChange}
              variant='selectedMenu'

              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id}>
                  <Box>
                    <Checkbox
                      id={`${genre.id}`}
                      checked={genre.checked}
                      checkedIcon={<CheckedIcon />}
                      icon={<DefaultCheckIcon />}
                    />
                  </Box>
                  {genre.name}
                </MenuItem>
              ))}
            </StyledGenreMenu>

            <Grid size={4}>
              <StyledFilterButton
                onClick={handlePriceButtonClick}
                endIcon={
                  isActivePriceButton ? <ArrowIcon /> : <RightArrowIcon />
                }
              >
                Price
              </StyledFilterButton>
            </Grid>

            <StyledGenreMenu
              anchorEl={anchorPriceEl}
              open={Boolean(anchorPriceEl)}
              onClose={handlePriceButtonClose}

              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem>
                <Box width="380px" sx={{ padding: '26px 0 26px 2px' }}>
                  <StyledSlider
                    getAriaLabel={() => 'Price'}
                    value={priceValue}
                    onChange={handlePriceValueChange}
                    valueLabelDisplay="auto"
                    marks={marks.map((mark) => ({ value: mark.value }))}
                    min={minPrice}
                    max={maxPrice}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '30px'
                    }}
                  >
                    {marks.map((mark, index) => (
                      <Typography
                        key={index}
                        sx={{
                          position: 'absolute',
                          left: mark.left,
                          fontSize: '16px',
                          fontWeight: '400',
                          color: '#344966',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {mark.label}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </MenuItem>
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

const StyledSlider = styled(Slider)(({ theme }) => `
  color: ${theme.palette.appColor.green};
  height: 12px;

  & .MuiSlider-thumb {
    height: 32px;
    width: 32px;
    background-color: ${theme.palette.appColor.white};
    border: 2px solid ${theme.palette.appColor.green};
  };

  & .MuiSlider-rail {
    background-color: ${theme.palette.appColor.grayscale};
  },
`);