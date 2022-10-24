import useGetToken from '../hooks/useGetToken';
import useGetWalletAddress from '../hooks/useGetWalletAddress';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import client from '../services/client';

export default function LoginButton({ buttonText }: { buttonText: string }) {
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const { getWalletAddress } = useGetWalletAddress();

  const getToken = useGetToken();

  const onClickRouteToMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <div className='w-44 h-20 rounded-xl border border-slate-500'>
      <button
        className='w-full h-full flex gap-5'
        onClick={isMetamaskInstalled ? getToken : onClickRouteToMetaMask}
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
