import { Link } from 'react-router';
import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput } from '@common/styled-input.tsx';
import styledc from 'styled-components';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks';


export const Profile = () => {

  const auth = useAppSelector(state => state.auth);

  return (
    <>
    { auth.isAuth ? (
      <StyledMain>
        <StyledContainer>
          <StyledAvatarBox>

          </StyledAvatarBox>

          <StyledProfileInformationBox>
            <StylePersonalInformationBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Personal information</Typography>

                <Link to='#'>Change information</Link>
              </StyledInformationHeaderBox>

              <StyledInput
                type="text"
                label="Your name"
                // helperText="Enter your password"
                value="name"
                // onChange={handlePasswordInputChange}
              />

              <StyledInput
                type="email"
                label="Your email"
                // helperText="Enter your email"
                value="email"
                // onChange={handleEmailInputChange}
              />
            </StylePersonalInformationBox>

            <StyledPasswordBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Password</Typography>

                <Link to='#'>Change password</Link>
              </StyledInformationHeaderBox>

              <StyledInput
                type="password"
                label="Old password"
                // helperText="Enter your password"
                value="password"
                // onChange={handlePasswordInputChange}
              />

              <StyledInput
                type="password"
                label="New password"
                helperText="Enter your password"
                value=''
                // onChange={handleEmailInputChange}
              />

              <StyledInput
                type="password"
                label="Password replay"
                helperText="Repeat your password without errors"
                value=""
                // onChange={handleEmailInputChange}
              />
            </StyledPasswordBox>

            <StyledConfirmButton>
              Confirm
            </StyledConfirmButton>
          </StyledProfileInformationBox>
        </StyledContainer>
      </StyledMain>
    ) : (
      <>
        <Typography variant="h1">Log in to your account or register</Typography>
        <StyledButton variant="contained">
            <StyledLink to="/login">Log In</StyledLink>
            /
            <StyledLink to="/register">Sign Up</StyledLink>
        </StyledButton>
      </>
    )}
    </>
  );
};

const StyledMain = styledc.main`
  padding: 36px 0 100px 0;
`;

const StyledProfileInformationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StylePersonalInformationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 522px;
  width: 100%;
`;

const StyledPasswordBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 522px;
  width: 100%;
`;

const StyledInformationHeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledConfirmButton = styled(Button)`
  border-radius: 16px;
  max-width: 170px;
  width: 100%;
  text-transform: none;
  background-color: ${({ theme }) => theme.palette.appColor.darkBlue};
  color: ${({ theme }) => theme.palette.appColor.white};
  padding: 10px 50px;
`;

const StyledAvatarBox = styled(Box)`
  width: 305px;
  height: 305px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.appColor.light};
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #F0F4EF;

  @media (max-width: 600px) {
    width: 135px;
    height: 38px;
    font-size: 12px;
  }
`;