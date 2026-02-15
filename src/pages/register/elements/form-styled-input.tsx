import { type Control, useController, type UseControllerProps } from 'react-hook-form';
import { StyledInput, type StyledInputProps } from '@common/styled-input.tsx';

import type { RegisterFormType } from '../../../utils/types';

type FormStyledInputProps = {
  name: keyof RegisterFormType;
  control: Control<RegisterFormType>;
  rules?: UseControllerProps<RegisterFormType>['rules']
} & StyledInputProps;

export const FormStyledInput = (props: FormStyledInputProps) => {
  const { field } = useController({
    control: props.control,
    name: props.name,
    rules: props.rules
  });

  return (
    <StyledInput
      {...props}
      onChange={field.onChange}
      value={field.value}
    />
  );
};