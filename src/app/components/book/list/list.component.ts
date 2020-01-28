import { Component, OnInit, Input } from '@angular/core'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { DataService } from '../../../services/data.service'
import { Emoji, ControlState } from "../../../types"
import {Observable} from 'rxjs/Rx'
import { timer } from 'rxjs'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  @Input('placeholder')  placeholder: string;

  @Input('header')  header: string = '';

  @Input('emoji') emoji: boolean = false;
  @Input('rating') rating: boolean = false;
  @Input('dragAndDrop') dragAndDrop: boolean = false;


  items = [];
  public ControlState = ControlState;
  public state: ControlState = ControlState.Initializing;
  public itemText:string = '';
  public saveSubscription: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.state = ControlState.Loading;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.items = data.json === undefined ? []: data.json.items;
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
      this.data.setData(this.ctrl, { items: this.items})
      .subscribe(
        data => { this.state = ControlState.UpToDate; },
        err => { this.state = ControlState.Error; }
      );
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.scheduleSave();
  }

  onAdd()
  {
    if (this.itemText !== '') {
      let item: any = { text: this.itemText };
      if (this.emoji)
      {
        item = { ...item, emoji: Emoji.Neutral};
      }
      if (this.rating)
      {
        item = { ...item, rating: 5};
      }
      this.items = [...this.items, item];
      this.itemText = '';
      this.scheduleSave();
    }
  }

  onRemoveAt(idx)
  {
    this.items =  [...this.items.slice(0, idx), ...this.items.slice(idx + 1)];
    this.scheduleSave();
  }

}
