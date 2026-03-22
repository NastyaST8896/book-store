import { useEffect } from 'react';
import Books from '@assets/img/books.svg';
import { StyledButton } from '@common/styled-button';
import { getCartBooks } from '@redux/cart-books/thunk';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { BookCardForCart } from './elements/book-card-for-cart';

export const Cart = () => {
  const cart = useAppSelector((state) => state.cartBooks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartBooks());
  }, [dispatch]);

  return (
    <>
      { cart.books.length ? (
        <StyledCartMain>
          <Container maxWidth="md">
            <Grid container gap='50px'>

              <Grid size={12}>
                {cart.books?.map((book) => (
                  <BookCardForCart
                    key={book.id}
                    book={book}
                  />
                ))}
              </Grid>

              <Grid>
                <Grid>

                </Grid>

                <Grid container size={12} spacing='30px'>
                  <Grid size={12}>
                    <StyledPriceTypography variant="h2">
                      {'Total: '}
                      <StyledTotalSpan>{cart.totalPrice}</StyledTotalSpan>
                    </StyledPriceTypography>
                  </Grid>

                  <Grid size={12} display='flex' gap='20px'>
                    <StyledOutlineButton>Continue shopping</StyledOutlineButton>
                    <StyledButton>Checkout</StyledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </StyledCartMain>
      ) : (
        <StyledEmptyCartMain>
          <Container maxWidth="md">
            <Grid
              container
              spacing={{ lg: 13, md: 8, sm: 5, xs: 5 }}
              justifyContent='center'
              alignItems='center'
              direction={{
                lg: 'row',
                md: 'row',
                sm: 'row',
                xs: 'column-reverse'
              }}
            >
              <StyledImgBooksGrid>
                <StyledImgBooks src={Books} />
              </StyledImgBooksGrid>
              <StyledEmptyCartInfoGrid container spacing='60px'>
                <StyledTextInfoBox>
                  <Typography variant="h1">Your cart is empty</Typography>

                  <StyledTypography variant="subtitle2">
                    Add items to cart to make a purchase.
                    Go to the catalogue no.
                  </StyledTypography>
                </StyledTextInfoBox>

                <StyledButton>Go to catalog</StyledButton>
              </StyledEmptyCartInfoGrid>
            </Grid>
          </Container>
        </StyledEmptyCartMain>
      )}
    </>
  );
};

const StyledEmptyCartMain = styled('main')`
  padding: 94px 0 148px 0;
`;

const StyledEmptyCartInfoGrid = styled(Grid)`
  max-width: 465px;
`;

const StyledTextInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTypography = styled(Typography)`
  font-size: 24px;
`;

const StyledImgBooksGrid = styled(Grid)`
  @media (max-width: 1000px) {
    width: 350px;
    height: 215px;
  }
`;

const StyledImgBooks = styled('img')`
  @media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contain;
  }
`;

const StyledCartMain = styled('main')`
  padding: 36px 0 110px 0;
`;

const StyledTotalSpan = styled('span')(({ theme }) => `
  font-weight: 700;
  font-size: 36px;
  color: ${theme.palette.appColor.dark};
`);

const StyledOutlineButton = styled(StyledButton)(({ theme }) => `
  color: ${theme.palette.appColor.dark};
  background-color: transparent;
  border: 1px solid ${theme.palette.appColor.dark};
`);

const StyledPriceTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 36px;
`);