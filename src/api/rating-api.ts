import { IN_APP_ROUTES } from '@utils/routes.ts';
import type { CommonResponseType } from '@utils/types.ts';

import { api } from './api.ts';

type RatingDataType = {
  bookId: number;
  userId: number;
  rating: number;
};

export const setRating = async (bookRatingData: RatingDataType) => {
  const response = await api.post<CommonResponseType<{booksRating: number}>>(
    IN_APP_ROUTES.setBookRating.path,
    bookRatingData
  );

  return response.data;
};