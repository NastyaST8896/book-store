import Books from '@assets/img/books-background.svg';
import ReadingGirl from '@assets/img/reading-girl.svg';
import { StyledButton } from '@common/styled-button.tsx';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FreeBook = () => {

  const handleChooseButtonClick = () => {
    window.scrollTo({
      top: 560,
      behavior: 'smooth'
    })
  }
  return (
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
          <StyledChooseButton
            onClick={handleChooseButtonClick}
            sx={{ width: '230px' }}
            variant="contained"
          >
            Choose a book
          </StyledChooseButton>
        </Grid>
        <StyledGrid size={4} sx={{ zIndex: '1' }}>
          <StyledImg src={ReadingGirl} alt="reading girl" />
        </StyledGrid>
      </StyledContainerGrid>
    </StyledDiv>
  );
};

const StyledDiv = styled('div')(({ theme }) => `
  background-color: ${theme.palette.appColor.light};
  position: relative;
  border-radius: 16px;
`);

const StyledChooseButton = styled(StyledButton)`
  font-size: 16px;

  @media (max-width: 600px) {
    width: 200px;
    height: 38px;
    padding: 10px 50px;
    font-size: 12px;
  }
`;

const StyledDivImgBooks = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  @media (max-width: 1000px) {
    width: 361px;
    height: 177px;
  }
`;

const StyledImgBooks = styled('img')`
  @media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contain;
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

const StyledImg = styled('img')`
  @media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contain;
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