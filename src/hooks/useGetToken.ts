import getTokens from '../services/getTokens';
import useSignMessage from './useSignMessage';
import { ethers } from 'ethers';
import useGetWalletAddress from './useGetWalletAddress';
import { CHAIN_ID } from '../constant/constant';

export default function useGetToken() {
  const { getChainId } = useGetWalletAddress();

  const { getSignature } = useSignMessage();
  const getToken = async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      console.log('here');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const fullChainId = await getChainId();
      const signature = await getSignature();
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
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
      return tokens;
    }
  };

  return getToken;
}
