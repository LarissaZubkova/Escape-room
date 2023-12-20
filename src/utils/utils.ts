import { PasswordLength, AGREEMENT } from '../consts';

export function validateEmail(email: string) {
  if (
    !email ||
      !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email) ||
      false
  ) {
    return false;
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
    return false;
  }

  return true;
}

export function validateAgreement(agreement: string) {
  return agreement === AGREEMENT;
}
