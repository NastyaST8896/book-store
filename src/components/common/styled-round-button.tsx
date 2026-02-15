import React from 'react';

import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledIconButtonProps = {
  icon: React.JSX.Element,
  asLink?: boolean;
} & (LinkProps | ButtonProps);

type LinkProps = {
  asLink: true;
  to: string;
};

type ButtonProps = {
  asLink?: false;
};


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

  &:hover {
    background-color: #2c506ed0;
  }
`;