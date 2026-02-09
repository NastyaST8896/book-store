import { Link } from 'react-router';
import { StyledContainer } from '@common/styled-container.tsx';
import { StyledInput } from '@common/styled-input.tsx';
import styledc from 'styled-components';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Profile = () => {
  return (
    <>
      <StyledMain>
        <StyledContainer>
          <StyledAvatarBox>

          </StyledAvatarBox>

          <StyledProfileInformationBox>
            <StylePersonalInformationBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Personal information</Typography>

                <Link to='#'>Change information</Link>
              </StyledInformationHeaderBox>

              <StyledInput
                type="text"
                label="Your name"
                // helperText="Enter your password"
                value="name"
                // onChange={handlePasswordInputChange}
              />

              <StyledInput
                type="email"
                label="Your email"
                // helperText="Enter your email"
                value="email"
                // onChange={handleEmailInputChange}
              />
            </StylePersonalInformationBox>

            <StyledPasswordBox>
              <StyledInformationHeaderBox>
                <Typography variant="h2">Password</Typography>

                <Link to='#'>Change password</Link>
              </StyledInformationHeaderBox>

              <StyledInput
                type="password"
                label="Old password"
                // helperText="Enter your password"
                value="password"
                // onChange={handlePasswordInputChange}
              />

              <StyledInput
                type="password"
                label="New password"
                helperText="Enter your password"
                value=''
                // onChange={handleEmailInputChange}
              />

              <StyledInput
                type="password"
                label="Password replay"
                helperText="Repeat your password without errors"
                value=""
                // onChange={handleEmailInputChange}
              />
            </StyledPasswordBox>

            <StyledConfirmButton>
              Confirm
            </StyledConfirmButton>
          </StyledProfileInformationBox>
        </StyledContainer>
      </StyledMain>
    </>
  );
};

const StyledMain = styledc.main`
  padding: 36px 0 100px 0;
`;

const StyledProfileInformationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
`;

const StyledAvatarBox = styled(Box)`
  width: 305px;
  height: 305px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.appColor.light};;
`;