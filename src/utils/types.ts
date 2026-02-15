export type Nullable<T> = T | null;

export type RegisterFormType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type LoginFormType = Omit<RegisterFormType, 'repeatPassword'>;

export type ProfileFormType = {
  fullName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

