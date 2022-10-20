import axios from 'axios';

export interface IGetNonceResponse {
  account_address: string;
  chain_id: number;
  nonce: string;
}

export interface IGetNonceRequestParams {
  publicAddress: string;
  chainId: number;
}

export default async function getNonce({
  chainId,
  publicAddress,
}: IGetNonceRequestParams) {
  const {
    data: { nonce },
  } = await axios.get<IGetNonceResponse>(
    `/api/wallet/nonce?account_address=${publicAddress}&chain_id=${chainId}`
  );

  return nonce;
}
