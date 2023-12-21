import { NameSpace } from '../../consts';
import { QuestFullCard } from '../../types/quest';
import { State } from '../../types/state';

export const getQuestCard = (state: Pick<State, NameSpace.Quest>): QuestFullCard | null => state[NameSpace.Quest].questCard;
export const getQuestCardLoadingStatus = (state: Pick<State, NameSpace.Quest>): boolean => state[NameSpace.Quest].isQuestCardLoading;
export const getQuestCardErrorStatus = (state: Pick<State, NameSpace.Quest>): boolean => state[NameSpace.Quest].hasQuestCardError;
