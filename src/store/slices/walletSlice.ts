import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IWalletReducerProps {
  publicAddress: string;
}

export const walletSliceState: IWalletReducerProps = {
  publicAddress: '',
};
export const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletSliceState,
  reducers: {
    initWallet: state => {
      walletSliceState;
    },
    setWalletAddress: (state, action: PayloadAction<IWalletReducerProps>) => {
      state.publicAddress = action.payload.publicAddress;
    },
  },
});

export const { initWallet, setWalletAddress } = walletSlice.actions;
