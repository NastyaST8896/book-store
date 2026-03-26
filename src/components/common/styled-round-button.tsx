import React from 'react';

import { Badge, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledIconButtonProps = {
  icon: React.JSX.Element,
  count?: number,
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
  const { icon, count } = props;

  return (
    count ? (
      <StyledBadge
      badgeContent={count}
      color='primary'
      overlap="circular"
    >
    <StyledIconButton>
      {icon}
    </StyledIconButton>
    </StyledBadge>
    ) : (
      <StyledIconButton>
      {icon}
    </StyledIconButton>
    )
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

const StyledBadge = styled(Badge)(({theme}) =>`
&.MuiBadge-root {
  max-width: 54px;
  width: 100%;
} 

& .MuiBadge-colorPrimary {
 background-color: ${theme.palette.appColor.green};
 color: ${theme.palette.appColor.darkBlue}
}
 
`);