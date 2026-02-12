import { Link } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

type PrivateRouteProps = {
  children: React.JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const auth = useAppSelector(state => state.auth);

  if(!auth.isAuth) {
    return (
      <>
        <Typography variant="h1">Log in to your account or register</Typography>
        <StyledButton variant="contained">
            <StyledLink to="/login">Log In</StyledLink>
            /
            <StyledLink to="/register">Sign Up</StyledLink>
        </StyledButton>
      </>
    )
  }

  return children
}

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #F0F4EF;

  @media (max-width: 600px) {
    width: 135px;
    height: 38px;
    font-size: 12px;
  }
`;