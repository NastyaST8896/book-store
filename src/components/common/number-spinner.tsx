import React from 'react';
import {
  NumberField as BaseNumberField,
  type NumberFieldRootProps
} from '@base-ui/react/number-field';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

export const NumberSpinner = (
  {
    id: idProp,
    error,
    onChange,
    ...rest
  }: BaseNumberField.Root.Props & {
    error?: boolean;
    onChange: NumberFieldRootProps['onValueChange']
  }
) => {
  let id = React.useId();

  if (idProp) {
    id = idProp;
  }

  return (
    <BaseNumberField.Root
      {...rest}
      onValueChange={onChange}
      render={(props, state) => (
        <FormControl
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
          sx={{
            '& .MuiButton-root': {
              border: 'none',
              borderColor: 'divider',
              minWidth: 0,
              bgcolor: 'action.hover',
              '&:not(.Mui-disabled)': {
                color: 'text.primary',
              },
            },
          }}
        >
          {props.children}
        </FormControl>
      )}
    >
      <Box
        component="span"
        sx={{ userSelect: 'none', width: 'max-content' }}
      >
        <BaseNumberField.Decrement
          render={
            <Button
              variant="outlined"
              aria-label="Decrease"
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: '#F0F4EF',
                },
                borderRadius: '50%',
                padding: '16px 8px',
                height: '8px',
                '&.Mui-disabled': {
                  border: 'none'
                },
              }}
            />
          }
        >
          <RemoveIcon sx={{ width: '16px', fill: '#0D1821' }} />
        </BaseNumberField.Decrement>

        <BaseNumberField.Input
          id={id}
          render={(props, state) => (
            <StyledOutlinedInput
              inputRef={props.ref}
              value={state.inputValue}
              onBlur={props.onBlur}
              onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onFocus={props.onFocus}
              slotProps={{
                input: {
                  ...props,
                  size:
                    Math.max(
                      (rest.min?.toString() || '').length,
                      state.inputValue.length || 1,
                    ) + 1,
                  sx: {
                    textAlign: 'center',
                  },
                },
              }}
              sx={{
                pr: 0,
                borderRadius: 0,
                flex: 1,
                '&.MuiInputBase-inputSizeSmall': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
              }}
            />
          )}
        />

        <BaseNumberField.Increment
          render={
            <Button
              variant="outlined"
              aria-label="Increase"
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: '#F0F4EF',
                },
                borderRadius: '50%',
                padding: '16px 8px',
                height: '8px',
                '&.Mui-disabled': {
                  border: 'none'
                },
              }}
            />
          }
        >
          <AddIcon sx={{ width: '16px', height: '16px' }} />
        </BaseNumberField.Increment>
      </Box>
    </BaseNumberField.Root>
  );
};

const StyledOutlinedInput = styled(OutlinedInput)`
  & .MuiInputBase-input {
    padding: 0;
  }
`;