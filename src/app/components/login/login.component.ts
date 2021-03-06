import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorType } from './../../types'
import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public ErrorType = ErrorType;
  public error: ErrorType = ErrorType.None

  public form;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  async onLogin(data) {
    this.error = await this.auth.login(data.email, data.password);
    if (this.error === ErrorType.None)
    {
      this.router.navigateByUrl('');
    }
    else if (this.error === ErrorType.NewPasswordRequired) {
      this.router.navigateByUrl('setPassword');
    }
  }


}
