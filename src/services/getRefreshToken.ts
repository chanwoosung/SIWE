import axios from 'axios';
interface IGetTokensProps {
  refreshToken: string;
}

export default async function getRefreshTokens({
  refreshToken,
}: IGetTokensProps) {
  const response = await axios.post('/api/oauth/token', {
    grantType: 'refresh_token',
    refreshToken: refreshToken,
  });
  return response;
}
