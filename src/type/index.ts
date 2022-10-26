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

export interface ICollectionMetaData {
  accountAddress: string;
  backgroundImgUrl: string;
  imgUrl: string;
  chain: string;
  collectionAddress: string;
  collectionsRoyalties: [];
  createdAt: string;
  description: string;
  title: string;
}

export interface IProperty {
  title: string;
  value: string;
}

export interface INFTDetailMetaData extends INFTObjectKeys {
  collection: ICollectionMetaData;
  id: string;
  accountAddress: string;
  isHidden: boolean;
  likeCount: number;
  mediaUrl: string;
  title: string;
  tokenId: string;
  properties: Array<IProperty>;
}
export interface INFTObjectKeys {
  [key: string]:
    | string
    | number
    | ICollectionMetaData
    | boolean
    | Array<IProperty>;
}
