import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/core/Header';
import LoginButton from '../components/LoginButton';
import { ROUTE_PATH } from '../constant/constant';

export default function Home() {
  const { pathname } = useLocation();

  return (
    <div className='w-[360px] min-h-[100vh] bg-stone-300'>
      <Header />
      {pathname === ROUTE_PATH.HOME ? (
        <div className='w-full flex justify-center items-center pt-5'>
          <LoginButton />
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
