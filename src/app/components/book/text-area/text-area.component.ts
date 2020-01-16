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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getText(this.ctrl).subscribe((data: GetTextCommandResponse) => {
      this.text = data.text;
    });
  }

  onSubmit() {
    this.data.setText(this.ctrl, this.text).subscribe({
      next(data) { },
      error(err) { this.error = true; }
    });
  }

}
