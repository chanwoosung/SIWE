import { Outlet, useLocation } from 'react-router-dom';
import ConnectWalletDialog from '../components/ConnectWalletDialog';
import Header from '../components/core/Header';
import { ROUTE_PATH } from '../constant/constant';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';

export default function Home() {
  const { pathname } = useLocation();
  const { isMetamaskInstalled } = useIsInstallMetamask();
  console.log(isMetamaskInstalled);

  return (
    <div className='w-[360px] min-h-[100vh] bg-stone-300'>
      <Header />
      {pathname === ROUTE_PATH.HOME ? (
        <div className='w-full flex justify-center items-center pt-5'>
          <ConnectWalletDialog isDialogOpen={true} />
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
