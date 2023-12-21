export const AUTH_TOKEN_KEY_NAME = 'my-token';
export const BACKEND_URL = 'https://grading.design.pages.academy/v1/escape-room/';
export const REQUEST_TIMEOUT = 5000;
export const AGREEMENT = 'on';
const ALL_QUESTS = 'all-quests';
const SCI_FI = 'sci-fi';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Booking = '/quest/:id/booking',
  Contacts= '/contacts',
  MyQuests = '/my-quests',
  Quest = '/quest/:id',
}

export enum APIRout {
  Login = 'login',
  Logout = 'logout',
  Quests = 'quest',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Quests = 'QUESTS',
  // Filters = 'FILTERS',
  // Favorites = 'FAVORITES',
}

export enum NavTab {
  Quests = 'Квесты',
  Contacts = 'Контакты',
  MyQuests = 'Мои бронирования',
}

export enum NavParams {
  Quests = '/',
  Contacts = '/contacts',
  MyQuests = '/my-quests',
}

export enum QuestLevel {
  All = 'all',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const QuestLevelFilter = {
  all: 'Любой',
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export enum QuestType {
  All = 'all-quests',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export const QuestTypeFilter = {
  [ALL_QUESTS]: 'Все квесты',
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  [SCI_FI]: 'Sci-fi',
};

export const PasswordLength = {
  MIN: 3,
  MAX: 15,
};

export const Contacts = {
  CITY: 'Санкт-Петербург',
  ADDRESS: 'Набережная реки Карповка, д 5П',
  WORKING_START: '10:00',
  WORKING_END: '22:00',
  TELEPHONE: '8 (000) 111-11-11',
  EMAIL: 'info@escape-room.ru',
};
