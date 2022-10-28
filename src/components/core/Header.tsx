import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useAppDispatch } from '../../store/config';
import { initToken } from '../../store/slices/tokenSlice';
import { initWallet } from '../../store/slices/walletSlice';
import { ReactComponent as Exit } from '../../outline-x-circle.svg';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (window.confirm(`Are you sure you want to log out`)) {
      dispatch(initToken());
      dispatch(initWallet());
      localStorage.clear();
      navigate('/', { replace: true });
      window.location.reload();
    }
  };
  return (
    <div className='max-w-[360px] w-full h-16 fixed backdrop-blur bg-[rgb(25, 28, 31)]/[0.85] z-50'>
      <div className='flex h-full justify-between my-auto px-6 items-center  '>
        <Link to='/'>
          <img src='/img/Ethereum.svg' alt='header-logo' className='w-6 h-6' />
        </Link>
        <div onClick={handleLogOut} className='cursor-pointer'>
          <Exit fill={'white'} stroke='black' />
        </div>
      </div>
    </div>
  );
}
