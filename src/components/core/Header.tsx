import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useAppDispatch } from '../../store/config';
import { initToken } from '../../store/slices/tokenSlice';
import { initWallet } from '../../store/slices/walletSlice';

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
    <div className='w-full h-16 bg- flex items-center justify-between my-auto px-6 backdrop-blur bg-slate-500'>
      <Link to='/'>
        <img src='/img/Ethereum.svg' alt='header-logo' className='w-11 h-11' />
      </Link>
      <div onClick={handleLogOut}>
        <img
          className='min-w-[24px] min-h-[24px] cursor-pointer'
          src='/img/outline-x-circle.svg'
          alt='cancel-dialog-button'
        />
      </div>
    </div>
  );
}
