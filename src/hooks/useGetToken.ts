import getTokens from '../services/getTokens';
import useSignMessage from './useSignMessage';
import { ethers } from 'ethers';
import useGetWalletAddress from './useGetWalletAddress';
import { CHAIN_ID } from '../constant/constant';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../store/slices/walletSlice';
import { logIn } from '../store/slices/authSlice';
import { useCallback } from 'react';
import { setAuthToken } from '../store/thunk/thunksForAuth';
import { useAppDispatch } from '../store/config';

export default function useGetToken() {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const dispatch = useAppDispatch();

  const { getSignature } = useSignMessage();
  const getToken = useCallback(async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const publicAddress = await getWalletAddress();
      const accountAddress = await signer.getAddress();
      const signature = await getSignature();
      const chainId = fullChainId.substring(2);
      dispatch(
        setAuthToken({
          accountAddress,
          chainId,
          signature,
        })
      );
    } else {
      alert('NETWORK를 변경해주세요');
    }
  }, []);

  return getToken;
}
