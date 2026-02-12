import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

type StyledIconButtonProps = {
  icon: React.JSX.Element,
  href?: string,
  
}

export const StyledRoundButton = (props: StyledIconButtonProps) => {
  const { icon } = props;

  return (
    <StyledIconButton>
      {icon}
    </StyledIconButton>
  );
};

export const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.appColor.darkBlue};
  max-width: 48px;
  width: 100%;
  height: 48px;
  /* position: absolute;
  bottom: 20px;
  right: 20px; */

  &:hover {
    background-color: #2c506ed0;
  }
`;