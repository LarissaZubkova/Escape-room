import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process.slice';
import { NameSpace } from '../consts';
import { questsProcess } from './quests-process/quests-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Quests]: questsProcess.reducer,
  // [NameSpace.Filters]: filtersProcess.reducer,
  // [NameSpace.Favorites]: favoritesProcess.reducer,
});
