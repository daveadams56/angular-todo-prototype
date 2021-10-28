import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttributeInputCallback, NameCallback, ValidatedCreateUsernameCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<string>();

  // TODO make this reactive to policy requirements
  isRequired: boolean = false;
  stringAttributeName: string = "text"

  constructor() {
  }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

}
