import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput } from '@common/styled-input.tsx';
import styledc from 'styled-components';

import { Box, Button, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks';
import DefaultAvatar from '@assets/img/dafault-avatar.svg'
import { CameraIcon } from '@common/icons/camera-icon';
import { useState } from 'react';

export const Profile = () => {
  const [isUserInformationDirty, setIsUserInformationDirty] = useState(false);
  const [isUserPasswordDirty, setIsUserPasswordDirty] = useState(false);
  const [oldPasswordType, setOldPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');
  const [repeatPasswordType, setRepeatPasswordType] = useState('password');

  type InputType = "password" | "text";
  const auth = useAppSelector(state => state.auth);

  const handleInformationStyledButton = () => {
     setIsUserInformationDirty(true)
  }
  const handlePasswordStyledButton = () => {
     setIsUserPasswordDirty(true)
  }

  const handleInputOldPasswordType = () => {
    if (oldPasswordType === 'password') {
      setOldPasswordType('text')
    } else if (oldPasswordType === 'text') {
      setOldPasswordType('password')
    }
  }

    const handleNewPasswordType = () => {
    if (newPasswordType === 'password') {
      setNewPasswordType('text')
    } else if (newPasswordType === 'text') {
      setNewPasswordType('password')
    }
  }

    const handleRepeatPasswordType = () => {
    if (repeatPasswordType === 'password') {
      setRepeatPasswordType('text')
    } else if (repeatPasswordType === 'text') {
      setRepeatPasswordType('password')
    }
  }

  return (
    <>
    {/* { auth.isAuth ? ( */}
      <StyledMain>
        <StyledContainer>
          <StyledMainBox>
            <StyledAvatarBox>
              <img src={DefaultAvatar} alt="" />
              <StyledIconButton>
                <CameraIcon />
              </StyledIconButton>
            </StyledAvatarBox>

            <StyledProfileInformationBox>
              <StylePersonalInformationBox>
                <StyledInformationHeaderBox>
                  <Typography variant="h2">Personal information</Typography>

                  <StyledButton 
                  onClick={handleInformationStyledButton}
                  >
                    Change information
                  </StyledButton>
                </StyledInformationHeaderBox>

                <StyledInput
                  type="text"
                  isPasswordInput={false}
                  label="Your name"
                  // helperText="Enter your password"
                  value="name"
                  // onChange={handlePasswordInputChange}
                  disabled={isUserInformationDirty ? false : true}
                />

                <StyledInput
                  type="email"
                  label="Your email"
                  // helperText="Enter your email"
                  value="email"
                  // onChange={handleEmailInputChange}
                  disabled={isUserInformationDirty? false : true}
                />
              </StylePersonalInformationBox>

              <StyledPasswordBox>
                <StyledInformationHeaderBox>
                  <Typography variant="h2">Password</Typography>

                  <StyledButton 
                  onClick={handlePasswordStyledButton}
                  >
                    Change password
                  </StyledButton>
                </StyledInformationHeaderBox>

                <StyledInput
                  type={oldPasswordType as InputType}
                  isPasswordInput={true}
                  label="Old password"
                  // helperText="Enter your password"
                  value="password"
                  // onChange={handlePasswordInputChange}
                  disabled={isUserPasswordDirty ? false : true}
                  onClick={handleInputOldPasswordType}
                />

                { isUserPasswordDirty && (
                  <>
                    <StyledInput
                      type={newPasswordType as InputType}
                      isPasswordInput={true}
                      label="New password"
                      helperText="Enter your password"
                      value=''
                      // onChange={handleEmailInputChange}
                      disabled={isUserPasswordDirty ? false : true}
                      onClick={handleNewPasswordType}
                    />

                    <StyledInput
                      type={repeatPasswordType as InputType}
                      isPasswordInput={true}
                      label="Password replay"
                      helperText="Repeat your password without errors"
                      value=""
                      // onChange={handleEmailInputChange}
                      disabled={isUserPasswordDirty ? false : true}
                      onClick={handleRepeatPasswordType}
                    />
                  </>
                  )
                }
                
              </StyledPasswordBox>

              {(isUserInformationDirty || isUserPasswordDirty) && (
                <StyledConfirmButton>
                  Confirm
                </StyledConfirmButton>
              )}
            </StyledProfileInformationBox>
          </StyledMainBox>
        </StyledContainer>
      </StyledMain>
    {/* ) : ( */}
      {/* <>
        <Typography variant="h1">Log in to your account or register</Typography>
        <StyledButton variant="contained">
            <StyledLink to="/login">Log In</StyledLink>
            /
            <StyledLink to="/register">Sign Up</StyledLink>
        </StyledButton>
      </>
    )} */}
    </>
  );
};

const StyledMain = styledc.main`
  padding: 36px 0 100px 0;
`;

const StyledMainBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 128px;

  @media (max-width: 1000px) {
    gap: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledProfileInformationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledButton = styled(Button)`
  color:  ${({ theme }) => theme.palette.appColor.darkGreen};
  font-weight: 500;
  font-size: 12px;
  padding: 0;
  border-bottom: 1px solid #8D9F4F;
  line-height: 1;
  text-transform: none;

  &:hover {
    color:  ${({ theme }) => theme.palette.appColor.green}
  }
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

  &:hover {
    background-color: ${({ theme }) => theme.palette.appColor.dark};
  }
`;

const StyledAvatarBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 305px;
  height: 305px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.appColor.light};
  position: relative
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.appColor.darkBlue};
  max-width: 48px;
  width: 100%;
  height: 48px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #2c506ed0;
  }
`;
/* #0d182131 */

// const StyledButton = styled(Button)`
//   border-radius: 16px;
//   width: 230px;
//   height: 44px;
//   text-transform: none;

//   @media (max-width: 600px) {
//     width: 140px;
//     height: 38px;
//     padding: 10px 17px;
//     align-items: normal;
//   }
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: #F0F4EF;

//   @media (max-width: 600px) {
//     width: 135px;
//     height: 38px;
//     font-size: 12px;
//   }
// `;