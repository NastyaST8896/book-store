import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router';
import { IN_APP_ROUTES } from '@utils/routes';

export const Cart = () => {
  const cart = useAppSelector((state) => state.cartBooks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartBooks());
  }, [dispatch]);

  const handleButtonClick = () => {
    navigate(IN_APP_ROUTES.home.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {cart.books.length ? (
        <StyledCartMain>
          <Container maxWidth="md">
            <Grid container gap='50px'>
              <Grid size={12}>
                {cart.books.map((book, index) => (
                  <React.Fragment key={book.id}>
                    <BookCardForCart book={book} />

                    {index !== (cart.books.length - 1) && <StyledBox />}
                  </React.Fragment>

                ))}
              </Grid>

              <Grid>
                <Grid container size={12} spacing='30px'>
                  <Grid size={12}>
                    <StyledPriceTypography variant="h2">
                      {'Total: '}
                      <StyledTotalSpan>{cart.totalPrice}</StyledTotalSpan>
                    </StyledPriceTypography>
                  </Grid>

                  <StyledButtonsGrid size={12}>
                    <StyledOutlineButton onClick={handleButtonClick}>
                      Continue shopping
                    </StyledOutlineButton>
                    <StyledButton>Checkout</StyledButton>
                  </StyledButtonsGrid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </StyledCartMain>
      ) : (
        <StyledEmptyCartMain>
          <Container maxWidth="md">
            <StyledEmptyCartGrid
              container
              spacing={{ lg: 13, md: 8, sm: 5, xs: 5 }}
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

                <StyledButton onClick={handleButtonClick}>
                  Go to catalog
                </StyledButton>
              </StyledEmptyCartInfoGrid>
            </StyledEmptyCartGrid>
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

const StyledButtonsGrid = styled(Grid)`
  display: flex;
  gap: 20px;
`;

const StyledOutlineButton = styled(StyledButton)(({ theme }) => `
  color: ${theme.palette.appColor.dark};
  background-color: transparent;
  border: 1px solid ${theme.palette.appColor.dark};
`);

const StyledPriceTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 36px;
`);

const StyledEmptyCartGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)(({ theme }) => `
  height: 1px;
  width: 100%;
  background-color: ${theme.palette.appColor.lightGrey};
  margin: 40px 0;
`);