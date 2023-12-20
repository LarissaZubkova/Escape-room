import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRout } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
//import { redirectToRoute } from './action';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRout.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  'user/login',
  async (login, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRout.Login, login);
    saveToken(data.token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {
    extra: api}) => {
    await api.delete(APIRout.Logout);
    dropToken();
  },
);
