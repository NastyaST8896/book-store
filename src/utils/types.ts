export type Nullable<T> = T | null;

export type UserType = {
  email: string;
  fullName: string;
  id: string;
  password: string;
};

export type UserDataPayload = Pick<UserType, 'email' | 'password'>;

export type UserNamePayload = Pick<UserType, 'fullName'> 

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

export type UserPasswordPayload = Pick<ProfileFormType, 'oldPassword' | 'newPassword'>;