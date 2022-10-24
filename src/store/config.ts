import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { tokenSlice } from './slices/tokenSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/lib/persistStore';
import { walletSlice } from './slices/walletSlice';
const initialState = {};
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'wallet'],
};
export const rootReducer = combineReducers({
  token: tokenSlice.reducer,
  wallet: walletSlice.reducer,
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

export default store;
