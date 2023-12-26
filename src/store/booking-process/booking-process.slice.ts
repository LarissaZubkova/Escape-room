import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { BookingPlace } from '../../types/booking';
import { BookingProcess } from '../../types/state';
import { fetchBookingPlaceAction, fetchSendBookingAction } from '../api-actions';

const initialState: BookingProcess = {
  bookingPlaces: [],
  isPlacesLoading: false,
  hasPlacesError: false,
  selectedPlace: null,
  isSending: false,
  hasSendingError: false,
};

export const bookingProcess = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {
    setSelectedPlace: (state, action: PayloadAction<BookingPlace>) => {
      state.selectedPlace = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingPlaceAction.pending, (state) => {
        state.isPlacesLoading = true;
        state.hasPlacesError = false;
      })
      .addCase(fetchBookingPlaceAction.fulfilled, (state, action) => {
        state.bookingPlaces = action.payload;
        state.selectedPlace = action.payload[0];
        state.isPlacesLoading = false;
        state.hasPlacesError = false;
      })
      .addCase(fetchBookingPlaceAction.rejected, (state) => {
        state.hasPlacesError = true;
        state.isPlacesLoading = false;
      })
      .addCase(fetchSendBookingAction.pending, (state) => {
        state.isSending = true;
        state.hasSendingError = false;
      })
      .addCase(fetchSendBookingAction.fulfilled, (state) => {
        state.isSending = false;
        state.hasSendingError = false;
      })
      .addCase(fetchSendBookingAction.rejected, (state) => {
        state.isSending = false;
        state.hasSendingError = true;
      });
  }
});

export const { setSelectedPlace } = bookingProcess.actions;
