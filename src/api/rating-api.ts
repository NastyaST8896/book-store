import { IN_APP_ROUTES } from '@utils/routes.ts';
import type { CommonResponseType } from '@utils/types.ts';

import { api } from './api.ts';

type RatingDataType = {
  bookId: number;
  userId: number;
  rating: number;
};

export const setRating = async (bookRatingData: RatingDataType) => {
  await api.post<CommonResponseType<void>>(
    IN_APP_ROUTES.setBookRating.path,
    bookRatingData
  );

  return;
};