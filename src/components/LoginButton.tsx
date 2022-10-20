import { CHAIN_ID } from '../constant/constant';
import useGetWalletAddress from '../hooks/useGetWalletAddress';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import getNonce from '../services/getNonce';

export default function LoginButton({ buttonText }: { buttonText: string }) {
  const { getWalletAddress, getChainId } = useGetWalletAddress();
  const { isMetamaskInstalled } = useIsInstallMetamask();

  const onClickLogin = async () => {
    const chainId = await getChainId();
    if (chainId === CHAIN_ID.GOERLI) {
      const publicAddress = await getWalletAddress();
      const params = {
        publicAddress,
        chainId: 5,
      };
      alert(`${publicAddress} is CONNECTED`);
      const nonce = await getNonce(params);
      alert(`${nonce}`);
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
