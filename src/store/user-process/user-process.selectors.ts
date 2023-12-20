import { AuthorizationStatus, NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].hasError;
export const getLoadingStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isLoading;
