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

  '&:disabled': {
    backgroundColor: theme.palette.appColor.white,
    border: `1px solid ${theme.palette.appColor.dark}`,
    color: theme.palette.appColor.dark,
    fontSize: '18px',
  },

  '&.active': {
    backgroundColor: theme.palette.appColor.green
  },

  [theme.breakpoints.down(770)]: {

    '&:disabled': {
      fontSize: '14px'
    },
    padding: '3px 20px',
    fontSize: '14px'
  }
}));
