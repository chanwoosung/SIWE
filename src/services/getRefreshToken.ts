import axios from 'axios';
interface IGetTokensProps {
  refreshToken: string;
}

export default async function getRefreshTokens({
  refreshToken,
}: IGetTokensProps) {
  const { data } = await axios.post(
    '/api/oauth/token',
    {
      grantType: 'refresh_token',
      refreshToken,
    },
    {
      withCredentials: true,
    }
  );

  return data;
}
