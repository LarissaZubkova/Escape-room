import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRout, AppRoute } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { NavigateFunction } from 'react-router-dom';
import { QuestShortCard, QuestFullCard } from '../types/quest';
import { BookingData, BookingPlace, MyBookingCard } from '../types/booking';
//import { redirectToRoute } from './action';

export const fetchQuestByIdAction = createAsyncThunk<QuestFullCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchQuestCard',
  async(id, {extra: api}) => {
    const {data} = await api.get<QuestFullCard>(APIRout.Quest.replace(':id', id));
    return data;
  }
);

export const fetchBookingPlaceAction = createAsyncThunk<BookingPlace[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchBookingPlaces',
  async(id, {extra: api}) => {
    const {data} = await api.get<BookingPlace[]>(APIRout.Booking.replace(':id', id));
    return data;
  }
);

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

export const fetchSendBookingAction = createAsyncThunk<void, {currentData: BookingData; id:string; navigate: NavigateFunction}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchSendBooking',
  async({currentData, id, navigate}, {extra: api}) => {
    await api.post<void>(APIRout.Booking.replace(':id', id), currentData);
    navigate(AppRoute.MyQuests);
  }
);

export const fetchMyQuestsAction = createAsyncThunk<MyBookingCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchMyQuests',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<MyBookingCard[]>(APIRout.MyQuests);
    return data;
  }
);

export const fetchDeleteMyQuestAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchDeleteMyQuest',
  async(id, {dispatch, extra: api}) => {
    await api.delete<void>(`${APIRout.MyQuests}/${id}`);
    dispatch(fetchMyQuestsAction());
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

export const loginAction = createAsyncThunk<void, {dataForm: AuthData; navigate: NavigateFunction; fromPage: string}, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  'user/login',
  async ({dataForm, navigate, fromPage}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRout.Login, dataForm);
    saveToken(data.token);
    navigate(fromPage, {replace: true});
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
