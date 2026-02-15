import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import DefaultAvatar from '@assets/img/dafault-avatar.svg';
import { AvatarIcon } from '@common/icons/avatar-icon';
import { CameraIcon } from '@common/icons/camera-icon';
import { HideIcon } from '@common/icons/hide-icon';
import { MailIcon } from '@common/icons/mail-icon';
import { ViewIcon } from '@common/icons/view-icon';
import { StyledRoundButton } from '@common/styled-round-button';
import {  useAppSelector } from '@redux/hooks';

// import { changeUserName, changeUserPassword } from '@redux/thunks/auth-thunk';
import { Box, Button, Container, Grid, type GridProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { ProfileFormType, } from '../../utils/types';
import { createRequiredValidator,profileValidateRepeatPassword, validatePassword  } from '../../utils/validators';

import { FormStyledInput } from './elements/form-styled-input';

const requiredNameValidator = createRequiredValidator('Name is required');
const requiredEmailValidator = createRequiredValidator('Email is required');

export const Profile = () => {
  const auth = useAppSelector(state => state.auth);

  // const dispatch = useAppDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isUserInfoDirty, setIsUserInfoDirty] = useState(false);
  const [isUserPasswordDirty, setIsUserPasswordDirty] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue
  } = useForm<ProfileFormType>({
    defaultValues: {
      fullName: auth.user?.fullName || '',
      email: auth.user?.email,
      oldPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
  });

  useEffect(() => {
    if (!isUserInfoDirty) {
      clearErrors('fullName');
    }
  }, [clearErrors, isUserInfoDirty]);

  const handleToggleOldPassword = () => {
    setShowOldPassword((prevState) => !prevState);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };


  const handleInformationStyledButton = () => {
    if (isUserInfoDirty) {
      setValue('fullName', auth.user?.fullName || '');
    }

    setIsUserInfoDirty((prevState) => !prevState);
  };

  const handlePasswordStyledButton = () => {
    if (isUserPasswordDirty) {
      setValue('oldPassword', '');
      setValue('newPassword', '');
      setValue('repeatPassword', '');
    }

    setIsUserPasswordDirty((prevState) => !prevState);
  };


  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
    console.log(data);

    if (data.fullName.trim()) {
      // dispatch(changeName)
    }

    if (data.newPassword.trim()) {
      // dispatch(changePassword)
    }
  };

  // if (isUserPasswordDirty) {
  //   if (!oldPassword.trim()) {
  //     sethelperErrorOldPasswordText('Please fill out this field');
  //
  //     return;
  //   }
  //
  //   if (!newPassword.trim()) {
  //     sethelperErrorNewPasswordText('Please fill out this field');
  //
  //     return;
  //   }
  //
  //   if (!repeatPassword.trim()) {
  //     sethelperErrorRepeatPasswordText('Please fill out this field');
  //
  //     return;
  //   }
  //
  //   if (!(newPassword === repeatPassword)) {
  //     sethelperErrorRepeatPasswordText('Password doesn`t match the new password');
  //
  //     return;
  //   }
  // }

  // if (isUserInfoDirty) {
  //   setIsUserInfoDirty(false);
  // }
  //
  // if (userFullName) {
  //   dispatch(changeUserName({ fullName: userFullName }));
  // }
  //
  // if (oldPassword && newPassword) {
  //   dispatch(changeUserPassword({ oldPassword, newPassword }));
  // }
  // };

  return (
    <StyledMain>
      <Container maxWidth="md">
        <Grid container gap={3}>
          <StyledAvatarGrid size={3}>
            <img src={DefaultAvatar} alt="default avatar" />
            <StyledRoundButtonBox>
              <StyledRoundButton icon={<CameraIcon />} />
            </StyledRoundButtonBox>
          </StyledAvatarGrid>

          <Grid size={{ lg: 1, md: 0 }} />

          <StyledProfileInformationGrid
            size={{ lg: 6, sm: 12 }}
            component="form"
            noValidate="novalidate"
            onSubmit={handleSubmit(onSubmit)}
          >
            <StyledBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Personal information</Typography>

                <StyledButton onClick={handleInformationStyledButton}>
                  {isUserInfoDirty ? 'Cancel' : 'Change information'}
                </StyledButton>
              </StyledInformationHeaderBox>

              <FormStyledInput
                name="fullName"
                control={control}
                rules={{ validate: isUserInfoDirty ? requiredNameValidator : undefined }}
                icon={ <AvatarIcon /> }
                type="text"
                label="Your name"
                disabled={!isUserInfoDirty}
                errorText={errors.fullName?.message}
              />

              <FormStyledInput
                name="email"
                control={control}
                rules={{ validate: isUserInfoDirty ? requiredEmailValidator : undefined }}
                icon={ <MailIcon /> }
                type="email"
                label="Your email"
                disabled={true}
              />
            </StyledBox>

            <StyledBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Password</Typography>

                <StyledButton
                  onClick={handlePasswordStyledButton}
                >
                  {isUserPasswordDirty ? 'Cancel' : 'Change password'}
                </StyledButton>
              </StyledInformationHeaderBox>

              <FormStyledInput
                name="oldPassword"
                control={control}
                rules={{ validate: isUserPasswordDirty ? validatePassword : undefined }}
                icon={ showOldPassword
                  ? <ViewIcon onClick={handleToggleOldPassword} />
                  : <HideIcon onClick={handleToggleOldPassword} />
                }
                type={ showOldPassword ? 'text' : 'password' }
                label="Old password"
                disabled={!isUserInfoDirty}
                helperText={isUserPasswordDirty ? 'Enter your old password' : ''}
                errorText={errors.oldPassword?.message}

              />

              {isUserPasswordDirty && (
                <>
                  <FormStyledInput
                    name="newPassword"
                    control={control}
                    rules={{ validate: isUserPasswordDirty ? validatePassword : undefined }}
                    icon={ showNewPassword
                      ? <ViewIcon onClick={handleToggleNewPassword} />
                      : <HideIcon onClick={handleToggleNewPassword} />
                    }
                    type={ showNewPassword ? 'text' : 'password' }
                    label="New password"
                    disabled={!isUserPasswordDirty}
                    helperText={isUserPasswordDirty ? 'Enter your new password' : ''}
                    errorText={errors.newPassword?.message}
                  />

                  <FormStyledInput
                    name="repeatPassword"
                    control={control}
                    rules={{ validate: isUserPasswordDirty ? profileValidateRepeatPassword : undefined }}
                    icon={ showRepeatPassword
                      ? <ViewIcon onClick={handleToggleRepeatPassword} />
                      : <HideIcon onClick={handleToggleRepeatPassword} />
                    }
                    type={ showRepeatPassword ? 'text' : 'password' }
                    label="Password replay"
                    disabled={!isUserPasswordDirty}
                    helperText={isUserPasswordDirty ? 'Repeat your password without errors' : ''}
                    errorText={errors.repeatPassword?.message}
                  />
                </>
              )}
            </StyledBox>

            {(isUserInfoDirty || isUserPasswordDirty) && (
              <StyledConfirmButton type="submit">
                Confirm
              </StyledConfirmButton>
            )}
          </StyledProfileInformationGrid>
        </Grid>
      </Container>
    </StyledMain>
  );
};

const StyledMain = styled('main')`
  padding: 36px 0 100px 0;
`;

const StyledProfileInformationGrid = styled(Grid)<GridProps & { noValidate?: string }>`
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