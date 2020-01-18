import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorType } from './../../types'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public ErrorType = ErrorType;
  public error: ErrorType = ErrorType.None

  public form;
  public progress: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) {
    this.form = this.formBuilder.group({
      email: '',
      secret: '',
    });
  }

  ngOnInit() {
  }

  async onCreateUser(data) {
    this.progress = true;
    this.data.createUser(data.email, data.secret)
    .subscribe(
      data => { this.error = ErrorType.None; },
      err => { this.error = ErrorType.Generic; }
    )
    .add(() => {
      this.progress = false;
    });
  }

}
