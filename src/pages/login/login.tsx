// import { type ChangeEventHandler, type SubmitEventHandler, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import ReadingMan from '@assets/img/reading-man.svg';
import { StyledButton } from '@common/styled-button';
import { StyledInput } from '@common/styled-input';

// import { useAppDispatch } from '@redux/hooks';
// import { loginUser } from '@redux/thunks/auth-thunk';
import { Box, type BoxProps, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { LoginFormType } from '../../utils/types.ts';

export const Login = () => {
  // const dispatch = useAppDispatch();
  // const [user, setUser] = useState({ email: '', password: '' });
  // const [loginError, setLoginError] = useState('');
  // const [emailError, setEmailError] = useState('');
  //
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';
  //
  // const clearErrors = () => {
  //   setLoginError('');
  //   setEmailError('');
  // };

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {

    console.log(data);

    //   clearErrors();

    // if (!user.email.trim() || !checkValidEmail(user.email)) {
    //   setEmailError('Incorrect email');
    //
    //   return;
    // }

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
  };

  // const handleEmailInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setUser({ ...user, email: event.target.value });
  // };
  //
  // const handlePasswordInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setUser({ ...user, password: event.target.value });
  // };

  return (
    <StyledMain>
      <Container maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox component="form" noValidate="novalidate" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h1">Log In</Typography>

            <StyledFormInputBox>

              <Controller
                name="email"
                control={control}
                rules={{
                  validate: (email) => {
                    if (!email.trim()) {
                      return 'Email is required';
                    }
                  }
                }}
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="email"
                    label="Email"
                    helperText="Enter your email"
                    errorText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  validate: (password) => {
                    if (!password.trim()) {
                      return 'Password is required';
                    }
                  }
                }}
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="password"
                    label="Password"
                    helperText="Enter your password"
                    errorText={errors.password?.message}
                  />
                )}
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