import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITokenReducerProps {
  accessToken: string;
  refreshToken: string;
  isLogin: boolean;
}

export const tokenSliceState: ITokenReducerProps = {
  accessToken: '',
  refreshToken: '',
  isLogin: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenSliceState,
  reducers: {
    initToken: state => {
      tokenSliceState;
    },
    setLogin: (_state, action: PayloadAction<ITokenReducerProps>) => ({
      ...action.payload,
    }),
  },
});

export const { initToken, setLogin } = tokenSlice.actions;
