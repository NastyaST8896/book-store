import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledButtonProps = ButtonProps & {
  buttonHeight?: 44 | 48;
  width?: number;
};

export const StyledButton = styled(
  (props: StyledButtonProps) => <Button variant="contained" {...props} />,
  { shouldForwardProp: (prop) => prop !== 'buttonHeight' }
)<StyledButtonProps>(({ buttonHeight = 44, width, theme }) => ({
  borderRadius: 16,
  textTransform: 'none',
  height: buttonHeight,
  width: width ? `${width}px` : '100%',
  color: theme.palette.appColor.light,
}));
