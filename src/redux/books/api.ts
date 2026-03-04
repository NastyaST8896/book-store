import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';
import type { Book } from '@utils/types';
import type { AxiosResponse } from 'axios';

type CommonResponseType<D, M = unknown> = {
  data: D;
  meta?: M;
}

type PaginationType = {
  perPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPage: number;
  totalAmount: number;
} 


export const getBooksApi = async (
  page: number,
  genres?: string[],
  maxPrice?: number,
  minPrice?: number,
  sortBy?: string,
) => {
  const params = new URLSearchParams();

  params.append('page', String(page));

  if (genres?.length) {
    params.append('genres', genres.join(','));
  }

  if (maxPrice) {
    params.append('maxPrice', String(maxPrice));
  }

  if (minPrice) {
    params.append('minPrice', String(minPrice));
  }

  if (sortBy) {
    params.append('sortBy', sortBy);
  }

  const response = await api.get<AxiosResponse<CommonResponseType<Book[], PaginationType>>>(
    IN_APP_ROUTES.getBooks.path,
    { params }
  );

  return response.data;
};


const calculateSalary = (
  user: string,
  company: string,
  yearFrom: string,
  yearTo: string,
  months: number,
  groupId: string,
  exactlyMonth?: number,
): number => {
  return 32;
}


const calculateSalary2 = (
  options: {
    user: string;
    company: string;
    yearFrom: string;
    yearTo: string;
    months: number;
    exactlyMonth?: number;
    groupId: number;
  }
): number => {
  return 32;
}




const salary = calculateSalary(
  'Alex',
  'AAA Group',
  '1989',
  '1997',
  6,
  'GH3H_2312',
  2,
);


const salary2 = calculateSalary2({
  exactlyMonth: 1,
  company:  'AAA Group',
  months: 13,
  user: 'Alex',
  yearFrom: '1989',
  yearTo: '1999',
  groupId: 13,
})