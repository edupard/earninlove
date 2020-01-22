import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DataService } from '../../../services/data.service'
import { Emoji } from "../../../types"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  @Input('placeholder')  placeholder: string;

  @Input('header')  header: string;

  @Input('emoji') emoji: boolean = false;
  @Input('rating') rating: boolean = false;
  @Input('dragAndDrop') dragAndDrop: boolean = false;


  items = [];
  originalItems = [];
  public error = false;
  public progress = false;
  public itemText:string = '';

  constructor(private data: DataService) { }

  public saveOriginalItems()
  {
    this.originalItems = this.items;
  }

  public hasChanges()
  {
    return this.originalItems !== this.items;
  }

  ngOnInit() {
    this.progress = true;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.items = data.json === undefined ? []: data.json.items; this.error = false; this.saveOriginalItems(); },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  onSave() {
    this.progress = true;
    this.data.setData(this.ctrl, { items: this.items})
    .subscribe(
      data => { this.error = false; this.saveOriginalItems(); },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
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
    }
  }

  onRemoveAt(idx)
  {
    this.items =  [...this.items.slice(0, idx), ...this.items.slice(idx + 1)];
  }

}
