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
    resetWallet: state => {
      state.publicAddress = '';
    },
    setWalletAddress: (state, action: PayloadAction<IWalletReducerProps>) => {
      state.publicAddress = action.payload.publicAddress;
    },
  },
});

export const { resetWallet, setWalletAddress } = walletSlice.actions;
