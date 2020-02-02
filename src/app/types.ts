export enum ErrorType {
  None = 0,
  NewPasswordRequired = 1,
  EmailNotConfirmed = 2,
  PasswordResetRequired = 3,
  NotAuthorized = 4,
  UserNotFound = 5,
  Generic = 6,
}

export interface SetControlDataCommand {
  email: string;
  ctrl: string;
  json: any;
}

export interface SetControlDataResponse {
  success: boolean;
}

export interface ControlData {
  ctrl: string;
  json: any;
}

export interface UserData {
  email: string;
  items: ControlData[];
}

export interface ControlDataChangeEvent {
  id: number;
  data: ControlData;
}

export interface GetUserDataCommand {
  email: string;
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
