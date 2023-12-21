import { QuestLevel, QuestType } from '../consts';

export type QuestShortCard = {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: QuestLevel;
    type: QuestType;
    peopleMinMax: number[];
}

export type FiltersState = {
  type: QuestType;
  level: QuestLevel;
}
