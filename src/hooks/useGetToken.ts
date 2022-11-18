import { ethers } from 'ethers';
import { useCallback } from 'react';
import { CHAIN_ID } from '../constant';
import { useAppDispatch } from '../store/config';
import { setAuthToken } from '../store/thunk/thunksForAuth';
import useGetWalletAddress from './useGetWalletAddress';
import useSignMessage from './useSignMessage';

export default function useGetToken() {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const dispatch = useAppDispatch();

  const { getSignature } = useSignMessage();
  const getToken = useCallback(async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await getWalletAddress();
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
      } catch (error) {
        alert('token을 가져오는 중 에러가 발생했습니다.');
      }
    } else {
      alert('NETWORK를 변경해주세요');
    }
  }, []);

  return getToken;
}
