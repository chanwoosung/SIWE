import { IBaseResponse, INFTItems } from '../type';
import client from './client';

interface IGetOwnNFTQueryParam {
  page?: number;
  perPage?: number;
}

export default async function getOwnNFTs(
  params: IGetOwnNFTQueryParam
) {
  const {
    data: { data },
  } = await client.get<IBaseResponse<INFTItems>>(
    `/api/v1/private/current-account/items`,
    {
      params,
    }
  );
  return data;
}
