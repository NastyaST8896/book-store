import { Button, Container, FilledInput, FormControl, Grid, InputAdornment, } from '@mui/material';
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
          <Grid size={1}>
            <img src={Logo} alt="book room" />
          </Grid>
          <Grid size={6}>
            <Grid
              container
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Grid size={1}>Catalog</Grid>
              <Grid size={11}>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid size={3}>
            <StyledButton variant="contained">Log In/ Sing Up</StyledButton>
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
`;

const StyledContainer = styled(Container)`
    margin-top: 24px;
`;

const StyledInput = styled(FilledInput)`
    height: 64px;
    background-color: #F0F4EF;
    border-radius: 16px;
    text-align: center;
    border: none;
`;

