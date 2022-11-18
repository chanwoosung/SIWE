import useGetToken from '../hooks/useGetToken';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import { useAppDispatch, useAppSelector } from '../store/config';
import { handleOpenDialog } from '../store/thunk/thunksForDialog';

export default function LoginButton({
  buttonText,
  className = '',
}: {
  buttonText: string;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const getToken = useGetToken();
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const { isLoggedIn } = useAppSelector(state => state.auth);

  const onClickRouteToMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };
  const handleShowDialog = () => {
    dispatch(handleOpenDialog());
  };
  return (
    <button
      className={`${className} flex gap-4 w-auto rounded-md border border-transparent bg-white py-3 px-5 text-center text-base font-medium text-indigo-700 shadow-md hover:bg-gray-50 sm:w-auto`}
      onClick={
        isLoggedIn
          ? handleShowDialog
          : isMetamaskInstalled
          ? getToken
          : onClickRouteToMetaMask
      }
    >
      <img
        src='/img/Metamask.svg'
        className='w-6 h-6 my-auto'
        alt='metamask_icon'
      />
      <span className='my-auto'>{buttonText}</span>
    </button>
  );
}
