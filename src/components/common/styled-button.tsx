import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledButtonProps = ButtonProps & {
  buttonHeight?: 44 | 48 | 50;
};

export const StyledButton = styled(
  (props: StyledButtonProps) => <Button variant="contained" {...props} />,
  { shouldForwardProp: (prop) => prop !== 'buttonHeight' }
)<StyledButtonProps>(({ buttonHeight = 44, theme }) => ({
  borderRadius: 16,
  textTransform: 'none',
  height: buttonHeight,
  color: theme.palette.appColor.light,
  padding: '10px 50px',

   [theme.breakpoints.down(770)]: {
    padding: '3px 20px',
    fontSize: '14px'
  }
}));
