import { Container, Grid, Typography, Box, type GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import Books from '@assets/img/books.svg';
import { StyledButton } from "@common/styled-button";

export const Cart = () => {
  return (
    <>
      {/* <StyledEmptyCartMain>
        <Container maxWidth="md">
          <Grid
            container
            spacing={{lg: 13, md: 8, sm: 5, xs: 5 }}
            justifyContent='center'
            alignItems='center'
            direction={{lg: 'row', md:'row', sm:'row', xs:'column-reverse'}}
          >
            <StyledImgBooksGrid>
              <StyledImgBooks src={Books} />
            </StyledImgBooksGrid>
            <StyledEmptyCartInfoGrid container spacing='60px'>
              <StyledTextInfoBox>
                <Typography variant="h1">Your cart is empty</Typography>

                <StyledTypography variant="subtitle2">
                  Add items to cart to make a purchase. Go to the catalogue no.
                </StyledTypography>
              </StyledTextInfoBox>

              <StyledButton>Go to catalog</StyledButton>
            </StyledEmptyCartInfoGrid>
          </Grid>
        </Container>
      </StyledEmptyCartMain> */}

      <StyledCartMain>
        <Container maxWidth="md">
          <Grid container flexDirection='column'>
            <Grid container gap={3}>
              <StyledCoverGrid
                // onClick={handleBookClick(String(book.id))}
                // img='src/assets/img/book1.png'
              ></StyledCoverGrid>
            </Grid>
          </Grid>
        </Container>
      </StyledCartMain>
    </>
  )
}

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
`

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
