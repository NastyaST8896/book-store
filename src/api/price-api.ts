import type { CommonResponseType } from '@utils/types';

import { api } from './api';
import { IN_APP_ROUTES } from '@utils/routes';

export const getMaxPriceApi = async () => {
  const response = await api.get<
    CommonResponseType<{ maxPrice: number }>>(
    IN_APP_ROUTES.getMaxPrice.path,
  );

  return {
      maxPrice: response.data.data.maxPrice,
    };
};