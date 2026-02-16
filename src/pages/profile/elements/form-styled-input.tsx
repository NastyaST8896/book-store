import {
  type Control, type FieldValues, type Path,
  useController,
  type UseControllerProps
} from 'react-hook-form';
import { StyledInput, type StyledInputProps } from '@common/styled-input.tsx';

type FormStyledInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps<T>['rules']
} & StyledInputProps;

export const FormStyledInput = <T extends Record<string, string>>(props: FormStyledInputProps<T>) => {
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