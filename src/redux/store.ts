import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import appReducer from './app.reducer';

const createNoopStorage = () => {
  return {
    // eslint-disable-next-line no-unused-vars
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line no-unused-vars
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === 'undefined'
  ? createNoopStorage()
  : createWebStorage('local');

const reducers = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: [ 'app', ],
}, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
