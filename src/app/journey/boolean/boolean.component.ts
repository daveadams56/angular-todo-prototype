import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeInputCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  @Input() callback?: AttributeInputCallback<boolean>
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.currentTarget.checked);
  }

}
