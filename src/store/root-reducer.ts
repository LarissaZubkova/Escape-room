import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process.slice';
import { NameSpace } from '../consts';
import { questsProcess } from './quests-process/quests-process.slice';
import { questProcess } from './quest-process/quest-process.slice';
import { bookingProcess } from './booking-process/booking-process.slice';
import { myQuestProcess } from './my-quests-process/my-quest-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Quests]: questsProcess.reducer,
  [NameSpace.Quest]: questProcess.reducer,
  [NameSpace.Booking]: bookingProcess.reducer,
  [NameSpace.MyQuests]: myQuestProcess.reducer,
});
