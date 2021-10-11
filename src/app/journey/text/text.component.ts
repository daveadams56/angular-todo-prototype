import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NameCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() callback?: NameCallback
  @Output() updatedCallback = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

}
