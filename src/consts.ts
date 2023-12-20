export const AUTH_TOKEN_KEY_NAME = 'my-token';
export const BACKEND_URL = 'https://grading.design.pages.academy/v1/escape-room/';
export const REQUEST_TIMEOUT = 5000;
export const AGREEMENT = 'on';

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
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  // Review = 'REVIEW',
  // Filters = 'FILTERS',
  // Favorites = 'FAVORITES',
}

export const PasswordLength = {
  MIN: 3,
  MAX: 15,
};

