import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { APIRout, AppRoute } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { BookingData, BookingPlace, MyBookingCard } from '../types/booking';
import { QuestFullCard, QuestShortCard } from '../types/quest';
import { AppDispatch, State } from '../types/state';

export const fetchQuestByIdAction = createAsyncThunk<QuestFullCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quest/getQuestCard',
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
  'booking/getBookingPlaces',
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
  'quest/getQuests',
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
  'booking/sendBooking',
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
  'booking/getMyQuests',
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
  'booking/deleteMyQuest',
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

export const loginAction = createAsyncThunk<void, AuthData, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  'user/login',
  async (dataForm, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRout.Login, dataForm);
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
