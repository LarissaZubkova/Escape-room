import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process.slice';
import { NameSpace } from '../consts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  // [NameSpace.Review]: reviewProcess.reducer,
  // [NameSpace.Filters]: filtersProcess.reducer,
  // [NameSpace.Favorites]: favoritesProcess.reducer,
});
