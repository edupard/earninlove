import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service'
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  public text = '';
  public error = false;
  public loadError = false;
  public progress = false;
  public hasChanges = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.progress = true;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.text = data.json === undefined ? "": data.json.text; this.error = false; },
      err => { this.loadError = true; }
    )
    .add(() => {
      this.progress = false;
    });

    let timer = Observable.timer(10000,10000);
    timer.subscribe(t=>{
      if (!this.loadError && (this.hasChanges  || this.error))
      {
        this.hasChanges = false;
        this.progress = true;
        this.error = false;
        this.data.setData(this.ctrl, { text: this.text})
        .subscribe(
          data => { this.error = false; },
          err => { this.error = true; }
        )
        .add(() => {
          this.progress = false;
        });
      }
    });
  }

  public setText(data)
  {
    this.text = data;
    this.hasChanges = true;
  }
}
