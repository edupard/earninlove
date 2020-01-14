import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorType } from './../../types'
import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public ErrorType = ErrorType;
  public error: ErrorType = ErrorType.None

  public form;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.form = this.formBuilder.group({
      email: ''
    });
  }

  ngOnInit() {
  }

  async onForgotPassword(data) {
    this.error = await this.auth.forgotPassword(data.email);
    if (this.error === ErrorType.None)
    {
      this.router.navigateByUrl('/forgotPasswordConfirm');
    }
  }

}
