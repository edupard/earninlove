import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service'

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input('ctrl') ctrl: string;

  public text = '';
  public originalText = '';
  public error = false;
  public progress = false;

  constructor(private data: DataService) { }

  public saveOriginalText()
  {
    this.originalText = this.text;
  }

  ngOnInit() {
    this.progress = true;
    this.data.getData(this.ctrl)
    .subscribe(
      data => { this.text = data.json === undefined ? "": data.json.text; this.error = false; this.saveOriginalText(); },
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
      data => { this.error = false; this.saveOriginalText(); },
      err => { this.error = true; }
    )
    .add(() => {
      this.progress = false;
    });
  }

  public hasChanges()
  {
    return this.originalText !== this.text;
  }

}
