import { NavigateFunction } from 'react-router-dom';
import { AppThunk } from '../config';
import { getValidToken, logOut } from '../slices/authSlice';
import { initWallet, setWalletAddress } from '../slices/walletSlice';

export const logOutState =
  (navigate: NavigateFunction): AppThunk =>
  async dispatch => {
    dispatch(logOut());
    dispatch(initWallet());
    navigate('/', { replace: true });
  };

export const setAuthToken =
  ({
    accountAddress,
    chainId,
    signature,
  }: {
    accountAddress: string;
    chainId: number;
    signature: string;
  }): AppThunk =>
  async dispatch => {
    await dispatch(
      getValidToken({
        accountAddress,
        chainId,
        signature,
      })
    );
    dispatch(
      setWalletAddress({
        publicAddress: accountAddress,
      })
    );
  };
