import type { Validate } from 'react-hook-form';

export const validatePassword: Validate<string, Record<string, string>> = (password: string) => {
  const hasLowercase = /[a-zа-яё]/;
  const hasUppercase = /[A-ZА-ЯЁ]/;
  const hasDigit = /\d/;

  if (!password.trim()) {
    return 'Password is required';
  }

  if (password.trim().length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!hasLowercase.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!hasUppercase.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!hasDigit.test(password)) {
    return 'Password must contain at least one digit';
  }
};