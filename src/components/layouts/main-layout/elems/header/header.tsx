import { Link } from 'react-router';
import Logo from '@assets/img/logo.svg';
import Search from '@assets/img/search.svg';
import { StyledContainer } from '@common/styled-container.tsx';
import styledc from 'styled-components';
import { StyledRoundButton } from '@common/ styled-round-button';
import { CartIcon } from '@common/icons/cart-icon';
import { HeartIcon } from '@common/icons/heart-icon';
import { ProfileIcon } from '@common/icons/profile-icon'

import {
  Button,
  FilledInput,
  Grid,
  InputAdornment,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../../../../redux/hooks.ts';

export const Header = () => {

  const auth = useAppSelector((state) => state.auth);

  return (
    <StyledHeader>
      <StyledContainer>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid size={{ xl: 1, lg: 2 }}>
            <StyledIcon src={Logo} alt="book room" />
          </Grid>

          <StyledGridEnd size={{ lg: 7, md: 6, sm: 4, xs: 12 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Catalog
            </Typography>

            <StyledInput
              fullWidth={true}
              disableUnderline={true}
              startAdornment={
                <InputAdornment position="start">
                  <img src={Search} alt="Search" />
                </InputAdornment>
              }
              placeholder="Search"
            />
          </StyledGridEnd>

          <Grid size={{ md: 'auto', sm: 4, xs: 'auto' }}>
            {auth.isAuth
              ? (
                <StyledBox>
                  <StyledAuthLink to="#">
                    <StyledRoundButton icon={<CartIcon />} />
                  </StyledAuthLink>
                  <StyledAuthLink to="#">
                    <StyledRoundButton icon={<HeartIcon />} />
                  </StyledAuthLink>
                  <StyledAuthLink to="/profile">
                    <StyledRoundButton icon={<ProfileIcon />} />
                  </StyledAuthLink>
                </StyledBox>
              ) : (
                <StyledButton variant="contained">
                  <StyledLink to="/login">Log In</StyledLink>
                  /
                  <StyledLink to="/register">Sign Up</StyledLink>
                </StyledButton>
              )
            }
          </Grid>
        </Grid>
      </StyledContainer>
    </StyledHeader>
  );
};

const StyledHeader = styledc.header`
  padding: 24px 0;
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  width: 230px;
  height: 44px;
  text-transform: none;

  @media (max-width: 600px) {
    width: 140px;
    height: 38px;
    padding: 10px 17px;
    align-items: normal;
  }
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

  @media (max-width: 600px) {
    width: 135px;
    height: 38px;
    font-size: 12px;
  }
`;

const StyledGridEnd = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 770px) {
    order: 2;
  }
`;

const StyledIcon = styledc.img`
  @media (max-width: 600px) {
      max-width: 100%;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const StyledAuthLink = styled(Link)`
  width: 48px;
`;
