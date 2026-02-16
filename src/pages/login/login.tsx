import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import ReadingMan from '@assets/img/reading-man.svg';
import { StyledButton } from '@common/styled-button';
import { useAppDispatch } from '@redux/hooks';
import { loginUser } from '@redux/auth/thunk';
import { Box, type BoxProps, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { LoginFormType } from '../../utils/types.ts';
import { IN_APP_ROUTES } from '@utils/routes';
import { createRequiredValidator } from '@utils/validators/required-validator';
import { MailIcon } from '@common/icons/mail-icon';
import { FormStyledInput } from './elements/form-styled-input';
import { ViewIcon } from '@common/icons/view-icon';
import { HideIcon } from '@common/icons/hide-icon';

const requiredEmailValidator = createRequiredValidator('Email is required');
const requiredPasswordValidator = createRequiredValidator('Password is required');

export const Login = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || IN_APP_ROUTES.home.path;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
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

    console.log(data);

    if (data.email.trim() && data.password.trim()) {
      dispatch(loginUser({ email: data.email, password: data.password }))
        .unwrap()
        .then(() => {
          setValue('email', '');
          setValue('password', '');
        })
        .then(() => navigate(from, { replace: true }));
    }

    //   dispatch(loginUser({ email: user.email, password: user.password }))
    //     .unwrap()
    //     .then(() => {
    //       setUser({ email: '', password: '' });
    //       clearErrors();
    //     })
    //     .then(() => navigate(from, { replace: true }))
    //     .catch((e) => {
    //       if (e.response.data.message === 'Incorrect password or email') {
    //         setLoginError('Incorrect password or email');
    //       }
    //     });
  }

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

            <StyledSignUpButton
              type="submit"
              variant="contained"
            >
              Log In
            </StyledSignUpButton>
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
  gap: 60px;
  max-width: 413px;
  width: 100%;
`;

const StyledFormInputBox = styled(StyledFormBox)`
  gap: 30px;
`;

const StyledSignUpButton = styled(StyledButton)`
  width: 166px;
`;