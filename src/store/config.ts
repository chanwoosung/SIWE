import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/lib/persistStore';
import { walletSlice } from './slices/walletSlice';
import { authSlice } from './slices/authSlice';
import { ThunkAction } from 'redux-thunk';
import { dialogSlice } from './slices/dialog';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'wallet'],
};
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  wallet: walletSlice.reducer,
  dialog: dialogSlice.reducer,
});

const perReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: perReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export default store;
