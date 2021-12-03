import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoiceCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html'
})
export class ChoiceComponent implements OnInit {

  @Input() callback?: ChoiceCallback;
  @Input() name?: string;
  @Output() updatedCallback = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
  }

  setValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

}
