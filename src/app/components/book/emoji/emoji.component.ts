import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji } from "../../../types"

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  public Emoji = Emoji;

  @Input() emoji: number;
  @Output() emojiChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onNewEmoji(newEmoji)
  {
    this.emoji = newEmoji;
    this.emojiChange.emit(this.emoji);
  }

}
