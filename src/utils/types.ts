export type Nullable<T> = T | null;

export type UserType = {
  email: string;
  fullName: string;
  id: string;
  password: string;
};

export type UserDataPayload = Pick<UserType, 'email' | 'password'>;

export type UserNamePayload = Pick<UserType, 'fullName'>;

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

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  rating: number;
  media: string;
  isFavorite?: boolean;
};

export type Genre = {
  id: number,
  name: string,
};

export type CommonResponseType<D, M = unknown> = {
  data: D;
  meta?: M;
};

export type PaginationType = {
  perPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  totalAmount: number;
};

export type BooksApiParams = {
  page: number,
  genres?: string[],
  maxPrice?: number,
  minPrice?: number,
  sortBy?: string,
};