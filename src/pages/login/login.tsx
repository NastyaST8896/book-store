import Mail from '@assets/img/mail.png';
import View from '@assets/img/view.png';
import { StyledButton } from '@common/styled-button.tsx';
import { StyledContainer } from '@common/styled-container.tsx';
import styledc from 'styled-components';
import ReadingMan from '@assets/img/reading-man.svg';

import {
  Box,
  FormHelperText,
  TextField, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const Login = () => {
  return (
    <StyledMain>
      <StyledContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
          <Box sx={{ maxWidth: '413px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
            <Typography variant="h1">Log In</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <Box sx={{ maxWidth: '413px', width: '100%' }}>
                <StyledBox
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, height: '64px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '64px' }}>
                    <img src={Mail} alt="mail" />
                  </Box>
                  <TextField
                    sx={{ height: '58px' }}
                    id="email-input"
                    label="Email"
                    variant="standard"
                    slotProps={{
                      input: {
                        disableUnderline: true
                      }
                    }}
                  />
                </StyledBox>
                <FormHelperText sx={{ marginLeft: '16px' }} id="filled-weight-helper-text">Enter your
                  email</FormHelperText>
              </Box>

              <Box>
                <StyledBox
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, height: '64px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '64px' }}>
                    <img src={View} alt="view" />
                  </Box>
                  <TextField
                    type="password"
                    sx={{ height: '58px' }}
                    id="password-input"
                    label="Password"
                    variant="standard"
                    slotProps={{
                      input: {
                        disableUnderline: true,
                      },
                    }}
                  />
                </StyledBox>
                <FormHelperText sx={{ marginLeft: '16px' }} id="filled-weight-helper-text">Enter your
                  password</FormHelperText>
              </Box>
            </Box>

            <StyledButton sx={{ width: '166px' }} variant="contained">
              Log In
            </StyledButton>
          </Box>

          <img src={ReadingMan} alt="Reading man" />
        </Box>
      </StyledContainer>
    </StyledMain>
  );
};

const StyledMain = styledc.main`
  padding: 90px 0;
`;

const StyledBox = styled(Box)`
  max-width: 413px;
  width: 100%;
  display: flex;
  align-items: start;
  gap: 24px;
  height: 64px;
  background: #F0F4EF;
  padding: 6px 24px;
  border-radius: 16px;
`;