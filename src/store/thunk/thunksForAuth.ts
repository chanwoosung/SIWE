import { NavigateFunction } from 'react-router-dom';
import { AppThunk } from '../config';
import { logOut } from '../slices/authSlice';

export const logOutState =
  (navigate: NavigateFunction): AppThunk =>
  async dispatch => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
