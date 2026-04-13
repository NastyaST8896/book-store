import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  type GridProps,
  type IconButtonProps
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HeartIcon } from '@common/icons/heart-icon';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { StyledButton } from '@common/styled-button';
import { addBookInCart, getCartBooks } from '@redux/cart-books/thunk';
import type { ProductBookType } from '@utils/types';
import { ProductBookRating } from './product-book-rating';
import { NumberSpinner } from '@common/number-spinner';
import { DeleteIcon } from '@common/icons/delete-icon';
import { useEffect, useState } from 'react';
import { useDebounce } from '@utils/hooks';
import type { NumberFieldRootProps } from '@base-ui/react';

type ProductBookProps = {
  book: ProductBookType,
  onChange: (newBook: ProductBookType) => void,
};

export const ProductBook = (props: ProductBookProps) => {
  const { book, onChange } = props;

  const theme = useTheme();
  const toTablet = useMediaQuery(theme.breakpoints.down('md'));
  const fromTablet = useMediaQuery(theme.breakpoints.up('md'));

  const [bookCount, setBookCount] = useState(book.count);

  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => {
    return state.cartBooks.books;
  });

  const debouncedBooksCount = useDebounce<number>(bookCount, 500);

  useEffect(() => {
    if (debouncedBooksCount !== book.count) {
      dispatch(addBookInCart({ bookId: book.id, quantity: bookCount }))
        .unwrap()
        .then(() => {
          dispatch(getCartBooks());
          onChange({ ...book, count: debouncedBooksCount });
        });
    }

  }, [debouncedBooksCount, dispatch]);

  const handleBooksCountChange: NumberFieldRootProps['onValueChange'] =
    (count) => {
      setBookCount(count || 0);
    };

  const handleDeleteButton = () => {
    dispatch(addBookInCart({ bookId: book.id, quantity: 0 }))
      .unwrap()
      .then(() => dispatch(getCartBooks()));
  };


  const handleProductButtonClick = () => {
    let currentBook;

    if (cart.length) {
      currentBook = cart.find((cartBook) => cartBook.id === book.id);
    }
    dispatch(addBookInCart({
      bookId: book?.id,
      quantity: currentBook ? (currentBook.count + 1) : 1
    }))
      .unwrap()
      .then(() => dispatch(getCartBooks()));
  };


  return (
    <StyledBookGrid container>
      {fromTablet && (
        <StyledCoverGrid
          size={5}
          img={book.media}
        >
          <StyledIconButton /*transparent={!book.isFavorite}*/>
            <HeartIcon
              fill="none"
            /*fill={book.isFavorite ? 'white' : 'none'}*/
            />
          </StyledIconButton>
        </StyledCoverGrid>
      )}

      <StyledBookInfoGrid size={{lg: 7, md: 7 }}>
        <StyledInfoContainerGrid container>
          {
            toTablet && (
              <StyledInfoWidthCoverGrid container>
                <StyledCoverGrid
                  size={6}
                  img={book.media}
                >
                </StyledCoverGrid>

                <StyledHederInfoBookGrid size={6}>
                  <GridBookTitleAndAuthor>
                    <Typography variant="h1">{book.title}</Typography>
                    <Typography variant="h2">
                      {book.author}
                    </Typography>
                  </GridBookTitleAndAuthor>

                  <ProductBookRating book={book} onChange={onChange} />
                </StyledHederInfoBookGrid>
              </StyledInfoWidthCoverGrid>
            )
          }

          {fromTablet && (
            <StyledHederInfoBookGrid>
              <GridBookTitleAndAuthor>
                <Typography variant="h1">{book.title}</Typography>
                <Typography variant="h2">
                  {book.author}
                </Typography>
              </GridBookTitleAndAuthor>

              <ProductBookRating book={book} onChange={onChange} />
            </StyledHederInfoBookGrid>
          )}

          {
            fromTablet && (
              <StyledDescriptionGrid>
                <Typography variant="h2">
                  Description
                </Typography>

                <StyledDescriptionTextTypography variant="subtitle2">
                  {book.description}
                </StyledDescriptionTextTypography>
              </StyledDescriptionGrid>
            )
          }
        </StyledInfoContainerGrid>

        {
          fromTablet && (
            <StyledButtonsBox>
              <StyledButtonBox>
                <StyledButtonTypography variant="subtitle1">
                  Paperback
                </StyledButtonTypography>

                <StyledButtonBook
                  disabled
                  buttonHeight={50}
                  sx={{ fontSize: '20px' }}
                >
                  Not available
                </StyledButtonBook>
              </StyledButtonBox>

              <StyledButtonBox>
                <StyledButtonTypography variant="subtitle1">
                  Hardcover
                </StyledButtonTypography>

                {book.count ? (
                  <StyledSpinnerBox>
                    <NumberSpinner
                      min={0}
                      max={book.availableCount}
                      defaultValue={book.count}
                      onChange={handleBooksCountChange}
                    />
                    <IconButton onClick={handleDeleteButton}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledSpinnerBox>
                ) : (
                  <StyledButtonBook
                    onClick={handleProductButtonClick}
                    buttonHeight={50}
                    sx={{ fontSize: '20px' }}
                  >
                    $ {book.price} USD
                  </StyledButtonBook>
                )}
              </StyledButtonBox>
            </StyledButtonsBox>
          )
        }

        {
          toTablet && (
            <StyledInfoBookBox>
              <StyledDescriptionBox>
                <Typography variant="h2">
                  Description
                </Typography>

                <StyledDescriptionTextTypography variant="subtitle2">
                  {book.description}
                </StyledDescriptionTextTypography>
              </StyledDescriptionBox>

              <StyledButtonsBox>
                <StyledButtonBox>
                  <StyledButtonTypography variant="subtitle1">
                    Paperback
                  </StyledButtonTypography>

                  <StyledButtonBook
                    disabled
                    buttonHeight={50}
                    sx={{ fontSize: '20px' }}
                  >
                    Not available
                  </StyledButtonBook>
                </StyledButtonBox>

                <StyledButtonBox>
                  <StyledButtonTypography variant="subtitle1">
                    Hardcover
                  </StyledButtonTypography>

                  {book.count ? (
                    <StyledSpinnerBox>
                      <NumberSpinner
                        min={0}
                        max={book.availableCount}
                        defaultValue={book.count}
                        onChange={handleBooksCountChange}
                      />
                      <IconButton onClick={handleDeleteButton}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledSpinnerBox>
                  ) : (
                    <StyledButtonBookText
                      onClick={handleProductButtonClick}
                      buttonHeight={50}
                      sx={{ fontSize: '20px' }}
                    >
                      $ {book.price} USD
                    </StyledButtonBookText>
                  )}
                </StyledButtonBox>
              </StyledButtonsBox>
            </StyledInfoBookBox>
          )
        }
      </StyledBookInfoGrid>

    </StyledBookGrid>
  );
};

const StyledBookGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  padding: 36px 0 60px 0;


  @media(max-width: 1000px) {
    flex-direction: row;
  }
`;

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => `
  position: relative;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: 16px;
  max-width: 522px;
  max-height: 779px;
  aspect-ratio: 1/1.5;
`);

const StyledBookInfoGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding:20px;
  max-width: 680px;
  width: 100%;

  @media(max-width: 1000px) {
    gap: 50px;
    padding: 0;
  }
`;

const StyledHederInfoBookGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;

  @media(max-width: 1000px) {
    max-width: 50%;
    gap: 20px;
    padding: 0 20px;
  }
`;

const StyledInfoContainerGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 630px;
  width: 100%;

  @media(max-width: 1000px) {
  max-width: none;
  }
`;

const StyledDescriptionGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledDescriptionTextTypography = styled(Typography)`
  white-space: pre-wrap;
`;

const StyledButtonsBox = styled(Box)`
  display: flex;
  gap: 82px;

  @media(max-width: 1168px) {
    gap: 20px;
  }
`;

const StyledButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledButtonTypography = styled(Typography)`
  color: #344966;
  font-weight: 400;
`;

const StyledIconButton = styled(
  (props: IconButtonProps) => <IconButton {...props} />,
  { shouldForwardProp: (prop) => prop !== 'transparent' }
)<{ transparent?: boolean }>(({ transparent = true, theme }) => ({
  position: 'absolute',
  right: 30,
  top: 30,
  opacity: transparent ? .75 : 1,
  maxWidth: 60,
  width: '100%',
  height: 60,
  backgroundColor: theme.palette.appColor.darkBlue,

  '&:hover': {
    backgroundColor: theme.palette.appColor.darkBlue,
    opacity: 1
  }
}));

const StyledSpinnerBox = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #3449665f;
  padding: 8px;
  border-radius: 16px;
  gap: 40px
`;

const StyledButtonBook = styled(StyledButton)`
  font-size: 18px;

  &.MuiButton-root {
    @media(max-width: 1042px) {
    padding: 10px 23px;
    }
  }
`;

const StyledButtonBookText = styled(StyledButtonBook)`
  font-size: 20px;
  
  @media (max-width: 650px) {
    font-size: 12px;
  };
`;

const GridBookTitleAndAuthor = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledDescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledInfoBookBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StyledInfoWidthCoverGrid = styled(Grid)`
  display: flex;
  width: 100%;
`;
