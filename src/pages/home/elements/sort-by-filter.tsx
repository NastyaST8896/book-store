import React, { useEffect, useState } from 'react';
import { ArrowIcon } from '@common/icons/arrow-icon';
import { RightArrowIcon } from '@common/icons/right-arrow-icon';
import { StyledFilterButton } from '@common/styled-filter-button';

import {
  type ButtonProps,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';

type SortByType = {
  id: number,
  name: string,
};

type SortByFilterProps = {
  sortName: string;
  onClose?: (value: string) => void,
  sortNames: SortByType[],
};

export const SortByFilter = (props: SortByFilterProps) => {
  const { onClose, sortName, sortNames } = props;

  const [isActive, setIsActive] = useState(false);

  const [startName, setStartName] = useState('');

  const [currentName, setCurrentName] = useState(sortName);

  const [
    anchorSortByEl,
    setAnchorSortByEl
  ] = React.useState<HTMLElement | null>(null);

     useEffect(() => {
      setCurrentName(sortName)
    }, [sortName]);

  const handleSortByButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorSortByEl(event.currentTarget);
    setIsActive(true);
    setStartName(currentName);
  };

  const handleSortByClose = () => {
    setAnchorSortByEl(null);
    setIsActive(false);

    if (onClose && startName !== currentName) {
      const currentSort = sortNames.find((sort) => sort.name === currentName);
      const currentId = String(currentSort?.id);

      onClose(currentId);
    }
  };

  const handleItemClick = (name: string) => () => {
    setCurrentName(name);
  };

  return (
    <>
      <StyledFilterButton
        onClick={handleSortByButtonClick}
        endIcon={isActive ? <ArrowIcon /> : <RightArrowIcon />}
        sx={{ background: 'transparent', whiteSpace: 'nowrap' }}
      >
        Sort by {currentName}
      </StyledFilterButton>

      <StyledPriceRangePopover
        open={Boolean(anchorSortByEl)}
        anchorEl={anchorSortByEl}
        onClose={handleSortByClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <StyledList>
          {sortNames.map((name, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleItemClick(name.name)}
                dense
              >
                {
                  currentName === name.name
                    ? <StyledListItemText primary={name.name} />
                    : <ListItemText primary={name.name} />
                }
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
    max-width: 197px;
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
      padding: 6px;
      
      & .MuiListItemIcon-root {
        display: block;
        max-width: 34px;
        min-width: auto;
      }
      
      & .MuiListItemText-root {
      display: flex;
      justify-content: start;
      color: ${theme.palette.appColor.darkGrey};
      
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

const StyledListItemText = styled(ListItemText)(({ theme }) => `
& .MuiTypography-root {
  color: ${theme.palette.appColor.darkBlue};
}
`);

