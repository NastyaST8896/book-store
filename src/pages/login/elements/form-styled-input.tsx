import {
  type Control,
  useController,
  type UseControllerProps
} from 'react-hook-form';
import { StyledInput, type StyledInputProps } from '@common/styled-input.tsx';
import type { LoginFormType } from '@utils/types';

type FormStyledInputProps = {
  name: keyof LoginFormType;
  control: Control<LoginFormType>;
  rules?: UseControllerProps<LoginFormType>['rules']
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