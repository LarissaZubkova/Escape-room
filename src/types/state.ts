import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';
import { QuestFullCard, QuestShortCard } from './quest';
import { BookingPlace, MyBookingCard } from './booking';

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  hasError: boolean;
  isLoading: boolean;
}

export type QuestsProcess = {
  quests: QuestShortCard[];
  isQuestsLoading: boolean;
  hasQuestsError: boolean;
}

export type QuestProcess = {
  questCard: QuestFullCard | null;
  isQuestCardLoading: boolean;
  hasQuestCardError: boolean;
}

export type BookingProcess = {
  bookingPlaces: BookingPlace[];
  isPlacesLoading: boolean;
  hasPlacesError: boolean;
  selectedPlace: BookingPlace | null;
}

export type MyQuestsProcess = {
  myQuests: MyBookingCard[];
  isMyQuestsLoading: boolean;
  hasMyQuestsError: boolean;
}
