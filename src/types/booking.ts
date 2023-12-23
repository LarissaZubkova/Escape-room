import { BookingDay } from '../consts';
import { QuestShortCard } from './quest';

type Location = {
  address: string;
  coords: number[];
}

export type Slot = {
  time: string;
  isAvailable: boolean;
}

export type BookingPlace = {
  id: string;
  location: Location;
  slots: {
    today: Slot[];
     tomorrow: Slot[];
  };
}

export type BookingData = {
date: BookingDay;
time: string;
contactPerson: string;
phone: string;
withChildren: boolean;
peopleCount: number;
placeId: string;
}

export type CurrentFormData = {
  children: string;
  date: string;
  contactPerson: string;
  person: string;
  phone: string;
}

export type MyBookingCard = {
  date: BookingDay;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: Location;
  quest: QuestShortCard;
}
