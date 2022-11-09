import { ethers } from 'ethers';
import { CHAIN_ID } from '../constant/constant';
import getNonce from '../services/getNonce';
import useGetWalletAddress from './useGetWalletAddress';
export default function useSignMessage() {
  const { getChainId } = useGetWalletAddress();
  const getSignature = async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const chainId = fullChainId.substring(2);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      const nonce = await getNonce({
        accountAddress,
        chainId,
      });
      const signature = await signer.signMessage(nonce);
      return signature;
    } else {
      return 'Network Error';
    }
  };

  return { getSignature };
}
