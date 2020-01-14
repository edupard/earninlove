import { Injectable } from '@angular/core';
import { ErrorType } from './../types'
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user;

  constructor() { }

  public getSmth() {
    return 'Hello world';
  }

  async setPassword(password) {
    try {
      this.user = await Auth.completeNewPassword(
          this.user,
          password,
          {}
      );
      return ErrorType.None
    }
    catch (err) {
      console.log(err);
      return ErrorType.Generic;
    }
  }

  async login(email, password): Promise<ErrorType> {
    try {
      this.user = await Auth.signIn(email, password);
      if (this.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return ErrorType.NewPasswordRequired;
      }
      return ErrorType.None;
    }
    catch (err) {
      console.log(err);
      if (err.code === 'UserNotConfirmedException') {
          return ErrorType.EmailNotConfirmed;
      } else if (err.code === 'PasswordResetRequiredException') {
          return ErrorType.PasswordResetRequired;
      } else if (err.code === 'NotAuthorizedException') {
          return ErrorType.NotAuthorized;
      } else if (err.code === 'UserNotFoundException') {
          return ErrorType.UserNotFound;
      } else {
          return ErrorType.Generic;
      }
    }
  }
}
