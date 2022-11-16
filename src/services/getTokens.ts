import axios from 'axios';
import { IToken } from '../type';
interface IGetTokensProps {
  chainId: number;
  accountAddress: string;
  signature: string;
}

export default async function getTokens({
  accountAddress,
  chainId,
  signature,
}: IGetTokensProps) {
  const { data } = await axios.post<IToken>(
    '/api/oauth/token',
    {
      grantType: 'password',
      username: `${chainId}|${accountAddress}`,
      password: signature,
    },
    {
      withCredentials: true,
    }
  );

  return data;
}
