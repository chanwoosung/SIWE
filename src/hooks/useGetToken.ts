import getTokens from '../services/getTokens';
import useSignMessage from './useSignMessage';
import { ethers } from 'ethers';
import useGetWalletAddress from './useGetWalletAddress';
import { CHAIN_ID } from '../constant/constant';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/slices/tokenSlice';
import { setWalletAddress } from '../store/slices/walletSlice';

export default function useGetToken() {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const dispatch = useDispatch();

  const { getSignature } = useSignMessage();
  const getToken = async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const publicAddress = await getWalletAddress();
      const accountAddress = await signer.getAddress();
      const signature = await getSignature();
      const chainId = fullChainId.substring(2);
      const tokens = await getTokens({
        accountAddress,
        chainId,
        signature,
      });
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('expires_in', tokens.expires_in);
      localStorage.setItem('token_type', tokens.token_type);
      dispatch(
        setWalletAddress({
          publicAddress: accountAddress,
        })
      );
      dispatch(
        setLogin({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          isLogin: true,
        })
      );

      return tokens;
    } else {
      alert('NETWORK를 변경해주세요');
    }
  };

  return getToken;
}
