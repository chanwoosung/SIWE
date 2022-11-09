export interface IBaseResponse<T> {
  data: T;
  message: string;
}

export interface IPagination {
  page: number;
  perPage: number;
  totalCount: number;
  totalPage: number;
}

export interface IProperty {
  title: string;
  value: string;
}
