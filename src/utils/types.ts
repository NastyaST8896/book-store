export type Nullable<T> = T | null;

export type UserType = {
  email: string;
  fullName: string;
  id: string;
  password: string;
};

export type UserDataPayload = Omit<UserType, 'fullName' | 'id'>;

export type UserCheck = Omit<UserType, 'password'>;

export type UserRegister = Pick<UserType, 'email' | 'id'>;

export type UserWidthAvatar = UserCheck & {
  avatar: string,
};

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

export type UserPasswordPayload = Pick<
  ProfileFormType, 'oldPassword' | 'newPassword'
>;

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  booksRating: string;
  media: string;
  isFavorite?: boolean;
  availableCount: number;
  count: number;
};

export type BookProfile = Book & {
  description: string;
  rating: number;
  userRating: number;
} | null;

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
  page?: string,
  genres?: string,
  maxPrice?: string,
  minPrice?: string,
  sortBy?: string,
  searchValue?: string,
};

export type ProductBookType = {
  id: number;
  title: string;
  author: string;
  price: string;
  booksRating: string;
  media: string;
  description?: string;
  rating?: number;
  userRating?: number;
  count: number;
  availableCount: number;
};

export type CommentType = {
  id: number,
  name: string,
  date: Date,
  text: string,
  img: string,
};