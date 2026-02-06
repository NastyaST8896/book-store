import Mail from '@assets/img/mail.png';
import ReadingMan from '@assets/img/reading-man.svg';
import View from '@assets/img/view.png';
import { StyledButton } from '@common/styled-button.tsx';
import { StyledContainer } from '@common/styled-container.tsx';
import styledc from 'styled-components';

import {
  Box,
  FormHelperText,
  TextField, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from '../../redux/hooks.ts';
import { registerUser } from '../../redux/thunks/auth-thunk.ts';
import { useState } from 'react';

export const Register = () => {
  const dispatch = useAppDispatch();
  const [User, setUser] = useState({email:"", password:""})

  const handleRegisterButtonClick = () => {
    dispatch(registerUser({ email: User.email, password: User.password }));
    setUser({email:"", password:""})
  };

  const handleEmailInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setUser({...User, email: event.target.value });
  }

  const handlePasswordInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setUser({...User, password: event.target.value });
  }
  return (
    <StyledMain>
      <StyledContainer maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox>
            <Typography variant="h1">Sign Up</Typography>

            <StyledFormInputBox>
              <Box>
                <StyledInputBox>
                  <StyledImgBox>
                    <img src={Mail} alt="mail" />
                  </StyledImgBox>

                  <TextField
                    id="email-input"
                    label="Email"
                    variant="standard"
                    value={User.email}
                    onChange={handleEmailInputChange}
                    slotProps={{
                      input: {
                        disableUnderline: true
                      }
                    }}
                  />
                </StyledInputBox>

                <FormHelperText> Enter your email </FormHelperText>
              </Box>

              <Box>
                <StyledInputBox>
                  <StyledImgBox>
                    <img src={View} alt="view" />
                  </StyledImgBox>
                  <TextField
                    type="password"
                    id="password-input"
                    label="Password"
                    variant="standard"
                    value={User.password}
                    onChange={handlePasswordInputChange}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                      },
                    }}
                  />
                </StyledInputBox>
                <FormHelperText> Enter your password </FormHelperText>
              </Box>

              <Box>
                <StyledInputBox>
                  <StyledImgBox>
                    <img src={View} alt="view" />
                  </StyledImgBox>

                  <TextField
                    type="password"
                    id="password-replay-input"
                    label="Password replay"
                    variant="standard"
                    slotProps={{
                      input: {
                        disableUnderline: true
                      }
                    }}
                  />
                </StyledInputBox>

                <FormHelperText> 
                  Repeat your password without errors
                </FormHelperText>
              </Box>
            </StyledFormInputBox>

            <StyledSignUpButton
            variant="contained" 
            onClick={handleRegisterButtonClick}
            >
              Sign Up
            </StyledSignUpButton>
          </StyledFormBox>

          <img src={ReadingMan} alt="Reading man" />
        </StyledRegisterBox >
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

const StyledFormBox = styled(Box)`
  display: flex; 
  flex-direction: column; 
  gap: 60px;
  max-width: 413px;
  width: 100%;
`;

const StyledFormInputBox = styled(StyledFormBox)`
  gap: 30px;
`;

const StyledInputBox = styled(Box)`
  display: flex; 
  gap: 2; 
  height: 64px;
  max-width: 413px;
  width: 100%;
  align-items: start;
  gap: 24px;
  height: 64px;
  background: #F0F4EF;
  padding: 6px 24px;
  border-radius: 16px;
`;

const StyledImgBox = styled(Box)`
  display: flex; 
  align-items: center; 
  height: 55px;
`;

const StyledSignUpButton = styled(StyledButton)`
  width: 166px;
`;