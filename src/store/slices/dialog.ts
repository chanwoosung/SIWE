import { createSlice } from '@reduxjs/toolkit';

export interface IDialogProps {
  open: boolean;
}

export const dialogInitState: IDialogProps = {
  open: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: dialogInitState,
  reducers: {
    toggleDialog: state => {
      state.open = !state.open;
    },
    closeDialog: state => {
      state.open = false;
    },
    openDialog: state => {
      state.open = true;
    },
  },
});

export const { toggleDialog, closeDialog, openDialog } = dialogSlice.actions;
