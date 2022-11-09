import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getRefreshTokens from '../../services/getRefreshToken';

export interface IAuthReducerProps {
  accessToken: string;
  refreshToken: string;
  isLogin: boolean;
}

export const authSliceState: IAuthReducerProps = {
  accessToken: '',
  refreshToken: '',
  isLogin: false,
};

export const checkValidToken = createAsyncThunk(
  'token/checkValidToken',
  async () => {
    const response = await getRefreshTokens({
      refreshToken: localStorage.getItem('refresh_token') || '',
    });
    return await response.data.json();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: authSliceState,
  reducers: {
    logOut: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isLogin = false;
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
    },
    logIn: (state, action: PayloadAction<IAuthReducerProps>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
    },
    updateToken: (state, action: PayloadAction<IAuthReducerProps>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      checkValidToken.fulfilled,
      (state, action: PayloadAction<IAuthReducerProps>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLogin = true;
      }
    );
    builder.addCase(checkValidToken.rejected, state => {
      state.isLogin = false;
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
    });
  },
});

export const { logOut, logIn, updateToken } = authSlice.actions;
