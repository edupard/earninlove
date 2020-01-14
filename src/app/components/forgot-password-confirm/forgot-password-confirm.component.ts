import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorType } from './../../types'
import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrls: ['./forgot-password-confirm.component.scss']
})
export class ForgotPasswordConfirmComponent implements OnInit {

  public ErrorType = ErrorType;
  public error: ErrorType = ErrorType.None

  public form;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.form = this.formBuilder.group({
    email: auth.getForgottenEmail(),
      code: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  async onForgotPasswordConfirm(data) {
    this.error = await this.auth.forgotPasswordConfirm(data.email, data.code, data.password);
    if (this.error === ErrorType.None)
    {
      this.router.navigateByUrl('');
    }
  }

}
