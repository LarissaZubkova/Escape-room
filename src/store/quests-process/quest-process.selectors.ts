import { State } from '../../types/state';
import { QuestShortCard } from '../../types/quest';
import { NameSpace } from '../../consts';

export const getQuests = (state: Pick<State, NameSpace.Quests>): QuestShortCard[] => state[NameSpace.Quests].quests;
export const getQuestsLoadingStatus = (state: Pick<State, NameSpace.Quests>): boolean => state[NameSpace.Quests].isQuestsLoading;
export const getQuestsErrorStatus = (state: Pick<State, NameSpace.Quests>): boolean => state[NameSpace.Quests].hasQuestsError;
