import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFilterButton = (props: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => `
  text-transform: none;
  background-color: ${theme.palette.appColor.light};
  padding: 10px 18px;
  font-size: 18px;
  border-radius: 16px;
  width: 100%;

  & .MuiButton-icon {
    margin-left: auto;
  }
`);