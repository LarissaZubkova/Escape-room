import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';
import { QuestShortCard } from './quest';

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
