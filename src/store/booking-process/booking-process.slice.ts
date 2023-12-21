import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { BookingProcess } from '../../types/state';
import { fetchBookingPlaceAction } from '../api-actions';

const initialState: BookingProcess = {
  bookingPlaces: [],
  isPlacesLoading: false,
  hasPlacesError: false,
};

export const bookingProcess = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingPlaceAction.pending, (state) => {
        state.isPlacesLoading = true;
        state.hasPlacesError = false;
      })
      .addCase(fetchBookingPlaceAction.fulfilled, (state, action) => {
        state.bookingPlaces = action.payload;
        state.isPlacesLoading = false;
        state.hasPlacesError = false;
      })
      .addCase(fetchBookingPlaceAction.rejected, (state) => {
        state.hasPlacesError = true;
        state.isPlacesLoading = false;
      });
  }
});
