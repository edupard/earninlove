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
  email: string;
  ctrl: string;
  text: string;
}

export interface SetTextCommandResponse {
  success: boolean;
}

export interface GetTextCommand {
  email: string;
  ctrl: string;
}

export interface GetTextCommandResponse {
  email: string;
  ctrl: string;
  text: string;
}

export interface Attributes {
  email: string;
}

export interface User {
  attributes: Attributes;
}

export interface CreateUserCommand {
  email: string;
  secret: string;
}

export interface CreateUserCommandResponse {
  success: boolean;
}
