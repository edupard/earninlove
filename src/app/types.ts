export enum ErrorType {
  None = 0,
  NewPasswordRequired = 1,
  EmailNotConfirmed = 2,
  PasswordResetRequired = 3,
  NotAuthorized = 4,
  UserNotFound = 5,
  Generic = 6,
}

export interface SetDataCommand {
  email: string;
  ctrl: string;
  json: any;
}

export interface SetDataCommandResponse {
  success: boolean;
}

export interface GetDataCommand {
  email: string;
  ctrl: string;
}

export interface GetDataCommandResponse {
  email: string;
  ctrl: string;
  json: any;
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

export enum Emoji {
  Frown = 0,
  Neutral = 1,
  Smile = 2,
};

export enum ControlState {
  Initializing = 0,
  Loading = 1,
  LoadingError = 2,
  HasChanges = 3,
  Saving = 4,
  Error = 5,
  UpToDate = 6,
};
