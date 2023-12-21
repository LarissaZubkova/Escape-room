import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRout } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { NavigateFunction } from 'react-router-dom';
import { QuestShortCard } from '../types/quest';
//import { redirectToRoute } from './action';

export const fetchQuestsAction = createAsyncThunk<QuestShortCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchQuests',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<QuestShortCard[]>(APIRout.Quests);
    return data;
  }
);

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

export const loginAction = createAsyncThunk<void, {dataForm: AuthData; navigate: NavigateFunction}, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  'user/login',
  async ({dataForm, navigate}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRout.Login, dataForm);
    saveToken(data.token);
    navigate(-1);
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
