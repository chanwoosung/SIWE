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
  const getChainId = async () =>
    await window.ethereum?.request({ method: 'eth_chainId' });

  return { getWalletAddress, getChainId };
}
