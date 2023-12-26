import { PasswordLength, QuestType, QuestLevel } from '../consts';
import { QuestShortCard } from '../types/quest';

export function validateEmail(email: string) {
  if (
    !email ||
      !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email) ||
      false
  ) {
    return 'Введите корректный емайл';
  }

  return true;
}

export function validatePassword(password: string) {
  if (
    !password ||
      password.length < PasswordLength.MIN || password.length > PasswordLength.MAX ||
      !/\d/.test(password) ||
      !/\D/i.test(password) ||
      false
  ) {
    return 'Пароль должен быть от 3 до 15 символов и содержать минимум 1 цифру и 1 букву';
  }

  return true;
}

export function getMinMaxPeople(people: number[]) {
  return `${people[0]} - ${people[1]} `;
}

export function getIconWidth(type: QuestType) {
  switch(type) {
    case QuestType.Horror:
    case QuestType.Mystic:
    default:
      return 30;
    case QuestType.All:
      return 26;
    case QuestType.Adventures:
      return 36;
    case QuestType.Detective:
      return 40;
    case QuestType.SciFi:
      return 28;
  }
}

export const filterByType = {
  [QuestType.All]: (quests: QuestShortCard[]) => quests,
  [QuestType.Adventures]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.type === QuestType.Adventures),
  [QuestType.Detective]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.type === QuestType.Detective),
  [QuestType.Horror]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.type === QuestType.Horror),
  [QuestType.Mystic]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.type === QuestType.Mystic),
  [QuestType.SciFi]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.type === QuestType.SciFi),
};

export const filterByLevel = {
  [QuestLevel.All]: (quests: QuestShortCard[]) => quests,
  [QuestLevel.Easy]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.level === QuestLevel.Easy),
  [QuestLevel.Hard]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.level === QuestLevel.Hard),
  [QuestLevel.Medium]: (quests: QuestShortCard[]) => quests.filter((quest) => quest.level === QuestLevel.Medium),
};

export function getDescription(description: string): string {
  if (description.length < 50) {
    return description.padEnd(50);
  }
  if (description.length > 300) {
    return description.slice(0,300);
  }
  return description;
}

export function getFormDateTime(data: string) {
  return {
    date: data.slice(0, -5),
    time: data.slice(-5),
  };
}

export function validateName(value: string) {
  if (
    !value ||
      !/[А-Яа-яЁёA-Za-z]{1,15}/.test(value) ||
      false || value.length > 15
  ) {
    return 'Имя не должно первышыть 15 символов и состоять из букв';
  }

  return true;
}

export function validatePhoneNumber(value: string): string | boolean {
  if (
    !value ||
      !/^((\+7))(\(\d{3}\))(\d{3}-)(\d{2}-)(\d{2})$/.test(value) ||
      false
  ) {
    return 'номер формата +7(000)000-00-00';
  }

  return true;
}

export function getCorrectAddress(address: string) {
  const index = address.indexOf('м.');

  return {
    start: address.slice(0, index),
    end: address.slice(index),
  };
}
