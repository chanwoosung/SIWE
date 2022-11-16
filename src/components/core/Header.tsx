import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/config';
import LoginButton from '../LoginButton';

export default function Header() {
  const { isLoggedIn } = useAppSelector(state => state.auth);

  return (
    <div className='w-full h-20 fixed backdrop-blur bg-[rgb(25, 28, 31)]/[0.85] z-50 shadow-md'>
      <div className='flex h-full justify-between my-auto px-6 items-center  '>
        <Link to='/'>
          <img
            src='/img/Metamask.svg'
            className='w-10 h-10'
            alt='header-logo'
          />
        </Link>
        <LoginButton
          buttonText={isLoggedIn ? 'Disconnect Wallet' : 'Connect Wallet'}
        />
      </div>
    </div>
  );
}
