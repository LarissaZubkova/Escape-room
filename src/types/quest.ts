import { QuestLevel, QuestType } from '../consts';

export type QuestShortCard = {
  title: string;
  previewImg: string;
  id: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: number[];
}

export type FiltersState = {
  type: QuestType;
  level: QuestLevel;
}

export type QuestFullCard = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: number[];
  description: string;
  coverImg: string;
  coverImgWebp: string;
}
