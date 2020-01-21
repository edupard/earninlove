import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service'

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
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.text = data.json === undefined ? "": data.json.text; this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  onSave() {
    this.progress = true;
    this.data.setData(this.ctrl, { text: this.text})
    .subscribe(
      data => { this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

}
