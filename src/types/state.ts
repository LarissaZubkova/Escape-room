import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  hasError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}
