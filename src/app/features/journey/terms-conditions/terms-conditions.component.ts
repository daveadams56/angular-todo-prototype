import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TermsAndConditionsCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {

  @Input() callback?: TermsAndConditionsCallback
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<boolean>();

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.checked);
  }

}
