import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailNotConfirmed = false;
  resetPasswordRequired = false;
  incorrectPassword = false;
  userNonFound = false;
  genericError = false;

  loginMode = true;
  setPasswordMode = false;
  loginForm;
  setPasswordForm;
  user;

  resetErrors() {
    this.emailNotConfirmed = false;
    this.resetPasswordRequired = false;
    this.incorrectPassword = false;
    this.userNonFound = false;
    this.genericError = false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.setPasswordForm = this.formBuilder.group({
      password: ''
    });
  }

  ngOnInit() {
  }

  async onChangePassword(passwordData) {
    try{
      this.user = await Auth.completeNewPassword(
          this.user,
          passwordData.password,
          {}
      );
      this.router.navigateByUrl('');
    }
    catch (err) {
      this.genericError = true;
      console.log(err);
    }
  }

  async onLogin(loginData) {
    try {
      this.user = await Auth.signIn(loginData.email, loginData.password);
      if (this.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setPasswordMode = true;
        this.loginMode = false;
      }
      this.router.navigateByUrl('');
    }
    catch (err) {
      if (err.code === 'UserNotConfirmedException') {
          this.emailNotConfirmed = true;
      } else if (err.code === 'PasswordResetRequiredException') {
          this.resetPasswordRequired = true;
      } else if (err.code === 'NotAuthorizedException') {
          this.incorrectPassword = true;
      } else if (err.code === 'UserNotFoundException') {
          this.userNonFound = true;
      } else {
          this.genericError = true;
      }
      console.log(err);
    }
  }

}
