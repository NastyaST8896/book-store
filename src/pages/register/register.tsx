import { type ChangeEventHandler, type SubmitEventHandler, useState } from 'react';
import ReadingMan from '@assets/img/reading-man.svg';
import { StyledButton } from '@common/styled-button.tsx';
import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput } from '@common/styled-input.tsx';
import { useAppDispatch, useAppSelector } from '@redux/hooks.ts';
import { registerUser } from '@redux/thunks/auth-thunk.ts';
import styledc from 'styled-components';

import { Box, type BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { checkValidEmail } from '../../utils';


export const Register = () => {
  const auth = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const [user, setUser] = useState({ email: '', password: '', repeatPassword: '' });
  const [emailError, setEmailError] = useState('');

  const clearErrors = () => {
    setEmailError('');
  };

  const handleEmailInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const handlePasswordInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  const handleRepeatPasswordInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({ ...user, repeatPassword: event.target.value });
  };

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();

    clearErrors();

    if ( !user.email.trim() || !checkValidEmail(user.email)) {
      setEmailError('Incorrect email');

      return;
    }

    dispatch(registerUser({ email: user.email, password: user.password }))
      .unwrap()
      .then(() => {
        setUser({ email: '', password: '', repeatPassword: '' });
        clearErrors();
      })
      .catch((e) => {
        if (e.response.data.message === 'This email has already taken') {
          setEmailError(e.response.data.message);
        }

        if(e.response.data.message === 'Incorrect email address') {
          setEmailError(e.response.data.message);
        }
      });
  };

  return (
    <StyledMain>
      <StyledContainer maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox component="form" noValidate="novalidate" onSubmit={handleSubmit}>
            <Typography variant="h1">Sign Up</Typography>

            <StyledFormInputBox>
              <StyledInput
                type="email"
                errorText={emailError}
                label="Email"
                helperText="Enter your email"
                value={user.email}
                onChange={handleEmailInputChange}
              />

              <StyledInput
                type="password"
                label="Password"
                helperText="Enter your password"
                value={user.password}
                onChange={handlePasswordInputChange}
              />

              <StyledInput
                type="password"
                label="Repeat Password"
                helperText="Repeat your password without errors"
                value={user.repeatPassword}
                onChange={handleRepeatPasswordInputChange}
              />
            </StyledFormInputBox>

            <StyledSignUpButton
              type="submit"
              variant="contained"
              disabled={auth.loading}
            >
              Sign Up
            </StyledSignUpButton>
          </StyledFormBox>

          <img src={ReadingMan} alt="Reading man" />
        </StyledRegisterBox>
      </StyledContainer>
    </StyledMain>
  );
};

const StyledMain = styledc.main`
  padding: 90px 0;
`;

const StyledRegisterBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFormBox = styled(Box)<BoxProps & { noValidate?: string }>`
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