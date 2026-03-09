import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Genre } from '@utils/types';

import { getGenresApi } from '../../api/genres-api';

export const getAllGenres = createAsyncThunk<{allGenres: Genre[]}, void>(
  'genres',
  async () => {
    const result = await getGenresApi();

    return {
      allGenres: result.data.allGenres
    };
  }
);