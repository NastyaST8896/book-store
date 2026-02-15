import { type ChangeEventHandler, type ReactElement } from 'react';

import { Box, FormHelperText, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export type StyledInputProps = {
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  icon?: ReactElement;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: 'text' | 'search' | 'email' | 'password';
  value?: string;
};

export const StyledInput = (props: StyledInputProps) => {
  const {
    disabled = false,
    errorText,
    helperText,
    label,
    onChange,
    type = 'text',
    value,
    icon
  } = props;

  return (
    <Box>
      <StyledInputBox className="input-box">
        <StyledImgBox>
          {icon}
        </StyledImgBox>

        <StyledTextField
          disabled={disabled}
          fullWidth
          label={label}
          variant="standard"
          value={value}
          type={type}
          onChange={onChange}
          autoComplete="off"
          slotProps={{
            input: {
              disableUnderline: true
            }
          }}
        />
      </StyledInputBox>

      {(errorText || helperText) && (
        <StyledFormHelperText error={!!errorText}>
          {errorText || helperText}
        </StyledFormHelperText>
      )}
    </Box>
  );
};

const StyledInputBox = styled(Box)(({ theme }) => `
  display: flex;
  height: 64px;
  width: 100%;
  align-items: start;
  gap: 16px;
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

    &.MuiFormLabel-filled {
      color: ${theme.palette.appColor.darkBlue};
      top: 0px;
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
