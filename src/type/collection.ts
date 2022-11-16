export interface ICollectionMetaData {
  accountAddress: string;
  backgroundImgUrl: string;
  imgUrl: string;
  chain: string;
  collectionAddress: string;
  collectionRoyalties: Array<ICollectionRoyalty>;
  createdAt: string;
  updatedAt: string;
  description: string;
  title: string;
}

export interface ICollectionRoyalty {
  accountAddress: string;
  chain: string;
  collectionAddress: string;
  id: number;
  rate: number;
}
