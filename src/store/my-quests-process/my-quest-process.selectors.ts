import { NameSpace } from '../../consts';
import { MyBookingCard } from '../../types/booking';
import { State } from '../../types/state';

export const getMyQuestsCard = (state: Pick<State, NameSpace.MyQuests>): MyBookingCard[] => state[NameSpace.MyQuests].myQuests;
export const getMyQuestsCardLoadingStatus = (state: Pick<State, NameSpace.MyQuests>): boolean => state[NameSpace.MyQuests].isMyQuestsLoading;
export const getMyQuestsCardErrorStatus = (state: Pick<State, NameSpace.MyQuests>): boolean => state[NameSpace.MyQuests].hasMyQuestsError;
