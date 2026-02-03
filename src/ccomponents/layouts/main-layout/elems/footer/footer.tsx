import FooterLogo from '@assets/img/footer-logo.svg';
import Map from '@assets/img/map.png';
import styledc from 'styled-components';
import { Link } from 'react-router';

import { Box, Container, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer maxWidth="md">
        <StyledGrid
        container 
        spacing={{sm:'auto'}} 
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
              <StyledLink to="/">Catalog</StyledLink>
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
      </StyledContainer>
    </StyledFooter>
  );
};

const StyledFooter = styledc.footer`
    background-color: #0D1821;
    color: #F0F4EF;
`;

const StyledContainer = styled(Container)`
    padding: 73px 80px;
    
    @media (max-width: 1440px) {
        padding: 72px 15px;
    }
`;

const StyledMap = styledc.img`
      max-width: 100%;
`;

const StyledDiv = styledc.div`
    font-size:20px;
    font-weight: 400;
    font-family: "Poppins";

    @media (max-width: 834px) {
        font-size: 16px;
        font-weight: 500;
    }
`;

const StyledLink = styled(Link)`
   text-decoration: none;
    color: #F0F4EF;
    font-size:20px;
    font-weight: 400;
    font-family: "Poppins";

     @media (max-width: 834px) {
        font-size: 16px;
        font-weight: 500;
    }
`;

const StyledGrid = styled(Grid)`
  @media (max-width: 770px) {
    flex-direction: column;
    gap: 40px;
    align-items: flex-start;

  }
`;