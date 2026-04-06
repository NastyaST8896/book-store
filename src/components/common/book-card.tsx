import {
  type MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import type { NumberFieldRootProps } from '@base-ui/react';
import { HeartIcon } from '@common/icons/heart-icon.tsx';
import { StyledButton } from '@common/styled-button.tsx';
import { addBookInCart, getCartBooks } from '@redux/cart-books/thunk';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { formatPrice } from '@utils/formatters.ts';
import { useDebounce } from '@utils/hooks';
import type { Book } from '@utils/types.ts';

import {
  Box,
  Grid, type GridProps,
  IconButton, type IconButtonProps,
  Rating,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { DeleteIcon } from './icons/delete-icon';
import { NumberSpinner } from './number-spinner';

type BookCardProps = {
  book: Book,
};

export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  const [booksCount, setBooksCount] = useState(book.count);

  const cart = useAppSelector((state) => {
    return state.cartBooks;
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/product/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const debouncedBooksCount = useDebounce<number>(booksCount, 500);

  useEffect(() => {
    if (debouncedBooksCount !== book.count) {
      dispatch(addBookInCart({ bookId: book.id, quantity: booksCount }))
        .unwrap()
        .then(() => dispatch(getCartBooks()));
    }

  }, [debouncedBooksCount, dispatch]);

  const handleIconButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    // toggleLike()
  };

  const handleBookPriceButtonClick = () => {
    let currentBook;

    if (cart.books.length) {
      currentBook = cart.books.find((cartBook) => cartBook.id === book.id);
    }
    dispatch(addBookInCart({
      bookId: book.id,
      quantity: currentBook ? (currentBook.count + 1) : 1
    }))
      .unwrap()
      .then(() => {
        dispatch(getCartBooks());

      });
  };

  const handleBooksCountChange: NumberFieldRootProps['onValueChange'] = (count) => {
    setBooksCount(count || 0);
  };

  const handleDeleteButton = () => {
    dispatch(addBookInCart({ bookId: book.id, quantity: 0 }))
      .unwrap()
      .then(() => dispatch(getCartBooks()));
  };

  return (
    <Grid
      container
      size={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 6 }}
      sx={{ flexDirection: 'column' }}
      rowSpacing="30px"
      alignItems='center'
    >
      <StyledCoverGrid
        onClick={handleBookClick}
        img={book.media}
        height={{ lg: '488px', md: '362px', sm: '362px', xs: '182px' }}
        width={{ lg: '305px', md: '244px', sm: '244px', xs: '125px' }}
      >
        <StyledIconButton
          onClick={handleIconButtonClick}
          transparent={!book.isFavorite}
        >
          <HeartIcon fill={book.isFavorite ? 'white' : 'none'} />
        </StyledIconButton>
      </StyledCoverGrid>

      <Grid rowSpacing="20px" container width="100%">
        <Grid
          onClick={handleBookClick} sx={{ cursor: 'pointer' }}
        >
          <Typography
            title={book.title}
            variant="subtitle2"
            fontWeight={500}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {book.title}
          </Typography>

          <Typography
            title={book.author}
            variant="subtitle2"
            fontWeight={500}
            color="#B9BAC3"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {book.author}
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          size={12}
        >
          <StyledRating
            value={+book.booksRating}
            precision={0.1}
            readOnly={true}
          />

          <Box sx={{ mr: 2 }}>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                color: theme.palette.appColor.darkGrey
              })}
            >
              {book.booksRating ? book.booksRating : '0.0'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {book.count ? (
        <StyledSpinnerGrid>
          <NumberSpinner
            min={0}
            max={book.availableCount}
            defaultValue={book.count}
            onChange={handleBooksCountChange}
          />
          <IconButton onClick={handleDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </StyledSpinnerGrid>
      ) : (
        <StyledButton
          onClick={handleBookPriceButtonClick}
          buttonHeight={48}
          sx={{ fontSize: '20px' }}
        >
          {formatPrice(book.price)}
        </StyledButton>
      )}
    </Grid>
  );
};

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => ({
  position: 'relative',
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: 16,
  cursor: 'pointer'
}));

const StyledIconButton = styled(
  (props: IconButtonProps) => <IconButton {...props} />,
  { shouldForwardProp: (prop) => prop !== 'transparent' }
)<{ transparent?: boolean }>(({ transparent = true, theme }) => ({
  position: 'absolute',
  left: 20,
  top: 20,
  opacity: transparent ? .75 : 1,
  maxWidth: 48,
  width: '100%',
  height: 48,
  backgroundColor: theme.palette.appColor.darkBlue,

  '&:hover': {
    backgroundColor: theme.palette.appColor.darkBlue,
    opacity: 1
  },

  [theme.breakpoints.down(1000)]: {
    maxWidth: 38,
    width: '100%',
    height: 38,
    left: 16,
    top: 16,
  },

  [theme.breakpoints.down(770)]: {
    maxWidth: 25,
    width: '100%',
    height: 25,
    padding: '7px',
  }
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '&.MuiRating-root': {
    maxWidth: '250px',
    width: '100%',
    justifyContent: 'space-between',
  },
  '& .MuiRating-iconFilled': {
    color: theme.palette.appColor.green
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.appColor.green
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.appColor.green
  }
}));

const StyledSpinnerGrid = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  background-color: #3449665f;
  padding: 6px 0;
  border-radius: 16px;
`;
