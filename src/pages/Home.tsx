import { Outlet, useLocation } from 'react-router-dom';
import ConnectWalletDialog from '../components/ConnectWalletDialog';
import Header from '../components/core/Header';
import { ROUTE_PATH } from '../constant/constant';
import { useAppSelector } from '../store/config';
import OwnNFTList from './OwnNFTList';

export default function Home() {
  const { pathname } = useLocation();
  const tokenState = useAppSelector(state => state.token);

  return (
    <div className='w-[360px] min-h-[100vh] bg-stone-300'>
      <Header />
      {pathname === ROUTE_PATH.HOME ? (
        <div className='w-full flex justify-center items-center pt-5'>
          {tokenState.accessToken ? (
            <OwnNFTList />
          ) : (
            <ConnectWalletDialog isDialogOpen={true} />
          )}
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
