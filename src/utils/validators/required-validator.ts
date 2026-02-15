import type { Validate } from 'react-hook-form';

export const createRequiredValidator = (message: string): Validate<string, Record<string, unknown>> =>
  (value: string) => {
    if (!value.trim()) {
      return message;
    }
  };