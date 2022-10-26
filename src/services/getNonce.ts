import axios from 'axios';

export interface IGetNonceResponse {
  account_address: string;
  chain_id: number;
  nonce: string;
}

export interface IGetNonceRequestParams {
  accountAddress: string;
  chainId: number;
}

export default async function getNonce({
  chainId,
  accountAddress,
}: IGetNonceRequestParams) {
  const {
    data: { nonce },
  } = await axios.get<IGetNonceResponse>(
    `https://auth-proxy.goerli-alpha.croffle.me/api/wallet/nonce`,
    {
      params: {
        account_address: accountAddress,
        chain_id: chainId,
      },
    }
  );

  return nonce;
}
