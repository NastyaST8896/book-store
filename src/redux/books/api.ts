import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';
import type { Book } from '@utils/types';

export type CommonResponseType<D, M = unknown> = {
  data: D;
  meta?: M;
}

export type PaginationType = {
  perPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  totalAmount: number;
}


export const getBooksApi = async (
  page: number,
  genres?: string[],
  maxPrice?: number,
  minPrice?: number,
  sortBy?: string,
) => {

  const response = await api.get<
   CommonResponseType<{ books: Book[] }, { pagination: PaginationType }>
  >(
    IN_APP_ROUTES.getBooks.path,
    {
      params: {
        page: String(page),
        genres: genres?.length && genres.join(','),
        maxPrice,
        minPrice,
        sortBy
      }
    }
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
  company: 'AAA Group',
  months: 13,
  user: 'Alex',
  yearFrom: '1989',
  yearTo: '1999',
  groupId: 13,
})