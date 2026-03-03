import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import ReadingMan from '@assets/img/reading-man.svg';
import { HideIcon } from '@common/icons/hide-icon';
import { MailIcon } from '@common/icons/mail-icon';
import { ViewIcon } from '@common/icons/view-icon';
import { StyledButton } from '@common/styled-button';
import { loginUser } from '@redux/auth/thunk';
import { useAppDispatch } from '@redux/hooks';
import { IN_APP_ROUTES } from '@utils/routes';
import type { LoginFormType } from '@utils/types.ts';
import { createRequiredValidator } from '@utils/validators/required-validator';

import { Box, type BoxProps, CircularProgress, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormStyledInput } from './elements/form-styled-input';

const requiredEmailValidator = createRequiredValidator('Email is required');
const requiredPasswordValidator = createRequiredValidator('Password is required');

export const Login = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [krutim, setKrutim] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || IN_APP_ROUTES.home.path;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {

    if (data.email.trim() && data.password.trim()) {
      dispatch(loginUser({ email: data.email, password: data.password }))
        .unwrap()
        .then(() => {
          reset();
        })
        .then(() => navigate(from, { replace: true }));
      // .catch((e) => {
      //   if (e.response.data.message === 'Incorrect password or email') {
      //     setLoginError('Incorrect password or email');
      //   }
      // });
    }
  };

  return (
    <StyledMain>
      <Container maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox
            component="form"
            noValidate="novalidate"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h1">Log In</Typography>

            <StyledFormInputBox>
              <FormStyledInput
                name="email"
                control={control}
                rules={{ validate: requiredEmailValidator }}
                icon={<MailIcon />}
                type="email"
                label="Email"
                helperText="Enter your email"
                errorText={errors.email?.message}
              />

              <FormStyledInput
                name="password"
                control={control}
                rules={{ validate: requiredPasswordValidator }}
                icon={showPassword
                  ? <ViewIcon onClick={handleTogglePassword} />
                  : <HideIcon onClick={handleTogglePassword} />
                }
                type={showPassword ? 'text' : 'password'}
                label="Password"
                helperText="Enter your password"
                errorText={errors.password?.message}

              />
            </StyledFormInputBox>

            <StyledButton type="submit">
              Log In
            </StyledButton>
          </StyledFormBox>

          <img src={ReadingMan} alt="Reading man" />
        </StyledRegisterBox>
      </Container>
    </StyledMain>
  );
};

const StyledMain = styled('main')`
  padding: 90px 0;
`;

const StyledRegisterBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFormBox = styled(Box) <BoxProps & { noValidate?: string }>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 60px;
  max-width: 413px;
  width: 100%;
`;

const StyledFormInputBox = styled(StyledFormBox)`
  gap: 30px;
`;
