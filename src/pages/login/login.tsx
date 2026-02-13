import { type ChangeEventHandler, type SubmitEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ReadingMan from '@assets/img/reading-man.svg';
import { StyledButton } from '@common/styled-button.tsx';
import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput } from '@common/styled-input.tsx';
import { useAppDispatch } from '@redux/hooks.ts';
import { loginUser } from '@redux/thunks/auth-thunk.ts';
import styledc from 'styled-components';

import { Box, type BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { checkValidEmail } from '../../utils';

export const Login = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

   const clearErrors = () => {
    setLoginError('');
    setEmailError('');
  };

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();
    
    clearErrors();

    if (!user.email.trim() || !checkValidEmail(user.email)) {
      setEmailError('Incorrect email');

      return;
    }

    dispatch(loginUser({ email: user.email, password: user.password }))
      .unwrap()
      .then(() => {
        setUser({ email: '', password: '' });
        clearErrors();
      })
      .then(() => navigate(from, { replace: true }))
      .catch((e) => {
        if (e.response.data.message === 'Incorrect password or email') {
          setLoginError('Incorrect password or email')
        }
      });
  };

  const handleEmailInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const handlePasswordInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  return (
    <StyledMain>
      <StyledContainer maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox component="form" noValidate="novalidate" onSubmit={handleSubmit}>
            <Typography variant="h1">Log In</Typography>

            <StyledFormInputBox>
              <StyledInput
                type="email"
                label="Email"
                errorText={emailError || loginError}
                helperText="Enter your email"
                value={user.email}
                onChange={handleEmailInputChange}
              />

              <StyledInput
                type="password"
                label="Password"
                errorText={loginError}
                helperText="Enter your password"
                value={user.password}
                onChange={handlePasswordInputChange}
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