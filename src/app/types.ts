export enum ErrorType {
  None = 0,
  NewPasswordRequired = 1,
  EmailNotConfirmed = 2,
  PasswordResetRequired = 3,
  NotAuthorized = 4,
  UserNotFound = 5,
  Generic = 6,
}

export interface SetTextCommand {
  user: string;
  ctrl: string;
  text: string;
}

export interface GetTextCommand {
  user: string;
  ctrl: string;
}

export interface GetTextCommandResponse {
  user: string;
  ctrl: string;
  text: string;
}

export interface Attributes {
  email: string;
}

export interface User {
  attributes: Attributes;
}
