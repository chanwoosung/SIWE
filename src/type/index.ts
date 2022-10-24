export interface IBaseResponse<T> {
  data: T;
  message: string;
}

export interface INFTItems extends IPagination {
  items: Array<INFTMetaData>;
}

export interface IPagination {
  page: number;
  perPage: number;
  totalCount: number;
  totalPage: number;
}

export interface INFTMetaData {
  accountAddress: string;
  chain: string;
  collectionAddress: string;
  collectionTitle: string;
  createdAt: string;
  id: string;
  listing: any;
  mediaUrl: string;
  status: any;
  title: string;
  tokenId: string;
}
