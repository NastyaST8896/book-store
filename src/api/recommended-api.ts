import type { Book, CommonResponseType } from "@utils/types";
import { api } from "./api";

export const getRecommendedApi = async (params: { id: string}) => {

  const response = await api.get<CommonResponseType<
    {
      recommended: Book[]
    }
  >>(`/api/books/${params.id}/recommended`);

  return {
    recommended: response.data.data.recommended,
  };
};