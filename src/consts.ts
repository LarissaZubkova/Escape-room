export const AUTH_TOKEN_KEY_NAME = 'my-token';
export const BACKEND_URL = 'https://grading.design.pages.academy/v1/escape-room/';
export const REQUEST_TIMEOUT = 5000;
export const MarkersUrl = {
  URL_MARKER_DEFAULT: 'img/svg/pin-default.svg',
  URL_MARKER_ACTIVE: 'img/svg/pin-active.svg',
};
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
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  MyQuests = 'reservation',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Quests = 'QUESTS',
  Quest = 'QUEST',
  Booking = 'BOOKING',
  MyQuests = 'MY_QUESTS'
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
} as const;

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
  Min: 3,
  Max: 15,
} as const;

export const Contacts = {
  City: 'Санкт-Петербург',
  Address: 'Набережная реки Карповка, д 5П',
  WorkingStart: '10:00',
  WorkingEnd: '22:00',
  Telephone: '8 (000) 111-11-11',
  Email: 'info@escape-room.ru',
  Lat: 59.968142,
  Lng: 30.316425,
  Zoom: 10,
} as const;

export enum BookingDay {
  Today = 'today',
  Tomorrow = 'tomorrow',
}

export enum DayQuestCard {
  Today = 'сегодня',
  Tomorrow = 'завтра',
}
