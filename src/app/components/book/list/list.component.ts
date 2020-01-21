import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DataService } from '../../../services/data.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  @Input('placeholder')  placeholder: string;

  @Input('header')  header: string;


  items = [];
  public error = false;
  public progress = false;
  public toAdd:string = '';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.progress = true;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.items = data.json === undefined ? []: data.json.items; this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  onSave() {
    this.progress = true;
    this.data.setData(this.ctrl, { items: this.items})
    .subscribe(
      data => { this.error = false; },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  onAdd()
  {
    if (this.toAdd !== '') {
      this.items = [...this.items, this.toAdd];
    }
  }

  onRemoveAt(idx)
  {
    this.items =  [...this.items.slice(0, idx), ...this.items.slice(idx + 1)];
  }

}
