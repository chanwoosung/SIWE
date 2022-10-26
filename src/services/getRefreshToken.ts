import axios from 'axios';
import { useAppDispatch } from '../store/config';
import { setLogin } from '../store/slices/tokenSlice';
interface IGetTokensProps {
  refreshToken: string;
}

export default async function getRefreshTokens({
  refreshToken,
}: IGetTokensProps) {
  await axios
    .post('/api/oauth/token', {
      grantType: 'refresh_token',
      refreshToken: refreshToken,
    })
    .then(({ data }) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('expires_in', data.expires_in);
      localStorage.setItem('token_type', data.token_type);
      const dispatch = useAppDispatch();
      dispatch(
        setLogin({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          isLogin: true,
        })
      );
    })
    .catch(({ response }) => {
      localStorage.clear();
      const dispatch = useAppDispatch();

      dispatch(
        setLogin({
          accessToken: '',
          refreshToken: '',
          isLogin: false,
        })
      );
      return false;
    })
    .finally(() => {
      window.location.reload();
    });
}
