import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TermsAndConditionsCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  @Input() callback?: TermsAndConditionsCallback
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.checked);
  }

}
