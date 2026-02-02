import FooterLogo from '@assets/img/footer-logo.svg';
import Map from '@assets/img/map.png';
import styledc from 'styled-components';

import { Box, Container, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer maxWidth="md">
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
          <Grid size={2} spacing={2} flexDirection="column">
            <img src={FooterLogo} alt="book room" />
            <div>tranthuy.nute@gmail.com</div>
            <div>(480) 555-0103</div>
          </Grid>
          <Grid size={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="#" underline="none">Home Page</Link>
              <Link href="#" underline="none">Catalog</Link>
              <Link href="#" underline="none">My Account</Link>
              <Link href="#" underline="none">Cart</Link>
            </Box>
          </Grid>
          <Grid size={4} container spacing={2} flexDirection="column">
            <span>6391 Elgin St. Celina, Delaware 10299</span>
            <div>
              <StyledMap src={Map} alt="map" />
            </div>
          </Grid>
        </Grid>
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