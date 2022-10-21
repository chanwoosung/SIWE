import { CHAIN_ID } from '../constant/constant';
import useGetWalletAddress from '../hooks/useGetWalletAddress';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import getNonce from '../services/getNonce';
import { ethers } from 'ethers';
import getTokens from '../services/getTokens';
import useGetToken from '../hooks/useGetToken';

export default function LoginButton({ buttonText }: { buttonText: string }) {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const getToken = useGetToken();
  const onClickLogin = async () => {
    console.log(await getToken());
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
