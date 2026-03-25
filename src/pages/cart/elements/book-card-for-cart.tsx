import { useEffect, useState } from 'react';
import {
  type NumberFieldRootProps
} from '@base-ui/react/number-field';
import { DeleteIcon } from '@common/icons/delete-icon';
import { NumberSpinner } from '@common/number-spinner';
import type { CartBookType } from '@redux/cart-books/slice';
import { addBookInCart, getCartBooks } from '@redux/cart-books/thunk.ts';
import { useAppDispatch } from '@redux/hooks.ts';
import { useDebounce } from '@utils/hooks.ts';

import {
  Grid,
  type GridProps, IconButton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatPrice } from '@utils/formatters';
import { useNavigate } from 'react-router';

type BookCardForCartProps = {
  book: CartBookType,
};

export const BookCardForCart = (props: BookCardForCartProps) => {
  const { book } = props;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [booksCount, setBooksCount] = useState(book.count);

  const debouncedBooksCount = useDebounce<number>(booksCount, 500);

  const handleBooksCountChange: NumberFieldRootProps['onValueChange'] = (count) => {
    setBooksCount(count || 0);
  };

  useEffect(() => {
    if (debouncedBooksCount !== book.count) {
      dispatch(addBookInCart({ bookId: book.id, quantity: booksCount }))
        .unwrap()
        .then(() => dispatch(getCartBooks()));
    }

  }, [debouncedBooksCount, dispatch]);

  const handleDeleteButton = () => {
    dispatch(addBookInCart({ bookId: book.id, quantity: 0 }))
      .unwrap()
      .then(() => dispatch(getCartBooks()));
  }

  const handleBookCoverClick = () => {
    navigate(`/product/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Grid container gap={3} alignItems="center">
      <StyledCoverGrid
        img={book.media}
        onClick={handleBookCoverClick}
      ></StyledCoverGrid>

      <Grid container rowSpacing={7} flexDirection="column">
        <Grid>
          <Typography variant="h1">{book.title}</Typography>

          <StyledAuthorTypography variant="h2">
            {book.author}
          </StyledAuthorTypography>
        </Grid>

        <Grid
          alignItems="center"
          justifyContent="flex-start"
          container
          spacing={8}
        >
          <NumberSpinner
            min={1}
            max={book.availableCount}
            defaultValue={book.count}
            onChange={handleBooksCountChange}
          />

          <IconButton onClick={handleDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Grid>

        <Grid>
          <StyledPriceTypography variant="h2">
            {formatPrice(String(book.price))}
          </StyledPriceTypography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => ({
  height: 289,
  maxWidth: 198,
  width: '100%',
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: 16,
  cursor: 'pointer'
}));

const StyledAuthorTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 24px;
`);

const StyledPriceTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 36px;
`);

