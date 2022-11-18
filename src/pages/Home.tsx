import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/core/Header';
import HomeBanner from '../components/HomeBanner';
import { ROUTE_PATH } from '../constant';
import { useAppSelector } from '../store/config';
import OwnNFTList from './OwnNFTList';

export default function Home() {
  const { pathname } = useLocation();
  const auth = useAppSelector(state => state.auth);

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] bg-white'>
      <Header />
      {pathname === ROUTE_PATH.HOME ? (
        <div className='w-full flex justify-center items-center pt-24'>
          {auth.isLoggedIn ? (
            <OwnNFTList />
          ) : (
            <>
              <HomeBanner />
            </>
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
