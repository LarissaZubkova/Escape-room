import { NameSpace } from '../../consts';
import { BookingPlace } from '../../types/quest';
import { State } from '../../types/state';

export const getBookingPlaces = (state: Pick<State, NameSpace.Booking>): BookingPlace[] | null => state[NameSpace.Booking].bookingPlaces;
export const getPlacesLoadingStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].isPlacesLoading;
export const getPlacesErrorStatus = (state: Pick<State, NameSpace.Booking>): boolean => state[NameSpace.Booking].hasPlacesError;
