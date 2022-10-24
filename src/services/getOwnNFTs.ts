import { IBaseResponse, INFTItems } from '../type';
import client from './client';

interface IGetOwnNFTQueryParam {
  page?: number;
  perPage?: number;
}

export default async function getOwnNFTs(
  publicAddress: string,
  params: IGetOwnNFTQueryParam
) {
  const {
    data: { data },
  } = await client.get<IBaseResponse<INFTItems>>(
    `/api/v1/public/accounts/${publicAddress}/items`,
    {
      params,
    }
  );
  return data;
}
