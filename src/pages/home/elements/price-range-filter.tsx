import React, { useEffect, useState } from 'react';
import { ArrowIcon } from '@common/icons/arrow-icon.tsx';
import { RightArrowIcon } from '@common/icons/right-arrow-icon.tsx';
import { StyledFilterButton } from '@common/styled-filter-button.tsx';
import { api } from '@redux/api';
import type { CommonResponseType } from '@utils/types';

import {
  Box,
  type ButtonProps,
  Popover,
  Slider,
  type SliderProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

type PriceRangeFilterProps = {
  onClose?: (value: number[]) => void;
};

export const PriceRangeFilter = (props: PriceRangeFilterProps) => {
  const {
    onClose
  } = props;

  const [maxPrice, setMaxPrice] = useState(Infinity);

  const [priceValue, setPriceValue] = useState([0, Infinity]);
  const [startValue, setStartValue] = useState([0, Infinity]);

  const [isActive, setIsActive] = useState(false);
  const [
    anchorPriceEl,
    setAnchorPriceEl
  ] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    const getMaxPrice = async () => {
      const response = await api.get<CommonResponseType<{ maxPrice: number }>>
      ('/books/maxPrice');

      setMaxPrice(response.data.data.maxPrice);
    };

    getMaxPrice();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPriceValue([0, maxPrice]);
  }, []);

  const handlePriceButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorPriceEl(event.currentTarget);
    setIsActive(true);
    setStartValue(priceValue);
  };

  const handlePriceValueChange: SliderProps['onChange'] = (_, newValue) => {
    if (Array.isArray(newValue)) {
      setPriceValue(newValue);
    }
  };

  const marks = [
    {
      value: 0,
      label: '',
    },
    {
      value: maxPrice,
      label: '',
    },
  ];

  const handlePriceRangeClose = () => {
    setAnchorPriceEl(null);
    setIsActive(false);

    if (onClose && startValue.join(',') !== priceValue.join(',')) {
      onClose(priceValue);
    }
  };

  return (
    <>
      <StyledFilterButton
        onClick={handlePriceButtonClick}
        endIcon={isActive ? <ArrowIcon /> : <RightArrowIcon />}
      >
        Price
      </StyledFilterButton>

      <StyledPriceRangePopover
        open={Boolean(anchorPriceEl)}
        anchorEl={anchorPriceEl}
        onClose={handlePriceRangeClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <StyledSlider
          aria-label="price range"
          value={priceValue}
          onChange={handlePriceValueChange}
          valueLabelDisplay="off"
          step={0.1}
          marks={marks}
          min={0}
          max={maxPrice}
        />

        <StyledBox>
          {marks.map((_, index) => (
            <StyledTypography key={index}>
              $ {priceValue[index].toFixed(2)}
            </StyledTypography>
          ))}
        </StyledBox>
      </StyledPriceRangePopover>
    </>
  );
};

const StyledPriceRangePopover = styled(Popover)(({ theme }) => `
  & .MuiPaper-root {
    background-color: ${theme.palette.appColor.light};
    margin-top: 16px;
    border-radius: 16px;
    width: 412px;
    height: 150px;
    padding: 40px 32px;
    overflow: visible;
    box-shadow: none;

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
`);

const StyledSlider = styled(Slider)(({ theme }) => `
  color: ${theme.palette.appColor.green};
  height: 12px;

  & .MuiSlider-thumb {
    height: 32px;
    width: 32px;
    background-color: ${theme.palette.appColor.white};
    border: 2px solid ${theme.palette.appColor.green};
  };

  & .MuiSlider-rail {
    background-color: ${theme.palette.appColor.grayscale};
  },
  
  & .MuiSlider-mark {
    background-color: transparent;
  }
`);

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)(({ theme }) => `
  font-size: 16px;
  font-weight: 400;
  color: ${theme.palette.appColor.darkBlue};
  white-space: 'nowrap';
`);
