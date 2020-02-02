import { Component, OnInit, Input } from '@angular/core'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { DataService } from '../../../services/data.service'
import { Emoji, ControlState } from "../../../types"
import {Observable} from 'rxjs/Rx'
import { timer } from 'rxjs'
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input('ctrl') ctrl: string;
  id: string = uuid();

  @Input('placeholder')  placeholder: string;

  @Input('superHeader')  superHeader: string = '';
  @Input('header')  header: string = '';

  @Input('emoji') emoji: boolean = false;
  @Input('rating') rating: boolean = false;
  @Input('dragAndDrop') dragAndDrop: boolean = false;


  items = [];
  public ControlState = ControlState;
  public state: ControlState = ControlState.Initializing;
  public text:string = '';
  public saveSubscription: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.state = ControlState.Loading;
    this.data.getData(this.ctrl)
    .subscribe(
      data => {
                this.items = (data === undefined) ? []: data.json.items;
                this.state = ControlState.UpToDate;
              },
      err => { this.state = ControlState.LoadingError; }
    );
    this.data.controlDataChangeSubject.subscribe(
      event => {
        if (event.data.ctrl === this.ctrl && event.id !== this.id)
        {
          this.items = event.data.json.items;
        }
      }
    );
  }

  scheduleSave()
  {
    this.state = ControlState.HasChanges;
    if (this.saveSubscription !== undefined) { this.saveSubscription.unsubscribe(); }
    this.saveSubscription = timer(5000).subscribe(t=>{
      this.state = ControlState.Saving;
      this.data.setData(this.ctrl, this.id, { items: this.items})
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
    if (this.text !== '') {
      let item: any = { text: this.text };
      if (this.emoji)
      {
        item = { ...item, emoji: Emoji.Neutral};
      }
      if (this.rating)
      {
        item = { ...item, rating: 3};
      }
      this.items = [...this.items, item];
      this.text = '';
      this.scheduleSave();
    }
  }

  onRemoveAt(idx)
  {
    this.items =  [...this.items.slice(0, idx), ...this.items.slice(idx + 1)];
    this.scheduleSave();
  }

  itemModelChanged(item, newText) {
    item.text = newText;
    this.scheduleSave();
  }

  onEmojiChange(item, newEmoji) {
    item.emoji = newEmoji;
    this.scheduleSave();
  }

  onRateChange(item, newRate) {
    item.rating = newRate;
    this.scheduleSave();
  }

}
