import React from 'react';

import { Badge, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledIconButtonProps = {
  icon: React.JSX.Element,
  count?: number,
  asLink?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

} & (LinkProps | ButtonProps);

type LinkProps = {
  asLink: true;
  to: string;
};

type ButtonProps = {
  asLink?: false;
};


export const StyledRoundButton = (props: StyledIconButtonProps) => {
  const { icon, count, onClick } = props;

  return (
    count ? (
      <StyledBadge
        badgeContent={count}
        color='primary'
        overlap="circular"
      >
        <StyledIconButton onClick={onClick}>
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

  @media (max-width: 600px) {
  max-width: 32px;
  width: 100%;
  height: 32px;
}

  &:hover {
    background-color: #2c506ed0;
  }
`;

const StyledBadge = styled(Badge)(({ theme }) => `
&.MuiBadge-root {
  max-width: 54px;
  width: 100%;
} 

& .MuiBadge-colorPrimary {
 background-color: ${theme.palette.appColor.green};
 color: ${theme.palette.appColor.darkBlue}
}
`);