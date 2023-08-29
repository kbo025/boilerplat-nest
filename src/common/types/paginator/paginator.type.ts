export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IQueryDto<F = null> {
  readonly page: number;
  readonly itemsPerPage: number;
  readonly filters?: F | null;
  readonly sortBy?: [string, string | number][];
}

export interface IQueryResponse<T, F = null> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy?: [string, string | number][];
    filter?: F | null;
  };
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}
