import React, { useState } from 'react';
import { ArrowIcon } from '@common/icons/arrow-icon.tsx';
import { CheckedIcon } from '@common/icons/checked-icon.tsx';
import { DefaultCheckIcon } from '@common/icons/default-check-icon.tsx';
import { RightArrowIcon } from '@common/icons/right-arrow-icon.tsx';
import { StyledFilterButton } from '@common/styled-filter-button.tsx';
import type { Genre } from '@utils/types.ts';

import {
  type ButtonProps,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';

type GenresFilterProps = {
  genres: Genre[];
  onClose?: (value: string[]) => void;
};

function isSameArray(startCheckedGenres: string[], checkedGenres: string[]) {
  if (startCheckedGenres.length !== checkedGenres.length) {
    return false;
  }

  const setCheckedGenres = new Set(checkedGenres);


  return startCheckedGenres.every((item) => setCheckedGenres.has(item));
}

export const GenresFilter = (props: GenresFilterProps) => {
  const { genres, onClose } = props;

  const [isActive, setIsActive] = useState(false);
  const [
    anchorGenresEl,
    setAnchorGenresEl
  ] = React.useState<HTMLElement | null>(null);

  const [checkedGenres, setCheckedGenres] = React.useState<string[]>([]);

  const [startCheckedGenres, setStartCheckedGenres] = React.useState<string[]>([]);

  const handleGenresButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorGenresEl(event.currentTarget);
    setIsActive(true);
    setStartCheckedGenres(checkedGenres);
  };

  const handleGenresClose = () => {
    setAnchorGenresEl(null);
    setIsActive(false);

    if (onClose && !isSameArray(startCheckedGenres, checkedGenres)) {
      onClose(checkedGenres);
    }
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checkedGenres.indexOf(value);
    const newCheckedGenres = [...checkedGenres];

    if (currentIndex === -1) {
      newCheckedGenres.push(value);
    } else {
      newCheckedGenres.splice(currentIndex, 1);
    }

    setCheckedGenres(newCheckedGenres);
  };

  return (
    <>
      <StyledFilterButton
        onClick={handleGenresButtonClick}
        endIcon={isActive ? <ArrowIcon /> : <RightArrowIcon />}
      >
        Genre
      </StyledFilterButton>

      <StyledPriceRangePopover
        open={Boolean(anchorGenresEl)}
        anchorEl={anchorGenresEl}
        onClose={handleGenresClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <StyledList>
          {genres.map((genre) => (
            <ListItem key={genre.name} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(genre.name)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedGenres.includes(genre.name)}
                    tabIndex={-1}
                    disableRipple
                    icon={<DefaultCheckIcon />}
                    checkedIcon={<CheckedIcon />}
                  />
                </ListItemIcon>
                <ListItemText primary={genre.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </StyledList>
      </StyledPriceRangePopover>
    </>
  );
};

const StyledPriceRangePopover = styled(Popover)(({ theme }) => `
  & .MuiPaper-root {
    background-color: ${theme.palette.appColor.light};
    margin-top: 16px;
    border-radius: 16px;
    overflow: visible;
    box-shadow: none;
    max-width: 305px;
    width: 100%;
    
      & .MuiCheckbox-root {
        padding: 5px 15px;
      }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 20px;
      width: 20px;
      height: 20px;
      background: ${theme.palette.appColor.light};
      transform: translateY(-50%) rotate(45deg);
      z-index: 0;
    }
  }
  
  & .MuiButtonBase-root {
      padding: 15px 15px 10px 15px;
      
      & .MuiListItemIcon-root {
        display: block;
        max-width: 34px;
        min-width: auto;
      }
      
      & .MuiListItemText-root {
      display: flex;
      justify-content: start;
      color: ${theme.palette.appColor.darkBlue};
      
      & .MuiTypography-root {
       font-weight: 500;
       font-size: 16px;
      }
    }
  }
`);

const StyledList = styled(List)(({ theme }) => `
  &. MuiList-root {
    width: 100%;
    max-width: 360px;
    background-color: ${theme.palette.appColor.light};
  }
`);
