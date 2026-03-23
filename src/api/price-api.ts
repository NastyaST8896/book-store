import type { CommonResponseType } from '@utils/types';

import { api } from './api';

export const getMaxPriceApi = async () => {
  const response = await api.get<
    CommonResponseType<{ maxPrice: number }>>(
    '/books/maxPrice',
  );

  return {
      maxPrice: response.data.data.maxPrice,
    };
};