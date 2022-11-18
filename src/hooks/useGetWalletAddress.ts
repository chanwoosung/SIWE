import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../store/slices/walletSlice';

export default function useGetWalletAddress() {
  const dispatch = useDispatch();
  const getWalletAddress = async () => {
    const accounts = (await window.ethereum?.request({
      method: 'eth_requestAccounts',
    })) as string[];
    dispatch(
      setWalletAddress({
        publicAddress: accounts[0],
      })
    );
    return accounts[0];
  };
  const getChainId = async () => {
    try {
      return await window.ethereum?.request({ method: 'eth_chainId' });
    } catch (error) {
      alert('chain Id를 가져올 수 없습니다. 다시 요청해주세요');
      return Promise.reject(error);
    }
  };
  return { getWalletAddress, getChainId };
}
