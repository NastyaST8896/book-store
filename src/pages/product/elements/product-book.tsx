import {
  Box,
  Grid,
  IconButton,
  Typography,
  type GridProps,
  type IconButtonProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { HeartIcon } from '@common/icons/heart-icon';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { StyledButton } from '@common/styled-button';
import { addBookInCart, getCartBooks } from '@redux/cart-books/thunk';
import type { ProductBookType } from '@utils/types';
import { ProductBookRating } from './product-book-rating';

type ProductBookProps = {
  book: ProductBookType,
  onChange: (newBook: ProductBookType) => void,
}

export const ProductBook = (props: ProductBookProps) => {
  const { book, onChange } = props;

  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => {
    return state.cartBooks;
  });

  const handleProductButtonClick = () => {
    let currentBook;
    if (cart.books.length) {
      currentBook = cart.books.find((cartBook) => cartBook.id === book.id);
    }
    dispatch(addBookInCart({
      bookId: book?.id,
      quantity: currentBook ? (currentBook.count + 1) : 1
    }))
      .unwrap()
      .then(() => dispatch(getCartBooks()));
  }

  return (
    <StyledBookGrid container>
      <StyledCoverGrid img={book.media} >
        <StyledIconButton /*transparent={!book.isFavorite}*/>
          <HeartIcon
            fill="none"
          /*fill={book.isFavorite ? 'white' : 'none'}*/
          />
        </StyledIconButton>
      </StyledCoverGrid>

      <StyledBookInfoGrid>
        <StyledInfoContainerGrid container >
          <Grid>
            <Typography variant="h1">{book.title}</Typography>
            <StyledVariantH2Typography variant="h2" >
              {book.author}
            </StyledVariantH2Typography>
          </Grid>

          <ProductBookRating book={book} onChange={onChange} />

          <StyledDescriptionGrid>
            <StyledVariantH2Typography variant="h2">
              Description
            </StyledVariantH2Typography>

            <StyledDescriptionTextTypography variant="subtitle2">
              {book.description}
            </StyledDescriptionTextTypography>
          </StyledDescriptionGrid>
        </StyledInfoContainerGrid>

        <StyledButtonsBox>
          <StyledButtonBox>
            <StyledButtonTypography variant="subtitle2">
              Paperback
            </StyledButtonTypography>

            <StyledButton
              disabled
              buttonHeight={50}
              sx={{ fontSize: '20px' }}
            >
              Not available
            </StyledButton>
          </StyledButtonBox>

          <StyledButtonBox>
            <StyledButtonTypography variant="subtitle2">
              Hardcover
            </StyledButtonTypography>

            <StyledButton
              onClick={handleProductButtonClick}
              buttonHeight={50}
              sx={{ fontSize: '20px' }}
            >
              $ {book.price} USD
            </StyledButton>
          </StyledButtonBox>
        </StyledButtonsBox>
      </StyledBookInfoGrid>

    </StyledBookGrid>
  )
}

const StyledBookGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  padding: 36px 0 60px 0;
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
  min-width: 135px;
  max-width: 522px;
  width: 100%;
  height: 780px;
`);

const StyledBookInfoGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const StyledInfoContainerGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 630px;
  width: 100%;
`;

const StyledVariantH2Typography = styled(Typography)`
  font-size: 24px;
`;

const StyledDescriptionGrid = styled(Grid)`
  display: flex; 
  flex-direction: column; 
  gap: 12px;
`;

const StyledDescriptionTextTypography = styled(Typography)`
  font-size: 16px; 
  white-space: pre-wrap;
`;

const StyledButtonsBox = styled(Box)`
  display: flex; 
  gap: 82px;
`;

const StyledButtonBox = styled(Box)`
  display: flex; 
  flex-direction: column; 
  gap: 14px;
`;

const StyledButtonTypography = styled(Typography)`
  font-size: 16px;
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