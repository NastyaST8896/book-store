import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMaxPriceApi } from "../../api/price-api";

export const getMaxPrice = createAsyncThunk<{maxPrice: number}, void>(
  "maxPrice",
  async (_) => {
    const result = await getMaxPriceApi();

    return {
      maxPrice: result.data.maxPrice
    };
  }
);