import type { Validate } from 'react-hook-form';

const checkValidEmail = (email: string) => {
  const input = document.createElement('input');

  input.type = 'email';
  input.value = email;

  return input.checkValidity();
};

export const validateEmail: Validate<string, Record<string, string>> = (email) => {
  if (!email.trim()) {
    return 'Email is required';
  }

  if (!checkValidEmail(email)) {
    return 'Incorrect email';
  }
};