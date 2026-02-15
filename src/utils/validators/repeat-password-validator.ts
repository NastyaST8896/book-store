import type { Validate } from 'react-hook-form';

import type { ProfileFormType, RegisterFormType } from '../types';

export const registerValidateRepeatPassword: Validate<string, RegisterFormType> = (repeatPassword, formType) => {
  if (repeatPassword !== formType.password) {
    return 'Passwords do not match';
  }
};

export const profileValidateRepeatPassword: Validate<string, ProfileFormType> = (repeatPassword, formType) => {
  if (repeatPassword !== formType.newPassword) {
    return 'Passwords do not match';
  }
};