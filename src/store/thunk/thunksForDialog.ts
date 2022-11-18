import { AppThunk } from '../config';
import { closeDialog, openDialog } from '../slices/dialog';

export const handleOpenDialog = (): AppThunk => async dispatch => {
  dispatch(openDialog());
};

export const handleCloseDialog = (): AppThunk => async dispatch => {
  dispatch(closeDialog());
};
