import { NameSpace } from '../../consts';
import { BookingPlace } from '../../types/booking';
import { State } from '../../types/state';

export const getBookingPlaces = (state: Pick<State, NameSpace.Booking>): BookingPlace[] | null => state[NameSpace.Booking].bookingPlaces;
export const getPlacesLoadingStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].isPlacesLoading;
export const getPlacesErrorStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].hasPlacesError;
export const getSelectedPlace = (state: Pick<State, NameSpace.Booking>): BookingPlace | null => state[NameSpace.Booking].selectedPlace;
export const getSendingStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].isSending;
export const getSendingErrorStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].hasSendingError;
