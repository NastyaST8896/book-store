import Books from '@assets/img/books.svg';
import ReadingGirl from '@assets/img/reading-girl.svg';
import styledc from 'styled-components';

import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FreeBook = () => {
  return (
    <StyledContainer maxWidth="md">
      <StyledDiv>
        <StyledDivImgBooks>
          <StyledImgBooks src={Books} />
        </StyledDivImgBooks>
        <StyledContainerGrid
          container
          sx={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '56px',
            position: 'relative'
          }}
        >
          <Grid
            size={4}
            sx={{
              zIndex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              marginLeft: '40px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
              <Typography variant="h1">Build your library with us</Typography>
              <Typography variant="subtitle2">
                Buy two books and get one for free
              </Typography>
            </Box>
            <StyledButton variant="contained">
              Choose a book
            </StyledButton>
          </Grid>
          <StyledGrid size={4} sx={{ zIndex: '1' }}>
            <StyledImg src={ReadingGirl} alt="reading girl" />
          </StyledGrid>
        </StyledContainerGrid>
      </StyledDiv>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 40px
`;

const StyledDiv = styledc.div`
  background-color: #f0f4ef;
  position: relative;
  border-radius: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  width: 230px;
  height: 44px;
  text-transform: none;
  align-items: center;
  font-weight: 500;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 200px;
    height: 38px;
    padding: 10px 50px;
    font-size: 12px;

  }
`;

const StyledDivImgBooks = styledc.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
   @media (max-width: 1000px) {
    width: 361px;
    height: 177px;
  }
`;

const StyledImgBooks = styledc.img`
  @media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contained;
  }
`;

const StyledGrid = styled(Grid)`
  margin-right: 40px;
  @media (max-width: 1000px) {
    width: 340px;
    height: 336px;
    position: absolute;
    bottom: 0;
    right: 40px;
  }
`;

const StyledImg = styledc.img`
@media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contained;
  }
`;

const StyledContainerGrid = styled(Grid)`
  @media (max-width: 1000px) {
    justify-content: flex-start;
    align-items: center;
    position: relative;

    @media (max-width: 1000px) {
      height: 289px;
    }
  }
`;