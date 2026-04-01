import Books from '@assets/img/books-background.svg';
import ReadingGirl from '@assets/img/reading-girl.svg';
import { StyledButton } from '@common/styled-button.tsx';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

export const FreeBook = () => {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChooseButtonClick = () => {
    window.scrollTo({
      top: 560,
      behavior: 'smooth'
    })
  }
  return (
    <>
      {mobile ? (
        <StyledFreeBookGrid>
          <StyledContainerGrid
            container
          >
            <StyledMobileInfoGrid size={12}>
              <StyledDivImgBooks>
                <StyledImgBooks src={Books} />
              </StyledDivImgBooks>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  gap: '10px',
                  zIndex: '2'
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
            </StyledMobileInfoGrid>
            <StyledGrid size={4} sx={{ zIndex: '1' }}>
              <StyledImg src={ReadingGirl} alt="reading girl" />
            </StyledGrid>
          </StyledContainerGrid>
        </StyledFreeBookGrid>
      ) : (
        <StyledFreeBookGrid>
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
              size={{ lg: 4, md: 6 }}
              sx={{
                zIndex: 3,
                padding: '45px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                <Typography variant="h1">Build your library with us</Typography>
                <StyledTextTypography variant="subtitle2">
                  Buy two books and get one for free
                </StyledTextTypography>
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
        </StyledFreeBookGrid>
      )}
    </>
  );
};

const StyledFreeBookGrid = styled('div')(({ theme }) => `
  background-color: ${theme.palette.appColor.light};
  position: relative;
  border-radius: 16px;

  @media (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
`);

const StyledChooseButton = styled(StyledButton)`
  font-size: 16px;
  z-index: 3;

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

  @media (max-width: 650px) {
    width: 232px;
    height: 140px;
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

  @media (max-width: 770px) {
    width: 253px;
    height: 250px;
    position: static;
    margin-right: 0;
  }
`;

const StyledImg = styled('img')`
  @media (max-width: 1000px) {
    max-width: 100%;
    object-fit: contain;
  }
`;

const StyledContainerGrid = styled(Grid)`
  justify-content: space-evenly;
  align-items: center;
  gap: 56px;
  position: relative;

  @media (max-width: 1000px) {
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  @media (max-width: 770px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const StyledMobileInfoGrid = styled(Grid)`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-left: 40px;
  padding: 45px 40px;

  @media (max-width: 770px) {
    z-index: 0;
    position: relative;
    margin: 20px;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const StyledTextTypography = styled(Typography)`
@media (max-width: 1000px) {
  max-width: 217px;
}
`;