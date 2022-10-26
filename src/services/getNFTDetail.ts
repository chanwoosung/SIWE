import { IBaseResponse, INFTDetailMetaData } from '../type';
import client from './client';

interface IGetNFTDetailProps {
  collectionAddress: string;
  tokenId: string;
}

export default async function getNFTDetail({
  collectionAddress,
  tokenId,
}: IGetNFTDetailProps) {
  const {
    data: { data },
  } = await client.get<IBaseResponse<INFTDetailMetaData>>(
    `/api/v1/public/collections/${collectionAddress}/${tokenId}`
  );
  return data;
}
