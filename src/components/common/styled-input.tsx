import React, { type ChangeEventHandler, type ReactElement } from 'react';
import { HideIcon } from '@common/icons/hide-icon.tsx';
import { MailIcon } from '@common/icons/mail-icon.tsx';
import { ViewIcon } from '@common/icons/view-icon.tsx';

import { Box, FormHelperText, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AvatarIcon } from '@common/icons/avatar-icon.tsx';

type StyledInputProps = {
  type?: 'text' | 'search' | 'email' | 'password';
  helperText?: string;
  value?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isPasswordInput?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const StyledInput = (props: StyledInputProps) => {
  const {
    type = 'text',
    helperText,
    value,
    onChange,
    label,
    disabled = false,
    isPasswordInput,
    onClick
  } = props;

  let icon: ReactElement | null;

  const selectionIcon = () => {
    if(isPasswordInput) {
      return <ViewIcon />;
    }
    return <AvatarIcon />
  }

  switch (type) {
    case 'email':
      icon = <MailIcon />;
      break;
    case 'password':
      icon = <HideIcon />;
      break;
    case 'text':
      icon = selectionIcon();
      break;
    default:
      icon = null;
  }

  return (
    <Box>
      <StyledInputBox className="input-box">
        <StyledImgBox>
          <IconButton 
          disabled={isPasswordInput ? false : true} 
          onClick={onClick}
          >
            {icon}
          </IconButton>
        </StyledImgBox>

        <StyledTextField
          disabled={disabled}
          fullWidth
          autoComplete="off"
          label={label}
          variant="standard"
          value={value}
          type={type}
          isPasswordInput={isPasswordInput}
          onChange={onChange}
          slotProps={{
            input: {
              disableUnderline: true
            }
          }}
        />
      </StyledInputBox>

      {helperText && <StyledFormHelperText>{helperText}</StyledFormHelperText>}
    </Box>
  );
};

const StyledInputBox = styled(Box)(({ theme }) => `
  display: flex;
  height: 64px;
  width: 100%;
  align-items: start;
  gap: 24px;
  background: #F0F4EF;
  padding: 6px 24px;
  border-radius: 16px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid ${theme.palette.appColor.darkBlue};
  }
`);

const StyledImgBox = styled(Box)`
  display: flex;
  align-items: center;
  height: 55px;
`;

const StyledTextField = styled(TextField)(({ theme }) => `
  & .MuiInputBase-input {
    color: ${theme.palette.appColor.darkBlue};

     &.Mui-disabled {
      -webkit-text-fill-color: ${theme.palette.appColor.darkBlue};
    }
  }

  & .MuiInputLabel-root {
    color: ${theme.palette.appColor.darkGrey};
    top: -4px;
    
    &.Mui-focused {
      color: ${theme.palette.appColor.darkBlue};
      transform: translate(0, 2px) scale(0.75);
    }

    &.Mui-disabled {
      color: ${theme.palette.appColor.darkBlue};
    }
  }
`);

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => `
  color: ${theme.palette.appColor.darkBlue};
  font-size: 14px;
`);
