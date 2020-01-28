import { Component, OnInit, Input } from '@angular/core'
import { DataService } from '../../../services/data.service'
import {Observable} from 'rxjs/Rx'
import { ControlState } from "../../../types"
import { timer } from 'rxjs'

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  @Input('minHeight') minHeight = 10;

  public text = '';
  public ControlState = ControlState;
  public state: ControlState = ControlState.Initializing;
  public saveSubscription: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.state = ControlState.Loading;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.text = data.json === undefined ? "": data.json.text;
                this.state = ControlState.UpToDate;
              },
      err => { this.state = ControlState.LoadingError; }
    );
  }

  scheduleSave()
  {
    this.state = ControlState.HasChanges;
    if (this.saveSubscription !== undefined) { this.saveSubscription.unsubscribe(); }
    this.saveSubscription = timer(5000).subscribe(t=>{
      this.state = ControlState.Saving;
      this.data.setData(this.ctrl, { text: this.text})
      .subscribe(
        data => { this.state = ControlState.UpToDate; },
        err => { this.state = ControlState.Error; }
      );
    });
  }

  public setText(data)
  {
    this.text = data;
    this.scheduleSave();
  }
}
