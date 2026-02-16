import { Link } from 'react-router';
import FooterLogo from '@assets/img/footer-logo.svg';
import Map from '@assets/img/map.png';
import { IN_APP_ROUTES } from '@utils/routes';

import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="md">
        <StyledGrid
          container
          spacing={{ sm: 'auto' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid size={3} spacing={2} flexDirection="column">
            <img src={FooterLogo} alt="book room" />
            <StyledDiv>tranthuy.nute@gmail.com</StyledDiv>
            <StyledDiv>(480) 555-0103</StyledDiv>
          </Grid>
          <Grid size={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <StyledLink to="#">Home Page</StyledLink>
              <StyledLink to={IN_APP_ROUTES.home.path}>Catalog</StyledLink>
              <StyledLink to="#">My Account</StyledLink>
              <StyledLink to="#">Cart</StyledLink>
            </Box>
          </Grid>
          <Grid size={4} container spacing={2} flexDirection="column">
            <StyledDiv>6391 Elgin St. Celina, Delaware 10299</StyledDiv>
            <div>
              <StyledMap src={Map} alt="map" />
            </div>
          </Grid>
        </StyledGrid>
      </Container>
    </StyledFooter>
  );
};

const StyledFooter = styled('footer')(({ theme }) => `
    background-color: ${theme.palette.appColor.dark};
    color: ${theme.palette.appColor.light};
    padding: 74px 0;
    
    @media (max-width: 1440px) {
        padding: 74px 0;
    }
`);

const StyledMap = styled('img')`
      max-width: 100%;
`;

const StyledDiv = styled('div')`
    font-size:20px;
    font-weight: 400;
    
    @media (max-width: 834px) {
        font-size: 16px;
        font-weight: 500;
    }
`;

const StyledLink = styled(Link)(({ theme }) => `
    text-decoration: none;
    color: ${theme.palette.appColor.light};
    font-size: 20px;
    font-weight: 400;

    @media (max-width: 834px) {
        font-size: 16px;
        font-weight: 500;
    }
`);

const StyledGrid = styled(Grid)`
    @media (max-width: 770px) {
        flex-direction: column;
        gap: 40px;
        align-items: flex-start;

    }
`;