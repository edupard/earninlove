import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service'
import { GetTextCommandResponse } from '../../../types'

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  public text;
  public error = false;
  public progress = true;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.progress = true;
    this.data.getText(this.ctrl)
    .subscribe(
      data => { this.text = data.text; this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  onSubmit() {
    this.progress = true;
    this.data.setText(this.ctrl, this.text)
    .subscribe(
      data => { this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

}
