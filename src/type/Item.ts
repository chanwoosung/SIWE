import { IPagination, IProperty } from './base';
import { ICollectionMetaData } from './collection';

export interface INFTMetaData {
  accountAddress: string;
  chain: string;
  collectionAddress: string;
  collectionTitle: string;
  createdAt: string;
  id: string;
  mediaUrl: string;
  title: string;
  tokenId: string;
}

export interface INFTItems extends IPagination {
  items: Array<INFTMetaData>;
}

export interface INFTDetailMetaData {
  collection: ICollectionMetaData;
  id: string;
  accountAddress: string;
  isHidden: boolean;
  likeCount: number;
  mediaUrl: string;
  title: string;
  tokenId: string;
  properties: Array<IProperty>;
  createdAt: string;
}
