import { Link } from 'react-router';
import styledc from 'styled-components';

import { Button, Container, FilledInput, FormControl, Grid, InputAdornment, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

import Logo from '../../../../../assets/img/logo.svg';
import Search from '../../../../../assets/img/search.svg';

export const Header = () => {

  return (
    <StyledContainer maxWidth="md">
      <header>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid size={2}>
            <StyledIcon src={Logo} alt="book room"/>
          </Grid>
          <Grid size={{ md: 1, sm: 1 }} sx={{ fontFamily: 'Poppins' }}>
            <Typography  variant='subtitle1' fontWeight={500}>
              Catalog
            </Typography>
          </Grid>
          <StyledGridEnd size={{ md: 6, sm:4, xs: 12 }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <StyledInput
                startAdornment={
                  <InputAdornment position="start">
                    <img src={Search} alt="Search" />
                  </InputAdornment>
                }
                placeholder="Search"
              />
            </FormControl>
          </StyledGridEnd>
          <Grid
            size={{ md: 'auto', sm: 4, xs:'auto' }}
          >
            <StyledButton variant="contained">
              <StyledLink to="/login">Log In</StyledLink>
              /
              <StyledLink to="/register">Sing Up</StyledLink></StyledButton>
          </Grid>
        </Grid>
      </header>
    </StyledContainer>

  );
};

const StyledButton = styled(Button)`
    border-radius: 16px;
    width: 230px;
    height: 44px;
    text-transform: none;

    @media (max-width: 600px) {
        width: 135px;
        height: 38px;
    }
`;

const StyledContainer = styled(Container)`
    margin-top: 24px;
`;

const StyledInput = styled(FilledInput)`
    height: 64px;
    background-color: #F0F4EF;
    border-radius: 16px;
    text-align: center;
    padding: 20px;

    &:after {
        border-bottom: none;
    }

    & .MuiInputAdornment-root {
        margin: 0;
    }

    & .MuiInputBase-input {
        padding: 20px 24px;
    }

    @media (max-width: 834px) {
        max-width: 247px;
        width: 100%;
    }

    @media (max-width: 770px) {
        max-width: 770px;
        width: 100%;
        font-size: 14px;
        height: 47px;

        & .MuiInputBase-input {
            padding: 12px 14px;
        }
    }

    @media (max-width: 320px) {
        padding: 10px 10px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #F0F4EF;
`;

const StyledGridEnd = styled(Grid)`
    @media (max-width: 770px) {
        order: 2;
    }
`;

const StyledIcon = styledc.img`
  @media (max-width: 600px) {
      max-width: 100%;
  }
`;
