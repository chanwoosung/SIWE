import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getRefreshTokens from '../../services/getRefreshToken';
import getTokens from '../../services/getTokens';
import { IToken } from '../../type';

export interface IAuthReducerProps {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  isLoggedIn: boolean;
}

export const authSliceState: IAuthReducerProps = {
  accessToken: '',
  refreshToken: '',
  expiresIn: '',
  isLoggedIn: false,
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

export const getValidToken = createAsyncThunk(
  'token/getValidToken',
  async ({
    accountAddress,
    chainId,
    signature,
  }: {
    accountAddress: string;
    chainId: number;
    signature: string;
  }) => {
    const response = await getTokens({
      accountAddress,
      chainId,
      signature,
    });
    if (response instanceof Error) {
      return Promise.reject(response);
    }

    try {
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: authSliceState,
  reducers: {
    logOut: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.expiresIn = '';
      state.isLoggedIn = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
    },
    logIn: (state, action: PayloadAction<IAuthReducerProps>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
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
        state.isLoggedIn = true;
        const currentTimestamp = new Date().getTime();
        const refreshTokenExpiresAt =
          currentTimestamp + Number(action.payload.expiresIn) * 1000;
        localStorage.setItem('access_token', action.payload.accessToken);
        localStorage.setItem('refresh_token', action.payload.refreshToken);
        localStorage.setItem('expires_in', refreshTokenExpiresAt.toString());
      }
    );
    builder.addCase(checkValidToken.rejected, state => {
      state.isLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
    });
    builder.addCase(
      getValidToken.fulfilled,
      (state, action: PayloadAction<IToken>) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in.toString();
        const currentTimestamp = new Date().getTime();
        const refreshTokenExpiresAt =
          currentTimestamp + Number(action.payload.expires_in) * 1000;
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('refresh_token', action.payload.refresh_token);
        localStorage.setItem('expires_in', refreshTokenExpiresAt.toString());
        state.isLoggedIn = true;
      }
    );
    builder.addCase(getValidToken.rejected, state => {
      state.isLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.expiresIn = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
    });
  },
});

export const { logOut, logIn, updateToken } = authSlice.actions;
