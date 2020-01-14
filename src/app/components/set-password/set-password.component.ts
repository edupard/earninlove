import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service'
import { ErrorType } from './../../types'

@Component({
  selector: 'set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  public Errors = ErrorType;
  public error: ErrorType = ErrorType.None

  public setPasswordForm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.setPasswordForm = this.formBuilder.group({
      password: ''
    });
  }

  ngOnInit() {
  }

  async onChangePassword(passwordData) {
    this.error = await this.auth.setPassword(passwordData.password);
    if (this.error === ErrorType.None)
    {
      this.router.navigateByUrl('');
    }
  }

}
