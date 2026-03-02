import { ArrowIcon } from "@common/icons/arrow-icon";
import { RightArrowIcon } from "@common/icons/right-arrow-icon";
import { StyledFilterButton } from "@common/styled-filter-button";
import { styled } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  type ButtonProps
} from "@mui/material";
import React, { useState } from "react";

type SortByFilterprops = {
  onClose?: (value: string) => void
}

export const SortByFilter = (props: SortByFilterprops) => {
  const { onClose } = props;

  const sortNames = ['Price', 'Name', 'Author name', 'Rating', 'Date of issue'];
  const [isActive, setIsActive] = useState(false);

  const [currentName, setCurrentName] = useState('');

  const [
    anchorSortByEl,
    setAnchorSortByEl
  ] = React.useState<HTMLElement | null>(null);

  const handleSortByButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorSortByEl(event.currentTarget);
    setIsActive(true);
  };

  const handleSortByClose = () => {
    setAnchorSortByEl(null);
    setIsActive(false);

    if (onClose) {
      onClose(currentName);
    };
  };

  const handleItemClick = (name: string) => () => {
    setCurrentName(name);
  }

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
                onClick={handleItemClick(name)}
                dense
              >
                {
                  currentName === name
                    ? <StyledListItemText primary={name} />
                    : <ListItemText primary={name} />
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