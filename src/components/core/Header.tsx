import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/config';
import { logOutState } from '../../store/thunk/thunksForAuth';
import { handleCloseDialog } from '../../store/thunk/thunksForDialog';
import { ConfirmDialog } from '../ConfirmDialog';
import LoginButton from '../LoginButton';

export default function Header() {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => {
    dispatch(handleCloseDialog());
  }, []);
  const handleLogOut = useCallback(() => {
    dispatch(logOutState(navigate));
    handleClose();
  }, []);
  return (
    <>
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
      <ConfirmDialog
        text='정말로 로그아웃 하시겠습니까?'
        onConfirm={handleLogOut}
        confirmText={'로그아웃'}
        onCancel={handleClose}
        cancelText={'취소'}
      />
    </>
  );
}
