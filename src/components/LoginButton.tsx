import { CHAIN_ID } from '../constant/constant';
import useGetWalletAddress from '../hooks/useGetWalletAddress';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import getNonce from '../services/getNonce';
import { ethers } from 'ethers';
import getTokens from '../services/getTokens';

export default function LoginButton({ buttonText }: { buttonText: string }) {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const { isMetamaskInstalled } = useIsInstallMetamask();

  const onClickLogin = async () => {
    const fullChainId = await getChainId();
    if (window.ethereum && fullChainId === CHAIN_ID.GOERLI) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const chainId = fullChainId.substring(2);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      const publicAddress = await getWalletAddress();
      const params = {
        accountAddress,
        chainId,
      };
      alert(`${publicAddress} is CONNECTED`);
      const nonce = await getNonce(params);
      alert(`${nonce}`);

      const signature = await signer.signMessage(nonce);
      console.log(accountAddress);
      console.log(publicAddress);
      const tokens = await getTokens({
        accountAddress,
        chainId,
        signature,
      });
      console.log(tokens);
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('expires_in', tokens.expires_in);
      localStorage.setItem('token_type', tokens.token_type);
    } else {
      alert('NETWORK를 변경해주세요');
    }
  };
  const onClickRouteToMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <div className='w-44 h-20 rounded-xl border border-slate-500'>
      <button
        className='w-full h-full flex gap-5'
        onClick={isMetamaskInstalled ? onClickLogin : onClickRouteToMetaMask}
      >
        <img
          src='/img/Metamask.svg'
          className='w-16 h-16 my-auto'
          alt='metamask_icon'
        />
        <span className='my-auto'>{buttonText}</span>
      </button>
    </div>
  );
}
