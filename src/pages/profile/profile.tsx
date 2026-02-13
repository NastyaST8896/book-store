import { useState } from 'react';
import DefaultAvatar from '@assets/img/dafault-avatar.svg';
import { StyledRoundButton } from '@common/ styled-round-button';
import { CameraIcon } from '@common/icons/camera-icon';
import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput, type StyledInputProps } from '@common/styled-input.tsx';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';
import { changeUserName, changeUserPassword } from '@redux/thunks/auth-thunk.ts';
import styledc from 'styled-components';

import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Profile = () => {
  const auth = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  // UserInfo: fullName
  const [isUserInfoDirty, setIsUserInfoDirty] = useState(false);
  const [userFullName, setUserFullName] = useState(auth.user?.fullName);
  const [helperErrorFullNameText, setHelperErrorFullNameText] = useState('');



  //UserPassword
  const [isUserPasswordDirty, setIsUserPasswordDirty] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // hide\show passport
  const [
    oldPasswordType,
    setOldPasswordType
  ] = useState<StyledInputProps['type']>('password');
  const [
    newPasswordType,
    setNewPasswordType
  ] = useState<StyledInputProps['type']>('password');
  const [
    repeatPasswordType,
    setRepeatPasswordType
  ] = useState<StyledInputProps['type']>('password');

  // change password 
  const [
    helperErrorOldPasswordText,
    sethelperErrorOldPasswordText
  ] = useState('');
  const [
    helperErrorNewPasswordText,
    sethelperErrorNewPasswordText
  ] = useState('');
  const [
    helperErrorRepeatPasswordText,
    sethelperErrorRepeatPasswordText
  ] = useState('');


  const clearErrors = () => {
    setHelperErrorFullNameText('');
    sethelperErrorOldPasswordText('');
    sethelperErrorNewPasswordText('');
    sethelperErrorRepeatPasswordText('');
  };

  const handleInformationStyledButton = () => {
    if (isUserInfoDirty) {
      setUserFullName(auth.user?.fullName);
    }

    setIsUserInfoDirty((prevState) => !prevState);
  };
  const handleUserNameChange: StyledInputProps['onChange'] = (event) => {
    setUserFullName(event.target.value);
  };


  const handlePasswordStyledButton = () => {
    if (isUserPasswordDirty) {
      setOldPassword('');
      setNewPassword('');
      setRepeatPassword('');
    }

    setIsUserPasswordDirty((prevState) => !prevState);
  };

  const handleOldPasswordType = () => {
    if (oldPasswordType === 'password') {
      setOldPasswordType('text');
    } else if (oldPasswordType === 'text') {
      setOldPasswordType('password');
    }
  };
  const handleNewPasswordType = () => {
    if (newPasswordType === 'password') {
      setNewPasswordType('text');
    } else if (newPasswordType === 'text') {
      setNewPasswordType('password');
    }
  };
  const handleRepeatPasswordType = () => {
    if (repeatPasswordType === 'password') {
      setRepeatPasswordType('text');
    } else if (repeatPasswordType === 'text') {
      setRepeatPasswordType('password');
    }
  };

  const handleOldPasswordChange: StyledInputProps['onChange'] = (event) => {
    setOldPassword(event.target.value)
  };
  const handleNewPasswordChange: StyledInputProps['onChange'] = (event) => {
    setNewPassword(event.target.value)
  };
  const handleRepeatPasswordChange: StyledInputProps['onChange'] = (event) => {
    setRepeatPassword(event.target.value)
  };


  const handleConfirmButtonClick = () => {

    clearErrors();

    if (isUserInfoDirty) {
      if (!userFullName.trim()) {
        setHelperErrorFullNameText('Name is not correct');

        return
      }
    }

    if (isUserPasswordDirty) {
      if (!oldPassword.trim()) {
        sethelperErrorOldPasswordText('Please fill out this field');

        return
      }

      if (!newPassword.trim()) {
        sethelperErrorNewPasswordText('Please fill out this field');

        return
      }

      if (!repeatPassword.trim()) {
        sethelperErrorRepeatPasswordText('Please fill out this field');

        return
      }

      if (!(newPassword === repeatPassword)) {
        sethelperErrorRepeatPasswordText('Password doesn`t match the new password');

        return
      }
    }

    if (isUserInfoDirty) {
      setIsUserInfoDirty(false);
    }

    if(userFullName) {
      dispatch(changeUserName({ fullName: userFullName }));
    }

    if(oldPassword && newPassword) {
      dispatch(changeUserPassword({ oldPassword, newPassword }));
    }
  };

  return (
    <StyledMain>
      <StyledContainer>
        <Grid container gap={3}>
          <StyledAvatarGrid size={3}>
            <img src={DefaultAvatar} alt="default avatar" />
            <StyledRoundButtonBox>
              <StyledRoundButton icon={<CameraIcon />} />
            </StyledRoundButtonBox>
          </StyledAvatarGrid>

          <Grid size={{ lg: 1, md: 0 }} />

          <StyledProfileInformationGrid size={{ lg: 6, sm: 12 }}>
            <StyledBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Personal information</Typography>

                <StyledButton onClick={handleInformationStyledButton}>
                  {isUserInfoDirty ? "Cancel" : "Change information"}
                </StyledButton>
              </StyledInformationHeaderBox>

              <StyledInput
                type="text"
                isPasswordInput={false}
                label="Your name"
                value={userFullName}
                disabled={!isUserInfoDirty}
                onChange={handleUserNameChange}
                errorText={helperErrorFullNameText}
              />

              <StyledInput
                type="email"
                label="Your email"
                value={auth.user?.email}
                disabled={true}
              />
            </StyledBox>

            <StyledBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Password</Typography>

                <StyledButton
                  onClick={handlePasswordStyledButton}
                >
                  {isUserPasswordDirty ? "Cancel" : "Change password"}
                </StyledButton>
              </StyledInformationHeaderBox>

              <StyledInput
                type={oldPasswordType}
                isPasswordInput={true}
                label="Old password"
                errorText={helperErrorOldPasswordText}
                helperText={isUserPasswordDirty ? "Enter your password" : ""}
                value={oldPassword}
                onChange={handleOldPasswordChange}
                disabled={!isUserPasswordDirty}
                onClick={handleOldPasswordType}
              />

              {isUserPasswordDirty && (
                <>
                  <StyledInput
                    type={newPasswordType}
                    isPasswordInput={true}
                    label="New password"
                    errorText={helperErrorNewPasswordText}
                    helperText="Enter your password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    disabled={!isUserPasswordDirty}
                    onClick={handleNewPasswordType}
                  />

                  <StyledInput
                    type={repeatPasswordType}
                    isPasswordInput={true}
                    label="Password replay"
                    errorText={helperErrorRepeatPasswordText}
                    helperText="Repeat your password without errors"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    disabled={!isUserPasswordDirty}
                    onClick={handleRepeatPasswordType}
                  />
                </>
              )
              }

            </StyledBox>

            {(isUserInfoDirty || isUserPasswordDirty) && (
              <StyledConfirmButton onClick={handleConfirmButtonClick}>
                Confirm
              </StyledConfirmButton>
            )}
          </StyledProfileInformationGrid>
        </Grid>
      </StyledContainer>
    </StyledMain>
  );
};

const StyledMain = styledc.main`
  padding: 36px 0 100px 0;
`;

const StyledProfileInformationGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 522px;
  width: 100%;

  @media (max-width: 770px) {
    max-width: none;
    width: 100%;
  }
`;

const StyledButton = styled(Button)(({ theme }) => `
  color: ${theme.palette.appColor.darkGreen};
  font-weight: 500;
  font-size: 12px;
  padding: 0;
  border-bottom: 1px solid #8D9F4F;
  line-height: 1;
  text-transform: none;

  &:hover {
    color: ${theme.palette.appColor.green}
  }
`);

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInformationHeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledConfirmButton = styled(Button)(({ theme }) => `
  border-radius: 16px;
  max-width: 170px;
  width: 100%;
  text-transform: none;
  background-color: ${theme.palette.appColor.darkBlue};
  color: ${theme.palette.appColor.white};
  padding: 10px 50px;

  &:hover {
    background-color: ${theme.palette.appColor.dark};
  }
`);

const StyledAvatarGrid = styled(Grid)(({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 305px;
  width: 100%;
  height: 305px;
  border-radius: 16px;
  background-color: ${theme.palette.appColor.light};
  position: relative;
`);

const StyledRoundButtonBox = styled(Box)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 48px;
`;